import { useEffect, useRef, useState } from "react"
import { CreateItemsPanel } from "../../../features/CreateItemsPanel/ui/CreateItemsPanel"
import { CreateControlPanel } from "../../../features/createControlPanel/ui/CreateControlPanel"
import { CreatePalettePanel } from "../../../features/CreatePalettePanel"
import { DrawingCanvas } from "../../../widgets/DrawingCanvas/ui/DrawingCanvas"
import "./CreatePage.css"
import { canvasElement, Project } from "../../../shared/types/types"
import { CANVAS_PIXEL_SIZE, palettes } from "../../../shared/config/constants"
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
import { ModalSaveUnsaved } from "../../../widgets/ModalSaveUnsaved/ui/ModalSaveUnsaved"


export const CreatePage = () => {

    const { user } = useAuth()

    const [isUnsaved, setIsUnsaved] = useState(false)

    const [isModalSaveUnsavedOpened, setIsModalSaveUnsavedOpened] = useState<boolean>(false)

    const [isModalProjectsListOpened, setIsModalProjectsListOpened] = useState<boolean>(false)

    const [isModalSaveProjectOpened, setIsModalSaveProjectOpened] = useState<boolean>(false)

    const [isCanvasSelected, setIsCanvasSelected] = useState<boolean>(false)

    const canvasRef = useRef<HTMLDivElement>(null)

    const [canvasElements, setCanvasElements] = useState<canvasElement[]>([])

    const { changeHistory, undo, redo, resetHistory } = useHistory(setCanvasElements)
    const { handleDragStart, handleDragEnd, activeDrag } = useDrag(canvasRef, setCanvasElements, setIsUnsaved)

    const location = useLocation()

    const [project, setProject] = useState<Project | null>(null)

    const [selectedPalette, setSelectedPalette] = useState<string>(palettes.yellowBlue)
    const [selectedElemId, setSelectedElemId] = useState<string | null>(null)

    const handleOpenProject = (project: Project) => {

        setProject(project)

        setCanvasHeight(project.project_height)
        setCanvasWidth(project.project_width)
        setNewCanvasHeight(project.project_height)
        setNewCanvasWidth(project.project_width)

        setCanvasElements(project.canvas_elements)

        setIsModalProjectsListOpened(false)
    }


    const handleSaveProject = async (projectName: string) => {

        const savedProject = await saveProject(
            user,
            project,
            canvasElements,
            projectName,
            newCanvasWidth,
            newCanvasHeight
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

    const handleSaveButtonClick = async() => {
        if (!project) {
            setIsModalSaveProjectOpened(true)
        } else {
            await handleSaveProject(project.project_name)
        }
    }

    const [canvasWidth, setCanvasWidth] = useState<number>(30)
    const [canvasHeight, setCanvasHeight] = useState<number>(30)

    const [newCanvasWidth, setNewCanvasWidth] = useState<number>(canvasWidth)
    const [newCanvasHeight, setNewCanvasHeight] = useState<number>(canvasHeight)

    const confirmResize = (width: number, height: number) => {
        if (width > 100 || height > 100)
            return
        setCanvasWidth(width)
        setCanvasHeight(height)
        setIsCanvasSelected(false)
        setIsUnsaved(true)
    }

    const cancelResize = () => {
        setNewCanvasWidth(canvasWidth)
        setNewCanvasHeight(canvasHeight)
        setIsCanvasSelected(false)
    }

    const handleCreateNewProject = () => {

        if (isUnsaved) {
            setIsModalSaveUnsavedOpened(true)
            return
        }

        createNewProject()
    }

    const createNewProject = () => {

        setIsUnsaved(false)
        setProject(null)
        setCanvasElements([])

        setCanvasWidth(30)
        setCanvasHeight(30)
        setNewCanvasWidth(30)
        setNewCanvasHeight(30)

        setSelectedElemId(null)
        setSelectedPalette(palettes.yellowBlue)
        setIsCanvasSelected(false)

        resetHistory([])
    }

    return (
        <div className="createPageWrapper">

            {isModalSaveUnsavedOpened &&
                <ModalSaveUnsaved
                    closeModal={() => setIsModalSaveUnsavedOpened(false)}
                    saveProject={async() => {await handleSaveButtonClick()}}
                    createNewProject={createNewProject}
                />}

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
                        <div className="drawingCanvasComponentWrapper">
                            <DrawingCanvas canvasRef={canvasRef} setSelectedElemId={setSelectedElemId} selectedElemId={selectedElemId} changeHistory={changeHistory} canvasElements={canvasElements} setCanvasElements={setCanvasElements}
                                newCanvasWidth={newCanvasWidth} newCanvasHeight={newCanvasHeight}
                                setIsUnsaved={setIsUnsaved} />
                        </div>

                    </div>

                    <div className="rightControlPanel">
                        <CreatePalettePanel setSelectedPalette={setSelectedPalette} />


                        <div className="createControlPanel">
                            <CreateControlPanel undo={undo} redo={redo} handleSaveProject={handleSaveButtonClick} setIsModalOpened={setIsModalProjectsListOpened} handleCreateNewProject={handleCreateNewProject} />
                        </div>
                    </div>
                </div>


                <div className="projectStatePanel">
                    <div className="projectNameInfo">
                        PROJECT NAME:
                        {project ?
                            <span> {project.project_name} </span>
                            : <span> NEW PROJECT </span>}
                    </div>
                    <div className="canvasSizeInfo">
                        <span>
                            CANVAS SIZE:
                            {isCanvasSelected ?

                                <input className="canvasSizeInput"
                                    value={newCanvasWidth}
                                    onChange={(e) => setNewCanvasWidth(Math.floor(Number(e.target.value)))}
                                ></input>
                                : <span
                                    className="canvasSizeNumber"
                                >{canvasWidth}</span>}
                            х
                            {isCanvasSelected ?
                                <input className="canvasSizeInput"
                                    value={newCanvasHeight}
                                    onChange={(e) => setNewCanvasHeight(Math.floor(Number(e.target.value)))}
                                ></input>
                                : <span className="canvasSizeNumber">{canvasHeight}</span>}
                        </span>

                        {isCanvasSelected ?
                            <>
                                <span className="maxCanvasSize">MAX: 100</span>
                                <button onClick={() => confirmResize(newCanvasWidth, newCanvasHeight)}>✔</button>

                                <button onClick={() => cancelResize()}>✖</button>
                            </>
                            : <button onClick={() => setIsCanvasSelected(true)}>▶</button>
                        }
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