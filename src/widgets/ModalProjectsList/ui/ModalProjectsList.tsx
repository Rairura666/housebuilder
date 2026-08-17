import { ProjectsList } from "../../../features/ProfileProjectsList/ui/ProjectsList"
import { modalProjectsListProps } from "../../../shared/types/types"
import "./ModalProjectsList.css"

export const ModalProjectsList = ({ closeModal, onProjectSelect }: modalProjectsListProps) => {
    return (<>
        <div className="modalProjectsListWrapper">
            <div className="modalProjectsListContent">
                <ProjectsList onProjectSelect={onProjectSelect} closeModal={closeModal}/>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    </>)
}