import { Link } from 'react-router-dom/cjs/react-router-dom'

import './navbar.css'

import SearchBar from './SearchBar'

export default function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <Link className="brand" to="/">
                    <h1>Tokiobread</h1>
                </Link>
                <SearchBar />
                <Link className="create-btn" to="/create">
                    Create Recipe
                </Link>
            </nav>
        </div>
    )
}
