import { useDraggable } from "@dnd-kit/core";
import { elementPreviewProps } from "../types";
import "../Css/ElementPreview.css"


export const ElementPreview = ({elemGeneral}: elementPreviewProps) => {
  
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: elemGeneral.id,
        data: {
            category:  elemGeneral.category,
            type: "previewElem",
        }

     })

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
    } : undefined

    return(
    <div className="elementPreviewWrapper" ref={setNodeRef} {...listeners} {...attributes} style={style}>
         elem {elemGeneral.category}
    </div>
)}