import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'

// styles
import './ProjectList.css'

export default function ProjectList({ projects }) {
    return (
        <div className="project-list">
            {projects.length === 0 && <p>No projects yet!</p>}
            {projects.map((project) => (
                <Link to={`/projects/${project.id}`} key={project.id}>
                    <h4>{project.name}</h4>
                    <p>Due by {project.dueDate}</p>
                    <div className="assigned-to">
                        <p>
                            <strong>Assigned to:</strong>
                        </p>
                        <ul>
                            {project.assignedTo.map((user) => (
                                <li key={user.photoURL}>
                                    <Avatar initial={user.displayName[0]} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}
