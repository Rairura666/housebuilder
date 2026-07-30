import { modalSaveUnsavedProps } from "../../../shared/types/types"
import "./ModalSaveUnsaved.css"

export const ModalSaveUnsaved = ({ closeModal, saveProject, createNewProject }: modalSaveUnsavedProps) => {
    return (<>
        <div className="modalSaveUnsavedWrapper">
            <div className="modalSaveUnsavedContent">
                <h3>Save current project?</h3>
                <button onClick={async () => { await saveProject(); closeModal(); createNewProject(); }}>Save</button>
                <button onClick={() => { createNewProject(); closeModal() }}>Discard</button>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    </>)
}