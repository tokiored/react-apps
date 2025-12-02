import { useReducer, useRef, useEffect } from 'react'
import { db } from '../firebase/config'

import {
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
    serverTimestamp,
    arrayUnion,
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
                type: action.type,
                document: null,
                isPending: true,
                error: null,
                success: null,
            }
        case 'ERROR':
            return {
                type: action.type,
                isPending: false,
                error: action.payload,
                success: false,
                document: null,
            }
        case 'ADD_DOCUMENT':
            return {
                type: action.type,
                isPending: false,
                error: null,
                success: true,
                document: action.payload,
            }
        case 'UPDATE_DOCUMENT':
            return {
                type: action.type,
                isPending: false,
                error: null,
                success: true,
                document: action.payload,
            }
        case 'DELETE_DOCUMENT':
            return {
                type: action.type,
                document: null,
                isPending: false,
                error: null,
                success: true,
            }
        default:
            break
    }
}

export const useFirestore = (resource) => {
    const isCancelled = useRef(false)
    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled.current) {
            dispatch(action)
        } else console.log('Fetch was aborted...')
    }

    // local/client side collection reference
    const ref = collection(db, resource)

    // add document
    const addDocument = async (data) => {
        try {
            dispatch({ type: 'IS_PENDING' })

            const post = await addDoc(ref, {
                ...data,
                created_at: serverTimestamp(),
            })
            dispatchIfNotCancelled({
                type: 'ADD_DOCUMENT',
                payload: post,
            })
        } catch (error) {
            dispatchIfNotCancelled({
                type: 'ERROR',
                payload: error.message,
            })
        }
    }
    // delete document
    const deleteDocument = async (id) => {
        try {
            dispatch({ type: 'IS_PENDING' })

            const docRef = doc(db, resource, id)
            const del = await deleteDoc(docRef)

            // update the state
            dispatchIfNotCancelled({
                type: 'DELETE_DOCUMENT',
            })
        } catch (error) {
            dispatchIfNotCancelled({
                type: 'ERROR',
                payload: error.message,
            })
        }
    }
    // add document
    // append a array item to a document array - safely use timestamp
    const updateDocument = async (id, updates, documentArray) => {
        try {
            dispatch({ type: 'IS_PENDING' })

            let put = null
            const docRef = doc(db, resource, id)

            if (documentArray) {
                put = await updateDoc(docRef, {
                    [documentArray]: arrayUnion(updates),
                })
            } else {
                // Regular update
                put = updateDoc(docRef, {
                    ...updates,
                })
            }

            dispatchIfNotCancelled({
                type: 'UPDATE_DOCUMENT',
                payload: put,
            })
        } catch (error) {
            dispatchIfNotCancelled({
                type: 'ERROR',
                payload: error.message,
            })
        }
    }

    useEffect(() => {
        isCancelled.current = false
        return () => (isCancelled.current = true)
    }, [])

    return { addDocument, updateDocument, deleteDocument, response }
}
