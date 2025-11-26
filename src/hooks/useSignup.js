import { useState, useEffect, useRef } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

import { auth } from '../firebase/config'
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

export const useSignup = () => {
    const isCancelled = useRef(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        try {
            setIsPending(true)
            setError(null)

            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            await updateProfile(user, { displayName })
            dispatch({ type: 'SIGNUP', payload: user })
        } catch (error) {
            if (!isCancelled.current) setError(handleError(error))
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

    return { signup, isPending, error }
}
