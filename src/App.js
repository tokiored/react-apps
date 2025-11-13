import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Components/Nav'
import Home from './Components/Home'
import Create from './Components/Create'
import Blog from './Components/Blog'
import NotFound from './Components/NotFound'

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/create" component={Create} />
                        <Route path="/blog-details/:id" component={Blog} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App
