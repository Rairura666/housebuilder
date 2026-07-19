import { elementGeneral } from "../../../shared/types/types"

export const filterElements = (
    itemsPanelElements: elementGeneral[],
    selectedCategory: string,
    selectedPalette: string) => {

    return itemsPanelElements.filter(elem =>
        (elem.palette == selectedPalette) && (elem.category == selectedCategory || selectedCategory == "all")
    )
} 