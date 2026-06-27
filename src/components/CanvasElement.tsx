import { useDraggable } from "@dnd-kit/core";
import { canvasElementProps } from "../types";
import "../Css/CanvasElement.css"


export const CanvasElement = ({elem}: canvasElementProps) => {
  
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: elem.id,
        data: {
            category: elem.category,
            type: "canvasElem",
            }
     })

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
    } : undefined

    return(
    <div className="canvasElementWrapper" ref={setNodeRef} {...listeners} {...attributes} style={style}>
         elem {elem.category}
    </div>
)}