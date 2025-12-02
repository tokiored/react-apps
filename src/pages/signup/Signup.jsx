import { useEffect, useState } from 'react'
import './Signup.css'
import { useSignup } from 'hooks/useSignup'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const { signup, isPending, error } = useSignup()

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(email, password, displayName, thumbnail)

        if (!thumbnail) {
            setThumbnailError('Project thumbnail is required')
            return
        }
        await signup(email, password, displayName, thumbnail)
    }

    function handleFile(e) {
        e.preventDefault()

        setThumbnailError(null)
        setThumbnail(null)

        const selected = e.target.files[0]

        if (!selected) {
            setThumbnailError('Project thumbnail is required')
            return
        }

        if (!selected.type.includes('image')) {
            setThumbnailError('File my be an image')
            return
        }
        if (selected.size > 20000) {
            setThumbnailError('File must be less than 200KB')
            return
        }

        setThumbnail(selected)
    }
    return (
        <div>
            <form
                className="auth-form"
                action=""
                onSubmitCapture={handleSubmit}
            >
                <h2>Sign Up</h2>
                <label>
                    Email
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    Password
                    <input
                        required
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                <label>
                    Display Name
                    <input
                        required
                        type="text"
                        name="displayName"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                    />
                </label>

                <label>
                    Project Thumbnail
                    <input
                        required
                        type="file"
                        name="thumbnail"
                        onChange={handleFile}
                    />
                </label>
                {!isPending && (
                    <button type="submit" className="btn">
                        Sign up
                    </button>
                )}
                {isPending && (
                    <button disabled type="submit" className="btn">
                        Loading
                    </button>
                )}

                {thumbnailError && <p className="error">{thumbnailError}</p>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}
