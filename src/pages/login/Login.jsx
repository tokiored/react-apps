import { useState } from 'react'

import './Login.css'
import { useLogin } from 'hooks/useLogin'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const { isPending, error, login } = useLogin()

    async function handleSubmit(e) {
        e.preventDefault()
        await login(email, password)
    }
    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login">
                <label>
                    Email
                    <input
                        required
                        type="email"
                        vale={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password
                    <input
                        required
                        type="password"
                        vale={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {isPending && (
                    <button disabled className="btn">
                        Logging in
                    </button>
                )}
                {!isPending && (
                    <button className="btn" type="submit">
                        Login
                    </button>
                )}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}
