import { useState } from "react"
import { modalSaveProjectProps } from "../../../shared/types/types"
import "./ModalSaveProject.css"

export const ModalSaveProject = ({ closeModal, saveProject, projectName}: modalSaveProjectProps) => {

    const [modalProjectName, setProjectName] = useState<string>(projectName!="NEW PROJECT" ? projectName : "")
    
    return (
        <>
            <div className="modalSaveProjectWrapper">
                <div className="modalSaveProjectContent">
                    <span>Enter project name:</span>

                    <input
                        type="text"
                        className="modalProjectNameInput"
                        value={modalProjectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    ></input>

                    <button onClick={()=>saveProject(modalProjectName)}>Save</button>

                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </>
    )
}