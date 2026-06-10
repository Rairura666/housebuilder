import { useState } from "react"
import { CreateItemsPanel } from "./CreateItemsPanel"
import { CreateControlPanel } from "./CreateControlPanel"
import { CreatePalettePanel } from "./CreatePalettePanel"
import { DrawingCanvas } from "./DrawingCanvas"
import { useContext } from "react"

export const CreatePage = () => {

    const [canvasElements, setCanvasElements] = useState([]) 

    const addElementOnCanvas = (category) => {
        setCanvasElements(prev => [...prev, {
            id: crypto.randomUUID(),
            category,
            x: 0,
            y: 0 
        }])
    }



    return(
        <>
        <div  className = "menuBarsContainer">
        <CreateItemsPanel addElementOnCanvas={addElementOnCanvas} />
        <CreatePalettePanel/>
        <CreateControlPanel/>
        </div>
        
        <DrawingCanvas canvasElements={canvasElements} setCanvasElements = {setCanvasElements}/>
        </>
    )
}