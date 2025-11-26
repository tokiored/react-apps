import { useEffect, useState, useRef } from 'react'

import {
    collection,
    onSnapshot,
    query,
    where,
    orderBy,
} from 'firebase/firestore'
import { db } from '../firebase/config'

export const useCollection = (resource, _query, _order) => {
    const [documents, setDocuments] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)

    /**
     * handle the useEffect infinite loop issue
     * when using a referenced paramater (array) as a dependency
     */
    const q = useRef(_query).current
    const order = useRef(_order).current

    console.log('order', order)

    useEffect(() => {
        setIsPending(true)

        let ref = collection(db, resource)

        if (q) ref = query(ref, where(...q))
        if (order) ref = query(ref, orderBy(...order))

        const unsub = onSnapshot(
            ref,
            (snapshot) => {
                if (snapshot.empty) {
                    console.log('No documents found in this collection')
                    if (!isCancelled) setDocuments(null)
                } else {
                    let res = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                    if (!isCancelled) setDocuments(res)
                }
            },
            (error) => {
                if (!isCancelled) {
                    setError(error.message)
                    setIsPending(false)
                }
            }
        )

        /**
         *  clean up
         * - unsubscribe from firestore
         * - set isCancelled flag to handle unmounted component state update error
         */
        return () => {
            unsub(true)
            setIsCancelled(true)
        }
    }, [resource, q])

    return { documents, isPending, error }
}
