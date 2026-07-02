import {elementGeneral} from "../types"
import { ElementPreview } from "./ElementPreview"

    const elem1:elementGeneral = {
        id: "1",
        category: "window",
    }

    const elem2:elementGeneral = {
        id: "2",
        category: "door",
    }
    

export const CreateItemsPanel = () => {
  

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