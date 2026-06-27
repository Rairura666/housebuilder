import {canvasElement, elementGeneral, createItemsPanelProps} from "../types"
import { CanvasElement } from "./CanvasElement"
import { ElementPreview } from "./ElementPreview"

export const CreateItemsPanel = ({addElementOnCanvas}:createItemsPanelProps) => {
  
    const elem1:elementGeneral = {
        id: "1",
        category: "window",
    }

    const elem2:elementGeneral = {
        id: "2",
        category: "door",
    }
    
    return (
        <div className="createItemsPanelWrapper">
            <div className="categoryOfItemPanel">
                <label className="categoryLabel">Category</label>
                <select className="categorySelection">
                    <option value="1">Base</option>
                    <option value="2">Windows</option>
                    <option value="2">Doors</option>
                    <option value="2">Roofs</option>
                </select>
            </div>

            <div className="itemsList">
                {/* <button onClick={()=>addElementOnCanvas(elem1)}> elem1</button>
                <button onClick={()=>addElementOnCanvas(elem2)}> elem2</button> */}
                <div className="elem">
                    <ElementPreview elemGeneral={elem1}/>
                </div>
                <div className="elem">
                    <ElementPreview elemGeneral={elem2}/>
                </div>
            </div>
        </div>
    )
}