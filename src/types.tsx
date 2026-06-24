import { Dispatch, SetStateAction } from "react";   
   
export type canvasElement = {
        id: string,
        category: string,
        x: number,
        y: number
    }

    
export type drawingCanvasProps = {
        canvasElements: canvasElement[],
        setCanvasElements:  Dispatch<SetStateAction<canvasElement[]>>, 
        changeHistory: (newState: canvasElement[]) => void
    }

export type createControlPanelProps = {
    undo: () => void,
    redo: () => void 
}

export type createItemsPanelProps = {
    addElementOnCanvas: (category: string) => void
}
