import { ProfileProjectsList } from "../../../features/ProfileProjectsList/ui/ProfileProjectsList"
import { modalProjectsListProps } from "../../../shared/types/types"
import "../../../app/styles/ModalProjectsList.css"

export const ModalProjectsList = ({ closeModal, onProjectSelect }: modalProjectsListProps) => {
    return (<>
        <div className="modalProjectsListWrapper">
            <div className="modalProjectsListContent">
                <ProfileProjectsList onProjectSelect={onProjectSelect}/>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    </>)
}