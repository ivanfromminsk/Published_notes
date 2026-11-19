---
title: Project file structure
unlisted: true
---

## Rules on how to work with
1. Use short name for the project
2. Folder names through "nn Name" - (01 CAD)
3. English
4. ? Use git
	1. one branch structure
	2. commit only selected, not all, because of big files with no important changes
5. Make comments on the structure
6. Rewrite structure during the project if needed
7. __Cad models in a separate folder - “CAD”
8. Big things like photos in a separate folder in the root (it's ok to have more folders)

## Project Root
1. Git rep.                                //???
2. CAD                                    //all models files
	1. ArchiCAD                   //model and all that it uses: modules, xrefs, objects, also comments for modules or model structure
		1. scenes
		2. xrefs                    //linked dwg, img etc
		3. ProjectPreviews  //a01 logo, projects preview
		4. modules             //linked modules, .mod - better
		5. import                //imported to file: library, 3d map, pens etc
		6. export                //temporary before sending to stage export folders
	2. DWG
	3. Scheme and Concept Drawings 
	4. Analysis 
	5. Programm                  //functional shemes
	6. References
	7. Presentations             //layout, indesign, mb archives with materials
	8. Model                        //if needed
	9. Visualizations            //task, files, etc depends on the need
		1. post
		2. Max
		3. Twin
3. Input                                  //same info inside, but info about site and photo in separate folders
4. PP                                      //export and text files for stage
5. TP                                      //export and text files for stage
6. DP                                     //export and text files for stage
7. BIM Models                      //export
8. Site                                   //all connected with site, from info to coordinates files
	1. Geology
	2. Topography
	3. Сoordinates             //building coordinates for upload
9. Photographs
	1. Pre-Construction
	2. Construction
	3. Post-Construction
	4. Professional
10. Susirinkimų protokolai
11. Product Suppliers

  
-------------------------

__Maybe also add folders:

_Site (construction)
Meetings (presentations+reports)
Emails
Tender/contract info
