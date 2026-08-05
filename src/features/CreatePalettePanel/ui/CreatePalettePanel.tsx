import "./CreatePalettePanel.css"
import { createPaletteProps } from "../../../shared/types/types"
import { palettes } from "../../../shared/config/constants"

export const CreatePalettePanel = ({ setSelectedPalette }: createPaletteProps) => {
    return (
        <div className="createPalettePanelWrapper">
            <label className="categoryLabel">Palettes</label>
            <div className="createPalettePanelPalettes">
                <button
                    className="createPaletteBtn"
                    onClick={() => setSelectedPalette(palettes.yellowBlue)}
                >Starry night</button>

                <button
                    className="createPaletteBtn"
                    onClick={() => setSelectedPalette(palettes.redGreen)}
                >Old town</button>

                <button
                    className="createPaletteBtn"
                    onClick={() => setSelectedPalette(palettes.blackWhite)}
                >Retro</button>
            </div>
        </div>
    )
}