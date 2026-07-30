import { useState } from "react"
import { modalSaveProjectProps } from "../../../shared/types/types"
import "./ModalSaveProject.css"

export const ModalSaveProject = ({ closeModal, saveProject }: modalSaveProjectProps) => {

    const [projectName, setProjectName] = useState<string>("")
    
    return (
        <>
            <div className="modalSaveProjectWrapper">
                <div className="modalSaveProjectContent">
                    <span>Enter project name:</span>
                    <input
                        type="text"
                        className="projectNameInput"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    ></input>
                    <button onClick={() => { saveProject(projectName); closeModal() }}>Save</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </>
    )
}