import { useDraggable } from "@dnd-kit/core";
import { canvasElementProps } from "../../../shared/types/types";
import "../../../app/styles/CanvasElement.css"


export const CanvasElement = ({selected, elem}: canvasElementProps) => {
  
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: elem.id,
        data: {
            category: elem.category,
            type: "canvasElem",
            }
     })

    const style = {
    border: selected ? "solid 2px green" : "none"
    }
    

    return(
    <div className="canvasElementWrapper" 
    data-id={elem.id} 
    ref={setNodeRef} {...listeners} {...attributes} style={style}
    tabIndex={-1}>
        {elem.category}
    </div>
)}