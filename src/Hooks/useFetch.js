import { useState, useEffect } from 'react'

function useFetch(url) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const abortCtrl = new AbortController()
        setTimeout(() => {
            fetch(url, { signal: abortCtrl.signal })
                .then((res) => {
                    if (!res.ok) throw Error('Fetch failed to load resource')
                    return res.json()
                })
                .then((data) => {
                    setError(null)
                    setIsLoading(false)
                    setData(data)
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted...')
                    } else {
                        setData(null)
                        setIsLoading(false)
                        setError(err.message)
                    }
                })
        }, 1000)

        // clean up when component unmounted
        return () => abortCtrl.abort()
    }, [url])

    return { data, isLoading, error }
}

export default useFetch
