import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs, handleDelete }) => {
    return (
        <div className="blog-list">
            {blogs.map((blog) => (
                <div key={blog.id} className="blog-preview">
                    <Link to={`/blog-details/${blog.id}`}>
                        <h2 className="title">{blog.title}</h2>
                        <p className="author">Author: {blog.author}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
        }).isRequired
    ),
    handleDelete: PropTypes.func.isRequired,
}
export default BlogList
