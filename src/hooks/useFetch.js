import { useState, useEffect } from 'react'

export function useFetch(url, method = 'GET') {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(null)

    // POST/ DELETE/ UPDATE -> manaual changes
    const post = (body) => {
        setOptions({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
    }

    // GET requests -> auto reload on URL change
    useEffect(() => {
        const controller = new AbortController()

        const doFetch = async (opts) => {
            setIsPending(true)
            try {
                const res = await fetch(url, {
                    ...opts,
                    signal: controller.signal,
                })

                if (!res.ok) throw new Error(res.statusText)
                const json = await res.json()

                setData(json)
                setIsPending(false)
                setError(null)
            } catch (error) {
                setIsPending(false)
                setError(error.message)
            }
        }

        if (method === 'GET') doFetch()
        if (method === 'POST' && options) doFetch(options)

        return () => controller.abort()
    }, [url, method, options])

    return { isPending, error, post, data }
}
