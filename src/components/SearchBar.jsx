import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './searchBar.css'

export default function SearchBar() {
    const [term, setTerm] = useState()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/search?q=${term}`)
    }

    return (
        <div className="searchbar">
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="search"></label>
                <input
                    type="text"
                    name="search"
                    onChange={(e) => setTerm(e.target.value)}
                    value={term}
                />
                {/* <button className="btn">Search</button> */}
            </form>
        </div>
    )
}
