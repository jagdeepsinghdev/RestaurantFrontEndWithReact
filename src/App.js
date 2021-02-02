import './App.css'

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

import MenuItems from './Containers/MenuItems/MenuItems'
import CreateMenuItem from './Component/MenuItem/CreateMenuItem'
import Header from './Containers/Header/Header'
import Cart from './Containers/Cart/Cart'
import Login from './Containers/Login/Login'
import Checkout from './Containers/Checkout/checkout'

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route path="/MenuItems" exact component={MenuItems} />
                    <Route path="/Login" component={Login} />
                    <Route
                        path="/CreateMenuItem"
                        exact
                        component={CreateMenuItem}
                    />
                    <Route path="/Cart" exact component={Cart} />
                    <Route path="/Checkout" exact component={Checkout} />
                    <Redirect exact from="/" to="Login" />
                </Switch>
            </Router>
        </div>
    )
}

export default App
