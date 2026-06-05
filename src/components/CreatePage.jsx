import { ItemsPanel } from "./ItemsPanel"
import { CreateControlPanel } from "./CreateControlPanel"
import { CreatePalettePanel } from "./CreatePalettePanel"

export const CreatePage = () => {
    return(
        <>
        <div  className = "menuBarsContainer">
        <ItemsPanel/>
        <CreatePalettePanel/>
        <CreateControlPanel/>
        </div>
        
        <div style={{width:"400px", height:"100px", backgroundColor:"blue"}} className="canvas"></div>
        </>
    )
}