
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import NavigationBar from "./NavigationBar";
import App from '../App'
import { About as AboutPage } from '../pages/About'
import { Contact as ContactPage } from '../pages/Contact'

export const Root = () => {
    return (
        <Router>
            <>
            <NavigationBar />
            <div className="main-app">
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/about" component={AboutPage}/>
                    <Route path="/contact" component={ContactPage}/>
                    
                    <Route path="*">
                        <Redirect to="/"/>
                    </Route>
                </Switch>
            </div>
            </>
        </Router>
    )
}