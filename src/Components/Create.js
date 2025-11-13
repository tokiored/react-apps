import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('Blakey')
    const [isPending, setIsPending] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        setIsPending(true)

        const url = `http://localhost:8000/blogs`
        const blog = { title, body, author }
        const options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog),
        }

        fetch(url, options)
            .then((res) => {
                setIsPending(false)
                history.push('/')
            })
            .catch((err) => {
                console.error(err.message)
                setIsPending(false)
            })
    }

    return (
        <div>
            <h2>Create BLog</h2>
            <form onSubmit={handleSubmit}>
                <p>Title</p>
                <input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
                <p>Body</p>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Blakey">Blakey</option>
                    <option value="Coltrain">Coltrain</option>
                </select>
                {!isPending && <button type="submit">Add Blog</button>}
                {isPending && (
                    <button type="submit" disabled>
                        Adding Blog...
                    </button>
                )}
            </form>
        </div>
    )
}
export default Create
