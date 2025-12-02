import { useEffect, useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'

import { useAuthContext } from 'hooks/useAuthContext'
import { useFirestore } from 'hooks/useFirestore'
import ProjectCommentList from './ProjectCommentList'
import Avatar from 'components/Avatar'

export default function ProjectComment({ project }) {
    const [comment, setComment] = useState('')
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')

    async function handleSubmit(e) {
        e.preventDefault()

        const comm = {
            // id: Math.random(),
            displayName: user.displayName,
            content: comment,
            created_at: new Date(),
            ...(user.photoUrl && { photoUrl: user.photoUrl }),
        }

        const updates = await updateDocument(project.id, comm, 'comments')
    }

    useEffect(() => {
        if (response.success && response.document) {
            // on success reset the comment form
            setComment('')
        }
    }, [response])

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>

            <ProjectCommentList comments={project.comments} />

            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span className="label-text">Add a comment</span>
                    <input
                        name="comment"
                        type="textarea"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <button className="btn" type="submit">
                    {response.isPending && 'Adding...'}
                    {!response.isPending && 'Add'}
                </button>
            </form>
            {response.error && <p className="eror">{response.error}</p>}
        </div>
    )
}
