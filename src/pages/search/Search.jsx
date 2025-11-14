import { useLocation } from 'react-router-dom'

import './search.css'

import RecipeList from '../../components/RecipeList'
import { useFetch } from '../../hooks/useFetch'

export default function Search() {
    const queryString = useLocation()
    const queryParms = new URLSearchParams(queryString.search)
    const query = queryParms.get('q')

    const {
        error,
        isPending,
        data: recipes,
    } = useFetch(`http://localhost:8000/recipes?q=${query}`)

    return (
        <div className="search">
            <h1 className="page-title">
                Searching recipes that include:{' '}
                <span className="muted">{query}</span>
            </h1>
            {isPending && <p>Loading...</p>}
            {error && <p className="error">{error.message}</p>}
            <RecipeList recipes={recipes} />
        </div>
    )
}
