import { useCollection } from '../../hooks/useCollection'

// components
import ProjectList from '../../components/ProjectList'

// styles
import './Dashboard.css'
import ProjectFilter from 'pages/project/ProjectFilter'
import { useAuthContext } from 'hooks/useAuthContext'
import { useState } from 'react'

export default function Dashboard() {
    const { documents, error } = useCollection('projects', null, [
        'dueDate',
        'desc',
    ])
    const { user } = useAuthContext()
    const [currentFilter, setCurrentFilter] = useState('all')

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const projects = documents
        ? documents.filter((project) => {
              switch (currentFilter) {
                  case 'all':
                      return true
                  case 'mine':
                      let isAssignedToMe = false
                      for (let assignee of project.assignedTo) {
                          if (user.uid === assignee.id) {
                              isAssignedToMe = true
                          }
                      }
                      return isAssignedToMe
                  case 'sales':
                  case 'development':
                  case 'marketing':
                  case 'design':
                      return project.category === currentFilter
                  default:
                      return true
              }
          })
        : null

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className="error">{error}</p>}

            {projects && (
                <ProjectFilter
                    currentFilter={currentFilter}
                    changeFilter={changeFilter}
                />
            )}
            {projects && <ProjectList projects={projects} />}
        </div>
    )
}
