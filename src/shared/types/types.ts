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
    canvas_elements: canvasElement[]
}

export type drawingCanvasProps = {
        canvasRef: React.RefObject<HTMLDivElement | null>,
        canvasElements: canvasElement[],
        setCanvasElements:  Dispatch<SetStateAction<canvasElement[]>>, 
        changeHistory: (newState: canvasElement[]) => void,
        setSelectedElemId: Dispatch<SetStateAction<string | null>>,
        selectedElemId: string | null
    }

export type createControlPanelProps = {
    undo: () => void,
    redo: () => void,
    saveProject: () => void, 
    setIsModalOpened: Dispatch<SetStateAction<boolean>>,
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
    onProjectSelect: (project: Project)=> void,
    deleteProject: (projectId: string) => void,
}

export type modalProjectsListProps = {
    closeModal: () => void,
    onProjectSelect: (project: Project) => void
}

export type ProfileProjectsListProps = {
    onProjectSelect: (project: Project)=> void
}

export interface AuthContextType {
    user: User | null,
    signOut: () => Promise<void>
}