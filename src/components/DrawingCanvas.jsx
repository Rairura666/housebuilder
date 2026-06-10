import { useState, useEffect } from "react"

export const DrawingCanvas = ({canvasElements, setCanvasElements}) => {

    const [selectedElemId, setSelectedElemId] = useState()
   
    const moveSelectedElement = (xShift, yShift) => {
        
        if(selectedElemId == null) {
            return
        }

        setCanvasElements(prev => prev.map(
            elem => elem.id === selectedElemId ? 
            {
                id: elem.id,
                category: elem.category,
                x: elem.x + xShift,
                y: elem.y + yShift
                
            } 
            : elem
            
        ))
    }

    useEffect(() => {
        const handleKeyPress = (e) => {
            if(e.key == "ArrowUp"){
                moveSelectedElement(0, -10)
            }

             
            if(e.key == "ArrowDown"){
                moveSelectedElement(0, 10)
            }

             
            if(e.key == "ArrowLeft"){
                moveSelectedElement(-10, 0)
            }

             
            if(e.key == "ArrowRight"){
                moveSelectedElement(10, 0)
            }
        }

        window.addEventListener("keydown", handleKeyPress)

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }

    }, [selectedElemId])

    return(
        <>
           <div 
           style={{position: "relative", width:"400px", height:"100px", color:"red", backgroundColor:"blue"}} 
           className="canvas" 
           onClick={()=>setSelectedElemId(null)}>

           { canvasElements.map(elem => (
            <button 
            key={elem.id} 
            onClick={
                (e)=>{e.stopPropagation()
                setSelectedElemId(elem.id)}} 
            style={{  position: "absolute",
        left: elem.x,
        top: elem.y,
            color: selectedElemId == elem.id ? "green" : "red"}}>
                {elem.category}
            </button>
           )) }

           </div>
        </>
    )
}