import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom/cjs/react-router-dom'

// components
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
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
    )
}
export default App
