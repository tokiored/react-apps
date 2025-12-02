import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'
// styles
import './Create.css'
import { useCollection } from 'hooks/useCollection'
import { useFirestore } from 'hooks/useFirestore'
import { useAuthContext } from 'hooks/useAuthContext'

const animatedComponents = makeAnimated()

export default function Create() {
    const navigate = useNavigate()

    // form field values
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    // hooks
    const { documents: assignees } = useCollection('users')
    const { response, addDocument } = useFirestore('projects')

    // auth
    const { user } = useAuthContext()

    const categories = [
        { value: 'design', label: 'design' },
        { value: 'development', label: 'development' },
        { value: 'sales', label: 'sales' },
        { value: 'marketing', label: 'design' },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!category) {
            setFormError('Project must have a category')
            return
        }
        if (!assignedUsers.length) {
            setFormError('Project must be assigened to a user')
            return
        }

        const assignedTo = assignedUsers.map((u) => ({
            displayName: u.displayName,
            id: u.id,
            ...(u.photoUrl && { photoUrl: u.photoUrl }),
        }))

        const createdBy = {
            id: user.uid,
            displayName: user.displayName,
            ...(user.photoUrl && { photoUrl: user.photoUrl }),
        }

        await addDocument({
            name,
            details,
            dueDate,
            category,
            assignedTo,
            createdBy,
            comments: [], // required deafult value
        })
    }

    useEffect(() => {
        if (response.success && response.document) {
            navigate('/', { replace: true })
        }
    }, [response, navigate])

    return (
        <div className="create-form">
            <h2 className="page-title">Create a new Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <label>
                    <span>Set due date:</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project category:</span>
                    <Select
                        onChange={(option) => setCategory(option.value)}
                        options={categories}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={assignees}
                        getOptionLabel={(option) => option.displayName}
                        getOptionValue={(option) => option.id}
                        onChange={(option) => setAssignedUsers(option)}
                    />
                </label>

                <button className="btn" disabled={response.isPending}>
                    {response.isPending ? 'Adding Project...' : 'Add Project'}
                </button>

                {formError && <p className="error">{formError}</p>}
                {response.error && <p className="error">{response.error}</p>}
            </form>
        </div>
    )
}
