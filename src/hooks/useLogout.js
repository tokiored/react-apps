import { useEffect, useRef, useState } from 'react'
import { signOut } from 'firebase/auth'

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

export const useLogout = () => {
    const isCancelled = useRef(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const logout = async (email, password) => {
        try {
            setIsPending(true)
            setError(null)

            await signOut(auth)
            dispatch({ type: 'LOGOUT' })
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
    return { logout, isPending, error }
}
