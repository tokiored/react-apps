import { Link } from 'react-router-dom/cjs/react-router-dom'

import './navbar.css'
import { useTheme } from '../hooks/useTheme'
import SearchBar from './SearchBar'

export default function Navbar() {
    const { color } = useTheme()

    return (
        <div className="navbar" style={{ background: color }}>
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
