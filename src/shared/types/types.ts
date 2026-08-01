import { Dispatch, SetStateAction } from "react"
import { User } from "@supabase/supabase-js"

export type canvasElement = {
    id: string,
    category: string,
    palette: string,
    x: number,
    y: number
}

export type elementGeneral = {
    id: string,
    category: string,
    palette: string,
}

export type Profile = {
    id: string,
    avatar_path: string | null,
    username: string | null,
}

export type Project = {
    id: string,
    user_id: string,
    project_name: string,
    canvas_elements: canvasElement[],
    project_preview_path: string,
    project_width: number,
    project_height: number,
}

export type drawingCanvasProps = {
    canvasRef: React.RefObject<HTMLDivElement | null>,
    canvasElements: canvasElement[],
    setCanvasElements: Dispatch<SetStateAction<canvasElement[]>>,
    changeHistory: (newState: canvasElement[]) => void,
    setSelectedElemId: Dispatch<SetStateAction<string | null>>,
    selectedElemId: string | null,
    newCanvasWidth: number,
    newCanvasHeight: number,
    setIsUnsaved: Dispatch<SetStateAction<boolean>>
}

export type createControlPanelProps = {
    undo: () => void,
    redo: () => void,
    handleSaveProject: () => void,
    setIsModalOpened: Dispatch<SetStateAction<boolean>>,
    handleCreateNewProject: () => void,
    exportProjectToPng: () => void,
}

export type canvasElementProps = {
    selected: boolean,
    elem: canvasElement
}

export type elementPreviewProps = {
    elemGeneral: elementGeneral
}

export type elementPreviewViewProps = {
    elemGeneral: elementGeneral
}

export type createPaletteProps = {
    setSelectedPalette: Dispatch<SetStateAction<string>>
}

export type createItemsPanelProps = {
    selectedPalette: string
}

export type profileUserInfoProps = {
    profile: Profile | null
}

export type projectPreviewProps = {
    project: Project,
    onProjectSelect: (project: Project) => void,
    deleteProject: (projectId: string) => void,
}

export type modalProjectsListProps = {
    closeModal: () => void,
    onProjectSelect: (project: Project) => void,
    createNewProject: () => void,
}

export type ProfileProjectsListProps = {
    onProjectSelect: (project: Project) => void,
    createNewProject: () => void,
}

export interface AuthContextType {
    user: User | null,
    signOut: () => Promise<void>
}

export type modalSaveProjectProps = {
    closeModal: () => void,
    saveProject: (projectName: string) => void,
    projectName: string,
}

export type modalSaveUnsavedProps = {
    closeModal: () => void,
    saveProject: () => void,
    createNewProject: () => void,
}