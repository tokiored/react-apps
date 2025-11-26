import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

import Home from 'pages/Home/Home'
import Signup from 'pages/Signup/Signup'
import Login from 'pages/Login/Login'
import NotFound from 'pages/404/Notfound'
import Navbar from 'components/Navbar'
import { useAuthContext } from 'hooks/useAuthContext'

function App() {
    const { user, authIsReady } = useAuthContext()
    return (
        <div className="App">
            {authIsReady && (
                <BrowserRouter>
                    <Navbar></Navbar>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={!user ? <Navigate to="login" /> : <Home />}
                        ></Route>
                        <Route
                            path="/login"
                            element={user ? <Navigate to="/" /> : <Login />}
                        ></Route>
                        <Route
                            path="/signup"
                            element={user ? <Navigate to="/" /> : <Signup />}
                        ></Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    )
}

export default App
