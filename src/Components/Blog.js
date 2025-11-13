import { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useFetch from './../Hooks/useFetch'

const Blog = () => {
    const { id } = useParams()
    const [isPending, setIsPending] = useState(false)
    const history = useHistory()

    const url = `http://localhost:8000/blogs/${id}`
    const { data: blog, isLoading, error } = useFetch(url)

    const handleDelete = (id) => {
        const options = { method: 'delete' }
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
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{`Blog Details: #${blog.id} / ${blog.title}`}</h2>
                    <p>{blog.body}</p>
                    <p>Author: {blog.author}</p>
                    {!isPending && (
                        <button onClick={() => handleDelete(id)}>Delete</button>
                    )}
                    {isPending && <button disabled>Deleteing Blog...</button>}
                </article>
            )}
        </div>
    )
}
export default Blog
