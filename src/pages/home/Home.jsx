import { useFetch } from '../../hooks/useFetch'
import './home.css'

import RecipeList from '../../components/RecipeList'

export default function Home() {
    const {
        isPending,
        error,
        data: recipes,
    } = useFetch('http://localhost:8000/recipes')

    return (
        <div>
            {isPending && <p>Loading...</p>}
            {error && <p className="error">{error.message}</p>}
            <RecipeList recipes={recipes} />
        </div>
    )
}
