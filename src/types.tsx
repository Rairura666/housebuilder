import { Dispatch, SetStateAction } from "react";   
   
export type canvasElement = {
        id: string,
        category: string,
        x: number,
        y: number
    }

export type elementGeneral = {
    id: string,
    category: string,
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

export type createItemsPanelProps = {
    addElementOnCanvas: (elem: canvasElement) => void
}

export type canvasElementProps = {
    selected: boolean,
    elem: canvasElement
}

export type elementPreviewProps = {
    elemGeneral: elementGeneral
}