import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

import './recipe.css'

export default function Recipe() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsPending(true)

        const ref = doc(db, 'recipes', id)
        const unsubscribe = onSnapshot(
            ref,
            (snapshot) => {
                if (!snapshot.exists()) {
                    setError('No recipes found...')
                    setRecipe(null)
                } else {
                    setRecipe(snapshot.data())
                }
                setIsPending(false)
            },
            (error) => {
                setIsPending(false)
                setError(error.message)
            }
        )
        return () => unsubscribe()
    }, [id])

    return (
        <div>
            {isPending && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
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
