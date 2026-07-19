import { elementPreviewProps } from "./types/types";
import "../app/styles/ElementPreview.css"


export const ElementPreviewView = ({elemGeneral}: elementPreviewProps) => {
    return(
    <div className="elementPreviewWrapper">
        {elemGeneral.category}
    </div>
)}