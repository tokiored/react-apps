import BlogList from './../Components/BlogList'
import useFetch from './../Hooks/useFetch'

const Home = () => {
    const {
        data: blogs,
        isLoading,
        error,
    } = useFetch('http://localhost:8000/blogs')

    const handleDelete = (id) => {
        // const newBlogs = blogs.filter((blog) => blog.id !== id)
        // setBlogs(newBlogs)
    }

    return (
        <div className="home">
            <h2>Current Blogs</h2>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blogs && <BlogList handleDelete={handleDelete} blogs={blogs} />}
        </div>
    )
}

export default Home
