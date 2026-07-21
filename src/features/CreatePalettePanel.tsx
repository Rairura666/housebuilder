import "../app/styles/CreatePalettePanel.css"
import { createPaletteProps } from "../shared/types/types"
import { palettes } from "../shared/config/constants"

export const CreatePalettePanel = ({setSelectedPalette}: createPaletteProps) => {
    return (
        <div className="createPalettePanelWrapper">
            <button 
            className="createPaletteBtn"
            onClick={()=>setSelectedPalette(palettes.yellowBlue)}
            >Yellow and blue</button>
            
            <button 
            className="createPaletteBtn"
             onClick={()=>setSelectedPalette(palettes.redGreen)}
            >Red and green</button>
            
            <button 
            className="createPaletteBtn"
            onClick={()=>setSelectedPalette(palettes.blackWhite)}
            >Black and white</button>
        </div>
    )
}