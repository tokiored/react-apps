import { useNavigate } from 'react-router-dom'

import { useFirestore } from 'hooks/useFirestore'
import { useAuthContext } from 'hooks/useAuthContext'
import Avatar from '../../components/Avatar'

export default function ProjectSummary({ project }) {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { deleteDocument, response } = useFirestore('projects')

    /**
     * The project component is unmounted on delete meaning the
     * succesful "DELETE_DOCUMENT" dispatch will not fire
     *
     * For now just redirect stright away
     */
    async function handleDelete() {
        deleteDocument(project.id)
        navigate('/', { replace: true })
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p className="due-date">Project due by {project.dueDate}</p>
                <p className="created-by">
                    Created by {project.createdBy.displayName}
                </p>
                <p className="details">{project.details}</p>
                <h4>Project assigned to:</h4>
                <div className="assigned-users">
                    {project.assignedTo &&
                        project.assignedTo.map((user) => (
                            <div key={user.id}>
                                <Avatar initial={user.displayName[0]} />
                            </div>
                        ))}
                </div>
            </div>
            {user.uid === project.createdBy.id && (
                <button
                    className="btn"
                    onClick={handleDelete}
                    disabled={response.isPending}
                >
                    {!response.isPending ? 'Mark as Complete' : 'Marking...'}
                </button>
            )}
        </div>
    )
}
