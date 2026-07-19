import { Dispatch, SetStateAction, useState } from "react"
import { canvasElement } from "../../../shared/types/types"

export const useHistory = (setCanvasElements: Dispatch<SetStateAction<canvasElement[]>>) => {
    
    const [history, setHistory] = useState<canvasElement[][]>([])
    const [historyIndex, setHistoryIndex] = useState<number>(-1)

    const changeHistory = (newState: canvasElement[]) => {

        setHistory(prev => {
            const cutHistory = prev.slice(0, historyIndex + 1)
            const updatedHistory = [...cutHistory, newState]

            setHistoryIndex(updatedHistory.length - 1)
            return updatedHistory
        })
    }

    const undo = () => {
        if (historyIndex < 0) {
            return
        }

        setHistoryIndex(prev => prev - 1)
        setCanvasElements(history[historyIndex - 1] ?? [])
    }

    const redo = () => {
        if (historyIndex == history.length - 1) {
            return
        }

        setHistoryIndex(prev => prev + 1)
        setCanvasElements(history[historyIndex + 1])
    }


    return {changeHistory, undo, redo}
}