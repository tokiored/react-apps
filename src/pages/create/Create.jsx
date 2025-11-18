import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { collection, addDoc } from 'firebase/firestore/lite'
import { db } from '../../firebase/firebase'

import './create.css'

export default function Create() {
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [method, setMethod] = useState('')

    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const [ingredient, setIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientInput = useRef()

    // handle the form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsPending(true)
            const doc = {
                title,
                ingredients,
                method,
                cookingTime: cookingTime + ' minutes',
            }
            const res = collection(db, 'recipes')
            await addDoc(res, doc)
            history.push('/')
        } catch (error) {
            setError(error.message)
        } finally {
            setIsPending(false)
        }
    }

    // add ingredient to ingredients
    const addIngredient = (e) => {
        e.preventDefault()

        const ing = ingredient.trim()
        if (ing && !ingredients.includes(ing)) {
            setIngredients((prevIngredients) => [...prevIngredients, ing])
            setIngredient('')
            ingredientInput.current.focus()
        }
    }

    return (
        <div className="create">
            <h1>Create a new Recipe</h1>
            <form action="" onSubmit={handleSubmit}>
                <label>
                    <span>Title</span>
                    <input
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>
                <label>
                    <span>Ingredients</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            name="ingredient"
                            onChange={(e) => setIngredient(e.target.value)}
                            value={ingredient}
                            ref={ingredientInput}
                        />
                        <button onClick={addIngredient} className="btn small">
                            Add
                        </button>
                    </div>
                </label>
                <p>
                    Current Ingredients:
                    {ingredients.map((item) => (
                        <em key="item">{item}</em>
                    ))}
                </p>

                <label>
                    <span>Method</span>
                    <textarea
                        name="method"
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>
                <label>
                    <span>Cooling Time - in munutes</span>
                    <input
                        type="number"
                        name="cookingTime"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>
                <button disabled={isPending} className="btn">
                    {isPending && 'Submiting...'}
                    {!isPending && 'Submit'}
                </button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    )
}
