import { ProjectsList } from "../../../features/ProfileProjectsList/ui/ProjectsList"
import { modalProjectsListProps } from "../../../shared/types/types"
import "../../../app/styles/ModalProjectsList.css"

export const ModalProjectsList = ({ closeModal, onProjectSelect, createNewProject }: modalProjectsListProps) => {
    return (<>
        <div className="modalProjectsListWrapper">
            <div className="modalProjectsListContent">
                <ProjectsList onProjectSelect={onProjectSelect} createNewProject={createNewProject}/>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    </>)
}