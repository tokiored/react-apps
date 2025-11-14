import { useParams } from 'react-router-dom'

import { useFetch } from '../../hooks/useFetch'

import './recipe.css'

export default function Recipe() {
    const params = useParams()
    const {
        isPending,
        error,
        data: recipe,
    } = useFetch('http://localhost:8000/recipes/' + params.id)

    return (
        <div>
            {isPending && <p className="loading">Loading...</p>}
            {error && <p className="error">{error.message}</p>}
            {recipe && (
                <div className="recipe">
                    <h2 className="page-title">{recipe.title}</h2>
                    <p>Cooling Time: {recipe.cookingTime}</p>
                    <ul>
                        {recipe.ingredients.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    <p className="method">{recipe.method}</p>
                </div>
            )}
        </div>
    )
}
