import { useState } from "react"
import { CreateItemsPanel } from "./CreateItemsPanel"
import { CreateControlPanel } from "./CreateControlPanel"
import { CreatePalettePanel } from "./CreatePalettePanel"
import { DrawingCanvas } from "./DrawingCanvas"
import { useContext } from "react"

export const CreatePage = () => {

    const [canvasElements, setCanvasElements] = useState([]) 

    const [history, setHistory] = useState([])
    const [historyIndex, setHistoryIndex] = useState(-1)


    const changeHistory = (newState) => {
        
        setHistory(prev => {
            const cutHistory = prev.slice(0, historyIndex + 1) 
            const updatedHistory = [...cutHistory, newState]
                
            setHistoryIndex(updatedHistory.length - 1)    
            return updatedHistory
        })
    }

    const undo = () => {
        if(historyIndex < 0) {
            return
        }

        setHistoryIndex(historyIndex - 1)
        setCanvasElements(history[historyIndex-1] ?? [])
    }

    const redo = () => {
        if(historyIndex == history.length - 1) {
            return
        }

        setHistoryIndex(historyIndex + 1)
        setCanvasElements(history[historyIndex+1])
    }


    const addElementOnCanvas = (category) => {
        
        const newState = [...canvasElements, {
            id: crypto.randomUUID(),
            category,
            x: 0,
            y: 0 
        }]
        setCanvasElements(newState)

        changeHistory(newState)
    }



    return(
        <>
        <div  className = "menuBarsContainer">
        <CreateItemsPanel addElementOnCanvas={addElementOnCanvas} />
        <CreatePalettePanel/>
        <CreateControlPanel undo={undo} redo={redo}/>
        </div>
        
        <DrawingCanvas changeHistory={changeHistory} canvasElements={canvasElements} setCanvasElements = {setCanvasElements}/>
        </>
    )
}