import { useState, useEffect, useRef } from 'react'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'

import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

/**
 * Firestore storage service was removed from the `spark` free tier'.
 * Ignore storage service as default
 */
const storage = null
/*
 * uncomment import when using the `pay-per-use` tier
 */
// import storage from '../firebase/config'

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

    const signup = async (email, password, displayName, thumbnail) => {
        try {
            setIsPending(true)
            setError(null)

            // register the user
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            /**
             * Firestore storage service was removed from the `spark` free tier
             */
            let photoURL = null
            if (storage) {
                const uploadPath = `uploads/${user.uid}/${thumbnail.name}`
                const fileRef = ref(storage, uploadPath)
                const uploadFile = await uploadBytes(fileRef, thumbnail)
                const photoURL = await getDownloadURL(uploadFile)

                const profile = await updateProfile(user, {
                    displayName,
                    photoURL,
                })
            } else {
                console.info(
                    'Ignoring thumbnail upload. Firestore storage service not setup.'
                )
            }

            // upload to new user profile without thumbnail
            const profile = await updateProfile(user, { displayName, photoURL })

            // create a user document to store common user information
            const docRef = await doc(db, 'users', user.uid)
            await setDoc(docRef, {
                displayName,
                online: true,
                updated_at: serverTimestamp(),
            })

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
