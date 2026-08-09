import { useEffect, useRef, useState } from "react"
import { CreateItemsPanel } from "../../../features/CreateItemsPanel/ui/CreateItemsPanel"
import { CreateControlPanel } from "../../../features/createControlPanel/ui/CreateControlPanel"
import { CreatePalettePanel } from "../../../features/CreatePalettePanel/ui/CreatePalettePanel"
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
import { convertCanvasToPng } from "../model/convertCanvasToPng"


export const CreatePage = () => {

    const { user } = useAuth()

    const [project, setProject] = useState<Project | null>(null)

    const [isUnsaved, setIsUnsaved] = useState(false)

    const [isModalSaveUnsavedOpened, setIsModalSaveUnsavedOpened] = useState<boolean>(false)

    const [isModalProjectsListOpened, setIsModalProjectsListOpened] = useState<boolean>(false)

    const [isModalSaveProjectOpened, setIsModalSaveProjectOpened] = useState<boolean>(false)

    const [isCanvasSelected, setIsCanvasSelected] = useState<boolean>(false)

    const [isProjectNameEdit, setIsProjectNameEdit] = useState<boolean>(false)

    const [isNewProjectPending, setIsNewProjectPending] = useState<boolean>(false)

    const [projectName, setProjectName] = useState<string>(project ? project.project_name : "NEW PROJECT")

    const [oldProjectName, setOldProjectName] = useState<string>(projectName)

    const canvasRef = useRef<HTMLDivElement>(null)

    const [canvasElements, setCanvasElements] = useState<canvasElement[]>([])

    const { changeHistory, undo, redo, resetHistory } = useHistory(setCanvasElements)

    useEffect(() => {
        resetHistory([])

    }, [])

    const { handleDragStart, handleDragEnd, activeDrag } = useDrag(canvasRef, setCanvasElements, canvasElements, setIsUnsaved, changeHistory)

    const location = useLocation()

    const [selectedPalette, setSelectedPalette] = useState<string>(palettes.yellowBlue)
    const [selectedElemId, setSelectedElemId] = useState<string | null>(null)

    const handleOpenProject = (project: Project) => {

        setProject(project)

        setCanvasHeight(project.project_height)
        setCanvasWidth(project.project_width)
        setNewCanvasHeight(project.project_height)
        setNewCanvasWidth(project.project_width)

        setIsModalProjectsListOpened(false)

        setProjectName(project.project_name)

        setCanvasElements(project.canvas_elements)
        resetHistory(project.canvas_elements)
    }


    const handleSaveProject = async (projectName: string) => {
        console.log("handleSaveProject started")
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
        setProjectName(savedProject.project_name)
        setOldProjectName(savedProject.project_name)

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

        setIsUnsaved(false)

        console.log("handleSaveProject finished")
    }

    useEffect(() => {
        const projectFromProfile = location.state?.project
        const isNewProjectCreated = location.state?.new

        if (projectFromProfile) {
            handleOpenProject(projectFromProfile)
        }

        if (isNewProjectCreated) {
            createNewProject()
        }
    }, [])



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

    const confirmChangeProjectName = (newProjectName: string) => {
        console.log("confirmChangeProjectName started")
        if (newProjectName.length > 1000)
            return

        setProjectName(newProjectName)
        setOldProjectName(newProjectName)

        setIsUnsaved(true)
        setIsProjectNameEdit(false)

        console.log("confirmChangeProjectName finished")
    }

    const cancelChangeProjectName = () => {
        setProjectName(oldProjectName)
        setIsProjectNameEdit(false)
    }

    const handleCreateNewProject = () => {

        console.log("handleCreateNewProject started")
        if (isUnsaved) {
            setIsNewProjectPending(true)
            setIsModalSaveUnsavedOpened(true)
            console.log("handleCreateNewProject returned")
            return
        }

        createNewProject()
        console.log("handleCreateNewProject finished")
    }

    const createNewProject = () => {

        setIsNewProjectPending(false)

        setIsModalProjectsListOpened(false)

        setProjectName("NEW PROJECT")
        setOldProjectName("NEW PROJECT")

        setIsUnsaved(false)
        setProject(null)

        setCanvasWidth(30)
        setCanvasHeight(30)
        setNewCanvasWidth(30)
        setNewCanvasHeight(30)

        setSelectedElemId(null)
        setSelectedPalette(palettes.yellowBlue)
        setIsCanvasSelected(false)
        setIsProjectNameEdit(false)

        setCanvasElements([])
        resetHistory([])
    }

    const handleSaveButtonClick = async () => {
        console.log("handleSaveButtonClick started")
        if (!project) {
            setIsModalSaveProjectOpened(true)
        } else {
            await handleSaveProject(projectName)
        }
        console.log("handleSaveButtonClick finished")
    }

    const handleSaveUnsaved = async () => {
        if (project) {
            await handleSaveProject(projectName)
            createNewProject()
            setIsModalSaveUnsavedOpened(false)
            return
        }

        if (projectName !== "NEW PROJECT") {
            await handleSaveProject(projectName)
            createNewProject()
            setIsModalSaveUnsavedOpened(false)
            return
        }

        setIsModalSaveUnsavedOpened(false)
        setIsModalSaveProjectOpened(true)
    }

    const handleSaveProjectWithName = async (name: string) => {
        await handleSaveProject(name)

        setIsModalSaveProjectOpened(false)

        if (isNewProjectPending) {
            setIsNewProjectPending(false)
            createNewProject()
        }
    }

    const exportProjectToPng = async () => {

        if (!canvasRef)
            return

        const selectedElemIdTmp = selectedElemId

        setSelectedElemId(null)

        const dataUrl = await convertCanvasToPng(canvasRef)

        if (!dataUrl) return

        const link = document.createElement("a")
        link.download = `${projectName}.png`
        link.href = dataUrl
        link.click()

        setSelectedElemId(selectedElemIdTmp)
    }

    return (
        <div className="createPageWrapper">

            {isModalSaveUnsavedOpened &&
                <ModalSaveUnsaved
                    closeModal={() => setIsModalSaveUnsavedOpened(false)}
                    saveProject={handleSaveUnsaved}
                    createNewProject={createNewProject}
                />}

            {isModalProjectsListOpened &&
                <ModalProjectsList
                    closeModal={() => setIsModalProjectsListOpened(false)}
                    onProjectSelect={handleOpenProject}
                    createNewProject={createNewProject}
                />}

            {isModalSaveProjectOpened && !project &&
                <ModalSaveProject
                    projectName={projectName}
                    closeModal={() => setIsModalSaveProjectOpened(false)}
                    saveProject={handleSaveProjectWithName}
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
                            <CreateControlPanel undo={undo} redo={redo} handleSaveProject={async () => await handleSaveButtonClick()} setIsModalOpened={setIsModalProjectsListOpened} handleCreateNewProject={handleCreateNewProject}
                                exportProjectToPng={exportProjectToPng} />
                        </div>
                    </div>
                </div>


                <div className="projectStatePanel">
                    <div className="projectNameInfo">
                        PROJECT NAME:
                        {isProjectNameEdit ?

                            <input className="projectNameInput"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                            ></input>
                            :

                            <span> {projectName} </span>
                        }
                        {isProjectNameEdit ?
                            <>
                                <button
                                    className="pixelIconBtn"
                                    onClick={() => confirmChangeProjectName(projectName)}>
                                    ✔
                                </button>

                                <button
                                    className="pixelIconBtn"
                                    onClick={cancelChangeProjectName}>
                                    ✖
                                </button>
                            </>
                            : <button
                                className="pixelIconBtn"
                                onClick={() => setIsProjectNameEdit(true)}>
                                ✎
                            </button>
                        }

                    </div>
                    <div className="canvasSizeInfo">
                        <span>
                            CANVAS SIZE:
                        </span>
                        <div className="canvasSizeInfoNumbers">
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
                        </div>


                        {isCanvasSelected ?
                            <>
                                <span className="maxCanvasSize">MAX: 100</span>
                                <button
                                    className="pixelIconBtn"
                                    onClick={() => confirmResize(newCanvasWidth, newCanvasHeight)}>
                                    ✔
                                </button>

                                <button className="pixelIconBtn" onClick={() => cancelResize()}>
                                    ✖
                                </button>
                            </>
                            : <button
                                className="pixelIconBtn"
                                onClick={() => setIsCanvasSelected(true)}>
                                ✎
                            </button>
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