import { useState } from "react"
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

    const elem3:elementGeneral = {
        id: "3",
        category: "window",
    }

    const elem4:elementGeneral = {
        id: "4",
        category: "base",
    }

     const elem5:elementGeneral = {
        id: "5",
        category: "roof",
    }
    
const itemsPanelElements: elementGeneral[] = [elem1, elem2, elem3, elem4, elem5]

export const CreateItemsPanel = () => {
  
    const [selectedCategory, setSelectedCategory] = useState<string>("all")

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value)
    }

    return (
        <div className="createItemsPanelWrapper">
            <div className="categoryOfItemPanel">
                <label className="categoryLabel">Category</label>
                <select className="categorySelection"
                onChange={handleCategoryChange}>
                    <option value="all">All</option>
                    <option value="base">Base</option>
                    <option value="window">Windows</option>
                    <option value="door">Doors</option>
                    <option value="roof">Roofs</option>
                </select>
            </div>

            <div className="itemsList">
                { 
                    itemsPanelElements.filter(elem => 
                        elem.category == selectedCategory || selectedCategory == "all"
                    )
                    .map(elem => 
                        <ElementPreview key={elem.id} elemGeneral={elem}/>
                    )
                }
            </div>
        </div>
    )
}