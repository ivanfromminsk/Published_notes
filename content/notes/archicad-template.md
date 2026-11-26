---
title: ArchiCAD template
---

## Some new ideas for work in ArchiCAD from 2026 12 +
Получил пример проекта от Дмитрия и попросил у Виктора
- [ ] напомнить еще раз Виктору про файл с рабочкой в архикаде

- Teamwork изучить и настроить нормально, протестировать как работает ([F1](https://help.graphisoft.com/AC/18/RUS/AC18Help/05_Collaboration/05_Collaboration-3.htm), [tutorial by graphisoft](https://www.youtube.com/playlist?list=PLnXY6vLUwlWXCCr9EWFA3TG2IHZWCLaV0))
- Переделать рабочие окружение для последней версии (выписать все нужно и переделать с нуля, горячие клавиши создать дополнительные для модулей и тд) // из-за некорректной работы окружения из предыдущей версии
- 

### techniques
- Terrain by servey's data [tuturial](https://www.youtube.com/watch?v=YbGwulsYO7M)



---
Based on the Archicad 27 default template and Shoegnome Open Template

Consists from

Пару хороших статей на хабре по запросу в поиске архикад: 
https://habr.com/ru/search/?q=archicad&target_type=posts&order=relevance


### ArchiCAD tools
- [Sunreel gsm for sun study](https://www.dutch.architectural.studio/sunreel2.html)


## Some rules how to work with
1. File name (ProjectName_ProjectPart_Status)
2. General
	1. Fill in project info
	2. Fill in info about the architect/company
	3. Set project preview (regulary)
3. Model
	1. Storeys - do not name it  

## Layers
It is better not to store content in an Archicad file, keep it as small as possible, and use auto update for imported dwg/pdf/images - relative paths 
1. Folders
	1. Documentation
	2. SA
		1. MEP
	3. SI
	4. SP
2. Indexes in layer names
	1. TEMP_              //objects are not needed at the moment, working on etc
	2. TEST_               //used for testing: insolation, sizes, volume, etc
	3. DWG_              //for import
	4. IMG_               //for import
	5. MARKER_ 
	6. SP_
		1. SP_Site       //relief, ground ets
		2. SP_Land     //greenery, site objects
		3. SP_Env
	7. SA_
	8. SI_
3. Layers extensions
4. 2D
5. OBJ
6. DIM

## Layer combination
1. 0                                               // use during modeling
	1. 0 | Drafting
	2. 0 | Model - 3D
	3. 0 | Model - Zones
2. 1 ----- ----- ----- -----             // Plans
	1. 1 | Floor Plan
	2. 1 | Site Plan
3. 2 ----- ----- ----- -----             // Elevations, Sections
	1. 2 | Elevation
	2. 2 | Section
4. 3 ----- ----- ----- -----              // Additional plans
	1. 3 | Demolition Plan
	2. 3 | Site Plan - Drainage
5. 4 ----- ----- ----- -----             // Structural
	1. 4 | IFC Export
	2. 4 | Mechanical Plan
	3. 4 | Structural Plan
6. 5 ----- ----- ----- -----             // visualization
	1. 5 | Exterior Rendering
7. 6 ----- ----- ----- -----             // tests, forces 
	1. 6 | 

## Pen sets
use as little as possible (for line thickness only, same colors)
## Graffic override
use to set graphics
## 3d stiles
## Structure of view map
- F_Folder
- W_Worksheet
- 3D_

use the “clone folder” function

1. (F) Project Management
	1. W_Project Task & Notes
	2. W_Standart Notes                  // elements to use in drawings, just in one place
	3. W_Title Blocks                       //elements to use in master layouts
	4. Project notes                         //quick notes just  to avoid paper pieces
2. (F) Architectural
	1. 3D_Arch                                 // for work during modeling/ can be several different
	2. Plans/Sections/Fasades
	3. F_Site Plan
		1. 3D_SitePlan                    // for work during modeling/ can be several different
		2. Plans etc
	4. F_Additional Plans
		1. existing/demolition/ceiling etc
	5. F_Details & Interior Elevations
3. (F) Structural+
	1. 3D_IFC_Export                        // to export to IFC from this view
4. (F) Visualization
	1. 3D_Project Preview                // for file preview
	2. Schemes
	3. Schematic plans and sections
	4. Detailed colored elevation
	5. 3D views, cameras, etc
5. (F) Schedules and Indexes