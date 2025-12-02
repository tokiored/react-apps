import { useEffect, useState, useRef } from 'react'

import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useDocument = (resource, id) => {
    const isCancelled = useRef(false)
    const [error, setError] = useState(null)
    const [document, setDocument] = useState(null)

    useEffect(() => {
        // React 18 Strict Mode double-invokes effects in dev to catch side-effect bugs - set isCancelled
        isCancelled.current = false

        const ref = doc(db, resource, id)
        const unsub = onSnapshot(
            ref,
            (snapshot) => {
                if (snapshot.exists()) {
                    setDocument({ ...snapshot.data(), id: snapshot.id })
                    setError(null)
                } else {
                    setError('Document does not exist')
                }
            },
            (error) => {
                if (!isCancelled.current) {
                    setError(error.message)
                }
            }
        )

        // clean up function to disable any state update
        return () => {
            isCancelled.current = true
            unsub()
        }
    }, [resource, id])

    return { document, error }
}
