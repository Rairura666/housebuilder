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
import { useLocation } from "react-router-dom"
import { toPng } from 'html-to-image'
import { savePreview } from "../../../features/createControlPanel/api/savePreview"
import { updateProjectPreviewURL } from "../../../features/createControlPanel/api/updateProjectPreviewURL"
import { ModalSaveProject } from "../../../widgets/modalSaveProject/ui/ModalSaveProject"


export const CreatePage = () => {

    const { user } = useAuth()

    const [isModalProjectsListOpened, setIsModalProjectsListOpened] = useState<boolean>(false)

    const [isModalSaveProjectOpened, setIsModalSaveProjectOpened] = useState<boolean>(false)

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

        setIsModalProjectsListOpened(false)
    }


    const handleSaveProject = async (projectName: string) => {

        const savedProject = await saveProject(
            user,
            project,
            canvasElements,
            projectName
        )

        if (!savedProject) {

            console.log("!savedProject")
            return
        }
        setProject(savedProject)

        if (!canvasRef.current) {
            console.log("!canvasRef.current")
            return
        }

        const preview = await toPng(canvasRef.current, {
            pixelRatio: 2
        })

        const response = await fetch(preview)
        const blobPreview = await (response).blob()

        const previewFilePath = await savePreview(user, savedProject, blobPreview)

        if (!previewFilePath) {
            console.log("!previewFilePath")
            return
        }

        await updateProjectPreviewURL(savedProject, previewFilePath)
    }

    useEffect(() => {
        const projectFromProfile = location.state?.project

        if (projectFromProfile) {
            handleOpenProject(projectFromProfile)
        }
    }, [])

    const handleSaveButtonClick = () => {
        if (!project) {
            setIsModalSaveProjectOpened(true)
        } else {
            handleSaveProject(project.project_name)
        }
    }


    return (
        <div className="createPageWrapper">
            {isModalProjectsListOpened &&
                <ModalProjectsList
                    closeModal={() => setIsModalProjectsListOpened(false)}
                    onProjectSelect={handleOpenProject}
                />}

            {isModalSaveProjectOpened && !project &&
                <ModalSaveProject
                    closeModal={() => setIsModalSaveProjectOpened(false)}
                    saveProject={handleSaveProject}
                />
            }

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
                            <CreateControlPanel undo={undo} redo={redo} handleSaveProject={handleSaveButtonClick} setIsModalOpened={setIsModalProjectsListOpened} />
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