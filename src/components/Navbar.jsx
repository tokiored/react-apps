import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'
import { useAuthContext } from 'hooks/useAuthContext'
import { useLogout } from 'hooks/useLogout'

export default function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>
                    <Link className={styles.title} to="/">
                        Tokiogreen
                    </Link>
                </li>

                {!user && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link className="btn" to="/signup">
                                Signup
                            </Link>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>Hello, {user.email}</li>
                        <li>
                            <Link
                                className="btn"
                                to="/login"
                                onClick={() => logout()}
                            >
                                Logout
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
