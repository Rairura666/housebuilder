import { useState } from "react"

export const useCategory = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value)
    }

    return {
        selectedCategory,
        handleCategoryChange
    }
}