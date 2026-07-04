import { elementPreviewProps } from "../types";
import "../Css/ElementPreview.css"


export const ElementPreviewView = ({elemGeneral}: elementPreviewProps) => {
    return(
    <div className="elementPreviewWrapper">
        {elemGeneral.category}
    </div>
)}