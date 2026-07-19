import { useDraggable } from "@dnd-kit/core";
import { elementPreviewProps } from "./types/types";
import "../app/styles/ElementPreview.css"


export const ElementPreview = ({elemGeneral}: elementPreviewProps) => {
  
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: elemGeneral.id,
        data: {
            category:  elemGeneral.category,
            type: "previewElem",
        }
     })

    return(
    <div className="elementPreviewWrapper" ref={setNodeRef} {...listeners} {...attributes}>
        {elemGeneral.category}
    </div>
)
}