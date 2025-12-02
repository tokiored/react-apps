import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import './App.css'
import Login from './pages/login/Login'
import Project from 'pages/project/Project'
import Signup from 'pages/signup/Signup'
import Dashboard from 'pages/dashboard/Dashboard'
import Create from 'pages/create/Create'
import Navbar from 'components/Navbar'
import Siderbar from 'components/Siderbar'
import { useAuthContext } from 'hooks/useAuthContext'
import OnlineUsers from 'components/OnlineUsers'

function App() {
    const { user, authIsReady } = useAuthContext()

    return (
        <div className="app">
            {authIsReady && (
                <BrowserRouter>
                    {user && <Siderbar />}
                    <div className="container">
                        <Navbar />
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={
                                    user ? (
                                        <Dashboard />
                                    ) : (
                                        <Navigate to="login" />
                                    )
                                }
                            />
                            <Route
                                path="/create"
                                element={
                                    user ? <Create /> : <Navigate to="login" />
                                }
                            />
                            <Route
                                path="/projects/:id"
                                element={
                                    user ? <Project /> : <Navigate to="login" />
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    !user ? <Login /> : <Navigate to="/" />
                                }
                            />
                            <Route
                                path="/signup"
                                element={
                                    !user ? <Signup /> : <Navigate to="/" />
                                }
                            />
                        </Routes>
                    </div>
                    {user && <OnlineUsers />}
                </BrowserRouter>
            )}
        </div>
    )
}

export default App
