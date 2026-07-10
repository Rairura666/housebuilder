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
    redo: () => void 
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

export type navBarProps = {
    user: User | null
}

export type mainLayoutProps = {
    user: User | null
}

export type profilePageProps = {
    user: User | null
}

export type profileUserInfoProps = {
    user: User | null,
    profile: Profile | null,
    setProfile: Dispatch<SetStateAction<Profile | null>>
}