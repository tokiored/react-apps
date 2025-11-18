import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom/cjs/react-router-dom'

// styles
import './App.css'

// components

import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import ThemeSelecter from './components/ThemeSelector'
import { useTheme } from './hooks/useTheme'

function App() {
    const { mode } = useTheme()
    return (
        <div className={`App ${mode}`}>
            <BrowserRouter>
                <Navbar />
                <ThemeSelecter />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/create">
                        <Create />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/recipe/:id">
                        <Recipe />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default App
