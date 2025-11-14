import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './recipieList.css'

export default function RecipeList({ recipes }) {
    if (!recipes || !recipes.length)
        return <div className="recipe-list">No recipes found...</div>

    return (
        <div className="recipe-list">
            {recipes &&
                recipes.map((recipe) => (
                    <div className="card" key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.cookingTime}</p>
                        <div>{recipe.method.substring(0, 100)}...</div>
                        <Link to={`/recipe/${recipe.id}`}>Cook This</Link>
                    </div>
                ))}
        </div>
    )
}
