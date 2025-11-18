import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useState } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'

import './recipieList.css'

import { db } from '../firebase/firebase'
import trashIcon from '../assets/trash.svg'

export default function RecipeList({ recipes }) {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    if (!recipes || !recipes.length)
        return <div className="error">No recipes found...</div>

    const handleDelete = async (id) => {
        try {
            setIsPending(true)
            const res = doc(db, 'recipes', id)
            const del = await deleteDoc(res)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="recipe-list">
            {recipes &&
                recipes.map((recipe) => (
                    <div className="card" key={recipe.id}>
                        <img
                            className="delete"
                            src={trashIcon}
                            alt=""
                            onClick={() => handleDelete(recipe.id)}
                        />
                        <h3>{recipe.title}</h3>
                        <p>{recipe.cookingTime}</p>
                        <div>{recipe.method.substring(0, 100)}...</div>
                        <Link to={`/recipe/${recipe.id}`}>Cook This</Link>
                    </div>
                ))}
        </div>
    )
}
