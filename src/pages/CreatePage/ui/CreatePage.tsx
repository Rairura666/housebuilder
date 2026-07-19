import { useRef, useState } from "react"
import { CreateItemsPanel } from "../../../features/CreateItemsPanel/ui/CreateItemsPanel"
import { CreateControlPanel } from "../../../features/CreateControlPanel"
import { CreatePalettePanel } from "../../../widgets/CreatePalettePanel"
import { DrawingCanvas } from "../../../widgets/DrawingCanvas/ui/DrawingCanvas"
import "../../../app/styles/CreatePage.css"
import {canvasElement, createPageProps, Project } from "../../../shared/types/types"
import {palettes, categories} from "../../../shared/config/constants"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { ElementPreviewView } from "../../../shared/ElementPreviewView"
import { useHistory } from "../model/useHistory"
import { useDrag } from "../model/useDrag"
import { saveProject } from "../api/saveProject"

const testCanvas: canvasElement[] = [
    {   id: crypto.randomUUID(),
        category: categories.door,
        palette: palettes.blackWhite,
        x: 15,
        y: 30},
    {        
        id:  crypto.randomUUID(),
        category: categories.window,
        palette: palettes.redGreen,
        x: 100,
        y: 130}
]

const testCanvas2: canvasElement[] = [
    {   id: crypto.randomUUID(),
        category: categories.roof,
        palette: palettes.redGreen,
        x: 15,
        y: 130},
    {        
        id:  crypto.randomUUID(),
        category: categories.base,
        palette: palettes.yellowBlue,
        x: 100,
        y: 15}
]

export const CreatePage = ({user}: createPageProps) => {
    
    const canvasRef = useRef<HTMLDivElement>(null)

    const [canvasElements, setCanvasElements] = useState<canvasElement[]>(testCanvas2)

    const {changeHistory, undo, redo} = useHistory(setCanvasElements)
    const {handleDragStart, handleDragEnd, activeDrag} = useDrag(canvasRef, setCanvasElements)

    const [project, setProject] = useState<Project>()

    const [selectedPalette, setSelectedPalette] = useState<string>(palettes.yellowBlue)
    const [selectedElemId, setSelectedElemId] = useState<string | null>(null)
    
    return (
        <div className="createPageWrapper">
            <DndContext 
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}>

                <div className="menuBarsContainer">
                    <div className="leftControlPanel">
                        <CreateItemsPanel selectedPalette={selectedPalette}/>
                    </div>
                        
                    <div className="canvasWrapper" >
                       
                        <DrawingCanvas canvasRef={canvasRef} setSelectedElemId={setSelectedElemId} selectedElemId={selectedElemId}  changeHistory={changeHistory} canvasElements={canvasElements} setCanvasElements={setCanvasElements} />
                    </div>

                    <div className="rightControlPanel">
                        <CreatePalettePanel setSelectedPalette={setSelectedPalette} />


                        <div className="createControlPanel">
                            <CreateControlPanel undo={undo} redo={redo} saveProject={() => saveProject(user, project, canvasElements)} />                    
                        </div>
                    </div>
                </div>
                <DragOverlay dropAnimation={null}>
                {activeDrag && (
                    <ElementPreviewView
                        elemGeneral={{
                            id: String(activeDrag.generalElemId),
                            category: activeDrag.category,
                            palette: activeDrag.palette,
                        }}
                    />
                )}
                </DragOverlay>
            </DndContext>
        </div>
    )
}