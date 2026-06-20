import { useEffect } from "react"

export const CreateItemsPanel = ({addElementOnCanvas}) => {
  
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
                <button onClick={()=>addElementOnCanvas("elem1")}>elem 1</button>
                <button onClick={()=>addElementOnCanvas("elem2")}>elem 2</button>
                 <button onClick={()=>addElementOnCanvas("elem1")}>elem 1</button>
                <button onClick={()=>addElementOnCanvas("elem2")}>elem 2</button>

                 <button onClick={()=>addElementOnCanvas("elem1")}>elem 1</button>
                <button onClick={()=>addElementOnCanvas("elem2")}>elem 2</button>
                 <button onClick={()=>addElementOnCanvas("elem1")}>elem 1</button>
                <button onClick={()=>addElementOnCanvas("elem2")}>elem 2</button>
                 <button onClick={()=>addElementOnCanvas("elem1")}>elem 1</button>
                <button onClick={()=>addElementOnCanvas("elem2")}>elem 2</button>
                 <button onClick={()=>addElementOnCanvas("elem1")}>elem 1</button>
                <button onClick={()=>addElementOnCanvas("elem2")}>elem 2</button>
                 <button onClick={()=>addElementOnCanvas("elem1")}>elem 1</button>
                <button onClick={()=>addElementOnCanvas("elem2")}>elem 2</button>
                 <button onClick={()=>addElementOnCanvas("elem1")}>elem 1</button>
                <button onClick={()=>addElementOnCanvas("elem2")}>elem 2</button>
                     <button onClick={()=>addElementOnCanvas("elem1")}>elem 1</button>
                <button onClick={()=>addElementOnCanvas("elem2")}>elem 2</button>
            </div>
        </div>
    )
}