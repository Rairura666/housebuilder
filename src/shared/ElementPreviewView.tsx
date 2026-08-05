import { elementPreviewProps } from "./types/types";
import "./ElementPreview/ui/ElementPreview.css"


export const ElementPreviewView = ({elemGeneral}: elementPreviewProps) => {
    return(
    <div className="elementPreviewWrapper">
        {elemGeneral.category}
    </div>
)}