import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Login.module.css'
import { useLogin } from 'hooks/useLogin'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isPending, error } = useLogin()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await login(email, password)
        if (res) navigate('/')
    }

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <h2>Login</h2>
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
            {isPending && (
                <button className="btn" disabled>
                    Logging in...
                </button>
            )}
            {!isPending && <button className="btn">Login</button>}
            {error && <p>{error}</p>}
        </form>
    )
}
