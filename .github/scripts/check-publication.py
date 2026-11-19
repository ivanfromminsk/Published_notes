"""Fail deployment when unlisted notes leak into public discovery surfaces."""
import json
import posixpath
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

BASE = "/Published_notes/"
HOST = "ivanfromminsk.github.io"


def canonical(value, current="index.html"):
    parsed = urlsplit(value)
    if parsed.scheme and parsed.scheme not in {"http", "https"}:
        return None
    if parsed.netloc and parsed.netloc != HOST:
        return None
    path = unquote(parsed.path)
    if not path:
        path = current
    elif path.startswith(BASE):
        path = path[len(BASE):]
    elif path.startswith("/"):
        return None
    else:
        path = posixpath.normpath(posixpath.join(posixpath.dirname(current), path))
    path = path.removesuffix(".html").rstrip("/")
    if path.endswith("/index"):
        path = path[:-6]
    return path


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.targets = []
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for name in ("href", "src", "data-slug"):
            if attrs.get(name):
                self.targets.append(attrs[name])
        if tag == "meta" and attrs.get("name", "").lower() == "robots":
            self.noindex |= "noindex" in attrs.get("content", "").lower()


def verify(source, output):
    notes = list((source / "notes").glob("*.md"))
    hidden = set()
    expected = set()
    for note in notes:
        text = note.read_text(encoding="utf-8")
        slug = "notes/" + note.stem
        expected.add(slug)
        meta = text.split("---", 2)[1] if text.startswith("---\n") else ""
        if re.search(r"(?m)^unlisted:\s*true\s*$", meta):
            hidden.add(slug)
    assert "notes/complete-library" in hidden, "Complete library must remain unlisted"
    assert not list((source / "notes").glob("assets/**/*")), "Unexpected attachments"
    assert all(p.suffix == ".md" for p in (source / "notes").rglob("*") if p.is_file()), "Unexpected generated files"
    index = json.loads((output / "static/contentIndex.json").read_text(encoding="utf-8"))
    assert not hidden.intersection(index), "Unlisted page in content index"
    assert expected - hidden <= set(index), "Listed notes missing from content index"
    for entry in index.values():
        assert not hidden.intersection(entry.get("links", [])), "Hidden graph edge"
    for name in ("sitemap.xml", "index.xml"):
        text = (output / name).read_text(encoding="utf-8")
        for url in re.findall(r"<(?:loc|link|guid)>([^<]+)</(?:loc|link|guid)>", text):
            assert canonical(url) not in hidden, "Unlisted page in sitemap or RSS"
    hidden_html = {slug + ".html" for slug in hidden}
    for slug in expected:
        assert (output / (slug + ".html")).is_file(), "Missing note page"
    scanned = 0
    for page in output.rglob("*.html"):
        rel = page.relative_to(output).as_posix()
        parser = Links()
        parser.feed(page.read_text(encoding="utf-8"))
        if rel in hidden_html:
            assert parser.noindex, "Unlisted page needs noindex"
            continue
        scanned += 1
        for target in parser.targets:
            assert target not in hidden and canonical(target, rel) not in hidden, "Link from public HTML to unlisted page"
    library = (source / "notes/complete-library.md").read_text(encoding="utf-8")
    library_slugs = set(re.findall(r"\[\[([^|\]#]+)", library))
    assert library_slugs == {p.stem for p in notes} - {"index", "complete-library"}, "Incomplete library"
    for note in notes:
        if "notes/" + note.stem in hidden:
            continue
        for target in re.findall(r"\[\[([^|\]#]+)", note.read_text(encoding="utf-8")):
            assert "notes/" + target not in hidden, "Source link to unlisted page"
    print(f"Publication verified: {len(expected) - 2} notes, {len(hidden)} unlisted pages, {scanned} public HTML pages; no attachments or hidden navigation links.")


if __name__ == "__main__":
    verify(Path(sys.argv[1] if len(sys.argv) > 1 else "content"),
           Path(sys.argv[2] if len(sys.argv) > 2 else "public"))
