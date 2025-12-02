import { useState, useEffect, useRef } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'

import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

function handleError(error) {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'This email is already registered.'
        case 'auth/invalid-email':
            return 'Invalid email address.'
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.'
        default:
            return error.message
    }
}

export const useLogin = () => {
    const isCancelled = useRef(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        try {
            setIsPending(true)
            setError(null)

            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            // update online state for user
            const usersRef = doc(db, 'users', user.uid)
            const updateUser = await updateDoc(usersRef, {
                online: true,
                updated_at: serverTimestamp(),
            })
            console.log('online', updateUser)

            dispatch({ type: 'LOGIN', payload: user })
            return { user: user.email }
        } catch (error) {
            console.log('isCancelled', isCancelled)
            if (!isCancelled.current) {
                setError(handleError(error))
            } else console.log('aborted')
        } finally {
            if (!isCancelled.current) setIsPending(false)
        }
    }

    // clean up function to disable any state update
    // React 18 Strict Mode double-invokes effects in dev to catch side-effect bugs
    useEffect(() => {
        isCancelled.current = false // reset on mount
        return () => (isCancelled.current = true)
    }, [])

    return { login, isPending, error }
}
