import { useEffect } from "react"
import {drawingCanvasProps} from "../types"
import  { useDroppable } from "@dnd-kit/core"
import { CanvasElement } from "./CanvasElement"
import "../Css/DrawingCanvas.css"
import {CANVAS_PIXEL_SIZE} from "../constants"

export const DrawingCanvas = ({canvasRef, setSelectedElemId, selectedElemId, canvasElements, setCanvasElements, changeHistory}:drawingCanvasProps) => {
 

   
    const {setNodeRef} = useDroppable({
        id: 'canvasId',
     })

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
                moveSelectedElement(0, -1 * CANVAS_PIXEL_SIZE)
            }

             
            if(e.key == "ArrowDown"){
                moveSelectedElement(0, 1 * CANVAS_PIXEL_SIZE)
            }

             
            if(e.key == "ArrowLeft"){
                moveSelectedElement(-1 * CANVAS_PIXEL_SIZE, 0)
            }

             
            if(e.key == "ArrowRight"){
                moveSelectedElement(1 * CANVAS_PIXEL_SIZE, 0)
            }
        }

        window.addEventListener("keydown", handleKeyPress)

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }

    }, [selectedElemId, canvasElements])


    const setCanvasRef = (node: HTMLDivElement | null) => {
        setNodeRef(node)
        canvasRef.current = node
    }

    return(
           <div 
           ref={setCanvasRef}
           className="canvas" 
           onClick={()=>setSelectedElemId(null)}>

            { canvasElements.map(elem => 
            <div
            key={elem.id} 
            onPointerDown={
                (e)=>{e.stopPropagation()
                setSelectedElemId(elem.id)}}
            className="canvasElem"  
            style={{ 
                position: "absolute", 
                left: elem.x,
                top: elem.y,
               }}> 
                <CanvasElement selected={selectedElemId == elem.id} elem={elem}/> 
            </div> ) }

           </div>
    )
}