export const CreateItemsPanel = ({addElementOnCanvas}) => {
    return (
        <>
            <div className="categoryOfItemPanel">
                <label>Category</label>
                <select >
                    <option value="1"></option>
                    <option value="2"></option>
                </select>
            </div>

            <div className="itemsList">
            <button onClick={()=>addElementOnCanvas("elem1")}>elem 1</button>
            <button onClick={()=>addElementOnCanvas("elem2")}>elem 2</button>

            </div>
        </>
    )
}