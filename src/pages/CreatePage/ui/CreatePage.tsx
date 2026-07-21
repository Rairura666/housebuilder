import { useEffect, useRef, useState } from "react"
import { CreateItemsPanel } from "../../../features/CreateItemsPanel/ui/CreateItemsPanel"
import { CreateControlPanel } from "../../../features/createControlPanel/ui/CreateControlPanel"
import { CreatePalettePanel } from "../../../features/CreatePalettePanel"
import { DrawingCanvas } from "../../../widgets/DrawingCanvas/ui/DrawingCanvas"
import "../../../app/styles/CreatePage.css"
import { canvasElement, Project } from "../../../shared/types/types"
import { palettes, categories } from "../../../shared/config/constants"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { ElementPreviewView } from "../../../shared/ElementPreviewView"
import { useHistory } from "../model/useHistory"
import { useDrag } from "../model/useDrag"
import { saveProject } from "../../../features/createControlPanel/api/saveProject"
import { useAuth } from "../../../shared/auth/useAuth"
import { ModalProjectsList } from "../../../widgets/ModalProjectsList/ui/ModalProjectsList"
import { useLocation } from "react-router-dom";


const testCanvas: canvasElement[] = [
    {
        id: crypto.randomUUID(),
        category: categories.door,
        palette: palettes.blackWhite,
        x: 15,
        y: 30
    },
    {
        id: crypto.randomUUID(),
        category: categories.window,
        palette: palettes.redGreen,
        x: 100,
        y: 130
    }
]

const testCanvas2: canvasElement[] = [
    {
        id: crypto.randomUUID(),
        category: categories.roof,
        palette: palettes.redGreen,
        x: 15,
        y: 130
    },
    {
        id: crypto.randomUUID(),
        category: categories.base,
        palette: palettes.yellowBlue,
        x: 100,
        y: 15
    }
]

export const CreatePage = () => {

    const { user } = useAuth()

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

    const canvasRef = useRef<HTMLDivElement>(null)

    const [canvasElements, setCanvasElements] = useState<canvasElement[]>([])

    const { changeHistory, undo, redo } = useHistory(setCanvasElements)
    const { handleDragStart, handleDragEnd, activeDrag } = useDrag(canvasRef, setCanvasElements)

    const location = useLocation()

    const [project, setProject] = useState<Project | null>(null)

    const [selectedPalette, setSelectedPalette] = useState<string>(palettes.yellowBlue)
    const [selectedElemId, setSelectedElemId] = useState<string | null>(null)

    const handleOpenProject = (
        project: Project) => {

        setProject(project)

        setCanvasElements(project.canvas_elements)

        setIsModalOpened(false)
    }


    useEffect(() => {
        const projectFromProfile = location.state?.project

        if (projectFromProfile) {
            handleOpenProject(projectFromProfile)
        }
    }, [])


    return (
        <div className="createPageWrapper">
            {isModalOpened &&
                <ModalProjectsList
                    closeModal={() => setIsModalOpened(false)}
                    onProjectSelect={handleOpenProject}
                />}

            <DndContext
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}>

                <div className="menuBarsContainer">
                    <div className="leftControlPanel">
                        <CreateItemsPanel selectedPalette={selectedPalette} />
                    </div>

                    <div className="canvasWrapper" >

                        <DrawingCanvas canvasRef={canvasRef} setSelectedElemId={setSelectedElemId} selectedElemId={selectedElemId} changeHistory={changeHistory} canvasElements={canvasElements} setCanvasElements={setCanvasElements} />
                    </div>

                    <div className="rightControlPanel">
                        <CreatePalettePanel setSelectedPalette={setSelectedPalette} />


                        <div className="createControlPanel">
                            <CreateControlPanel undo={undo} redo={redo} saveProject={() => saveProject(user, project, canvasElements)} setIsModalOpened={setIsModalOpened} />
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