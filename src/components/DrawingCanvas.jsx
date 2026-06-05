import { useState } from "react"

export const DrawingCanvas = ({canvasElements}) => {

    const [selectedItem, setSelectedItem] = useState()

    return(
        <>
           <div 
           style={{width:"400px", height:"100px", color:"red", backgroundColor:"blue"}} 
           className="canvas" 
           onClick={()=>setSelectedItem(null)}>

           { canvasElements.map(elem => (
            <button 
            key={elem.id} 
            onClick={
                (e)=>{e.stopPropagation()
                setSelectedItem(elem.id)}} 
            style={{color: selectedItem == elem.id ? "green" : "red"}}>
                {elem.category}
            </button>
           )) }

           </div>
        </>
    )
}