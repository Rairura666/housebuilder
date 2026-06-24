import { useState } from "react"
import { CreateItemsPanel } from "./CreateItemsPanel"
import { CreateControlPanel } from "./CreateControlPanel"
import { CreatePalettePanel } from "./CreatePalettePanel"
import { DrawingCanvas } from "./DrawingCanvas"
import "../Css/CreatePage.css"
import {canvasElement } from "../types"

export const CreatePage = () => {

    const [canvasElements, setCanvasElements] = useState<canvasElement[]>([])

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

        setHistoryIndex(historyIndex - 1)
        setCanvasElements(history[historyIndex - 1] ?? [])
    }

    const redo = () => {
        if (historyIndex == history.length - 1) {
            return
        }

        setHistoryIndex(historyIndex + 1)
        setCanvasElements(history[historyIndex + 1])
    }


    const addElementOnCanvas = (category: string) => {

        const newState = [...canvasElements, {
            id: crypto.randomUUID(),
            category,
            x: 0,
            y: 0
        }]
        setCanvasElements(newState)

        changeHistory(newState)
    }

    return (
        <div className="createPageWrapper">
            <div className="menuBarsContainer">
                <div className="leftControlPanel">
                    <CreateItemsPanel addElementOnCanvas={addElementOnCanvas} />
                </div>

                <div className="canvasWrapper">
                    <DrawingCanvas changeHistory={changeHistory} canvasElements={canvasElements} setCanvasElements={setCanvasElements} />
                </div>

                <div className="rightControlPanel">
                    <CreatePalettePanel />
                    <div className="createControlPanel">
                        <CreateControlPanel undo={undo} redo={redo} />                    
                    </div>
                </div>
            </div>
        </div>
    )
}