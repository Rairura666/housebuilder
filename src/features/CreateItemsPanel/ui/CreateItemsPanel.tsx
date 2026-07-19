import { useState } from "react"
import {createItemsPanelProps, elementGeneral} from "../../../shared/types/types"
import { palettes, categories} from "../../../shared/config/constants"
import { ElementPreview } from "../../../shared/ElementPreview"
import { filterElements } from "../model/filterElements"
import { useCategory } from "../model/useCategory"

    const elem1:elementGeneral = {
        id: "1",
        category: categories.window,
        palette: palettes.redGreen
    }

    const elem2:elementGeneral = {
        id: "2",
        category: categories.door,
        palette: palettes.yellowBlue
    }

    const elem3:elementGeneral = {
        id: "3",
        category: categories.window,
        palette: palettes.blackWhite
    }

    const elem4:elementGeneral = {
        id: "4",
        category: categories.base,
        palette: palettes.yellowBlue
    }

     const elem5:elementGeneral = {
        id: "5",
        category: categories.roof,
        palette: palettes.redGreen
    }
    
const itemsPanelElements: elementGeneral[] = [elem1, elem2, elem3, elem4, elem5]

export const CreateItemsPanel = ({selectedPalette}: createItemsPanelProps) => {
  
    const {selectedCategory, handleCategoryChange} = useCategory()

    const filteredElements = filterElements(itemsPanelElements, selectedCategory, selectedPalette)

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
                    filteredElements.map(elem => 
                        <ElementPreview key={elem.id} elemGeneral={elem}/>
                    )
                }
            </div>
        </div>
    )
}