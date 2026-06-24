import { useState, useEffect } from "react"
import {drawingCanvasProps} from "../types"

export const DrawingCanvas = ({canvasElements, setCanvasElements, changeHistory}:drawingCanvasProps) => {

    const [selectedElemId, setSelectedElemId] = useState<string | null>()
   
    const moveSelectedElement = (xShift: number, yShift: number) => {
        
        if(selectedElemId == null) {
            return
        }


        setCanvasElements(prev => { 
            const newState = prev.map(
                elem => elem.id === selectedElemId ? 
                {
                    id: elem.id,
                    category: elem.category,
                    x: elem.x + xShift,
                    y: elem.y + yShift                
                } 
                : elem           
            )
        
        changeHistory(newState)
        return newState
        }
    )
    }

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if(e.key == "ArrowUp"){
                moveSelectedElement(0, -10)
            }

             
            if(e.key == "ArrowDown"){
                moveSelectedElement(0, 10)
            }

             
            if(e.key == "ArrowLeft"){
                moveSelectedElement(-10, 0)
            }

             
            if(e.key == "ArrowRight"){
                moveSelectedElement(10, 0)
            }
        }

        window.addEventListener("keydown", handleKeyPress)

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }

    }, [selectedElemId])

    return(
           <div 
           className="canvas" 
           onClick={()=>setSelectedElemId(null)}>

           { canvasElements.map(elem => (
            <button 
            key={elem.id} 
            onClick={
                (e)=>{e.stopPropagation()
                setSelectedElemId(elem.id)}} 
            style={{  
                position: "absolute",
                left: elem.x,
                top: elem.y,
                color: selectedElemId == elem.id ? "green" : "red"}}>
                {elem.category}
            </button>
           )) }

           </div>
    )
}