import { useReducer, useRef, useEffect } from 'react'
import { db } from '../firebase/config'

import {
    addDoc,
    getDoc,
    deleteDoc,
    collection,
    serverTimestamp,
} from 'firebase/firestore'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
}

function firestoreReducer(state, action) {
    switch (action.type) {
        case 'IS_PENDING':
            return {
                document: null,
                isPending: action.payload,
                error: null,
                success: null,
            }
        case 'ERROR':
            return {
                isPending: false,
                error: action.payload,
                success: true,
                document: null,
            }
        case 'ADD_DOCUMENT':
            return {
                isPending: false,
                error: null,
                success: true,
                document: action.payload,
            }
        case 'DELETE_DOCUMENT':
            return {
                document: action.payload,
                isPending: false,
                error: null,
                success: true,
            }
        default:
            break
    }
}

export const useFirestore = () => {
    const isCancelled = useRef(false)
    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    // console.log('response', response)

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled.current) {
            dispatch(action)
        } else console.log('Fetch was aborted...')
    }

    // collection reference
    const ref = collection(db, 'transactions')

    // add document
    const addDocument = async (doc) => {
        try {
            dispatch({ type: 'IS_PENDING', payload: true })
            dispatch({ type: 'ERROR', payload: null })

            const docRef = await addDoc(ref, {
                ...doc,
                created_at: serverTimestamp(),
            })

            // fetch the document using the returned reference
            const snapshot = await getDoc(docRef)
            if (!snapshot.exists()) {
                throw new Error('Document does not exist!')
            }

            // update the state
            dispatchIfNotCancelled({
                type: 'ADD_DOCUMENT',
                payload: { id: snapshot.id, ...snapshot.data() },
            })
        } catch (error) {
            dispatchIfNotCancelled({
                type: 'ERROR',
                payload: error.message,
            })
        } finally {
            dispatch({ type: 'IS_PENDING', payload: false })
        }
    }

    // delete document
    const deleteDocument = async (doc) => {
        try {
            dispatch({ type: 'IS_PENDING', payload: true })
            dispatch({ type: 'ERROR', payload: null })

            const docRef = await deleteDoc(ref, doc)

            // update the state
            dispatchIfNotCancelled({
                type: 'DELETE_DOCUMENT',
                payload: docRef.id,
            })
        } catch (error) {
            dispatchIfNotCancelled({
                type: 'ERROR',
                payload: error.message,
            })
        } finally {
            dispatch({ type: 'IS_PENDING', payload: false })
        }
    }

    useEffect(() => {
        isCancelled.current = false
        return () => (isCancelled.current = true)
    }, [])

    return { addDocument, deleteDocument, response }
}
