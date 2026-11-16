import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"

const Header = HeaderConstructor()

/**
 * Obsidian-inspired workspace: left navigation and site information,
 * centered note, and a collapsible right-hand reference panel.
 */
export const DefaultFrame: PageFrame = {
  name: "default",
  render({
    componentData,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    left,
    right,
    footer,
    sidebars,
  }: PageFrameProps) {
    const SiteFooter = ({ mobile = false }: { mobile?: boolean }) => (
      <div class={`site-sidebar-footer${mobile ? " mobile-site-footer" : ""}`}>
        <aside class="site-about" aria-label="О сайте">
          <span>Мои рабочие заметки.</span>
          <a href="https://t.me/ivanfromminsk">Telegram: @ivanfromminsk</a>
        </aside>
        {footer.map((FooterComponent) => (
          <FooterComponent {...componentData} />
        ))}
      </div>
    )

    return (
      <>
        <div class="left sidebar" data-sidebar-mode={sidebars?.left ?? "fit"}>
          {left.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
          <SiteFooter />
        </div>
        <div class="center">
          <div class="page-header">
            <Header {...componentData}>
              {header.map((HeaderComponent) => (
                <HeaderComponent {...componentData} />
              ))}
            </Header>
            <div class="popover-hint">
              {beforeBody.map((BodyComponent) => (
                <BodyComponent {...componentData} />
              ))}
            </div>
          </div>
          <Content {...componentData} />
          <hr />
          <div class="page-footer">
            {afterBody.map((BodyComponent) => (
              <BodyComponent {...componentData} />
            ))}
          </div>
        </div>
        <details class="right sidebar" open>
          <summary title="Toggle right sidebar" aria-label="Toggle right sidebar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
            <span class="right-panel-label">Note navigation</span>
          </summary>
          <div class="right-panel-content">
            {right.map((BodyComponent) => (
              <BodyComponent {...componentData} />
            ))}
          </div>
        </details>
        <SiteFooter mobile />
      </>
    )
  },
}
