import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { canvasElement } from "../../../shared/types/types"

export const useHistory = (setCanvasElements: Dispatch<SetStateAction<canvasElement[]>>) => {

    const [historyState, setHistoryState] = useState({
        history: [] as canvasElement[][],
        historyIndex: 0,
    })

    useEffect(() => {
        const currentState = historyState.history[historyState.historyIndex]

        if (currentState) {
            setCanvasElements(currentState)
        }
    }, [historyState.historyIndex])

    const changeHistory = (newState: canvasElement[]) => {

        setHistoryState(prev => {

            const cutHistory = prev.history.slice(0, prev.historyIndex + 1)
            const updatedHistory = [...cutHistory, newState]

            console.log("UPDATE HISTORY: ", "new state: ", updatedHistory, " new index: ", updatedHistory.length - 1)

            return {
                history: updatedHistory,
                historyIndex: updatedHistory.length - 1
            }
        })
    }

    const undo = () => {
        setHistoryState(prev => {

            if (prev.historyIndex <= 0) {
                console.log("prev.historyIndex < 0")
                return prev
            }

            const newIndex = prev.historyIndex - 1

            console.log("UNDO: ", "new state: ", prev.history[newIndex] ?? [], " new index: ", newIndex)

            return {
                history: prev.history,
                historyIndex: newIndex
            }
        })
    }

    const redo = () => {
        setHistoryState(prev => {

            if (prev.historyIndex >= prev.history.length - 1) {
                return prev
            }

            const newIndex = prev.historyIndex + 1

            // setCanvasElements(prev.history[newIndex])

            return {
                history: prev.history,
                historyIndex: newIndex
            }
        })
    }

    const resetHistory = (initialState: canvasElement[]) => {
        setHistoryState({
            history: [initialState],
            historyIndex: 0
        }
        )
    }

    return { changeHistory, undo, redo, resetHistory }
}