import { useState } from 'react'

import styles from './Signup.module.css'
import { useSignup } from 'hooks/useSignup'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, isPending, error } = useSignup()

    // Handle Firebase auth with error codes
    const handleSubmit = async (e) => {
        e.preventDefault()
        signup(email, password, name)
    }

    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
            <h2>Sign Up</h2>
            <label>
                <span>Name</span>
                <input
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>
            <label>
                <span>email</span>
                <input
                    name="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password</span>
                <input
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {isPending && <button disabled>Loading...</button>}
            {!isPending && <button>Signup</button>}
            {error && <p>{error}</p>}
        </form>
    )
}
