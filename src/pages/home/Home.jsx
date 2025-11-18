import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'

import './home.css'

import { db } from '../../firebase/firebase'
import RecipeList from '../../components/RecipeList'

export default function Home() {
    const [recipes, setRecipes] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsPending(true)
        const reference = collection(db, 'recipes')

        // `onSnapshot` realtime firestore listener
        const unsubscribe = onSnapshot(
            reference,
            (snapshot) => {
                if (snapshot.empty) {
                    setError('No recipes found...')
                    setRecipes([])
                } else {
                    const list = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setRecipes(list)
                }
                setIsPending(false)
            },
            (error) => {
                console.log(error)
                setIsPending(false)
                setError(error.message)
            }
        )

        return () => unsubscribe()
    }, [])

    return (
        <div>
            {isPending && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            <RecipeList recipes={recipes} />
        </div>
    )
}
