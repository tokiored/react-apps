import { Link } from 'react-router-dom'
const Nav = () => {
    return (
        <header className="app-header">
            <nav className="navbar">
                <h1>Blog App</h1>
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/create">Add Blog</Link>
                </div>
            </nav>
        </header>
    )
}
export default Nav
