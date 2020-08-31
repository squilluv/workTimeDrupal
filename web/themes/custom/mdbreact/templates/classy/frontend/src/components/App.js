import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import { Provider } from 'react-redux'

import PrivateRoute from '../components/common/PrivateRoute'

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Test from './layout/Test'
import Login from './layout/Login'
import Alerts from "./common/Alerts"

import store from '../store'
import { loadUser } from '../actions/auth'


const alertOption = {
    timeout: 3000,
    position: "bottom center"
}

class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {

        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOption}>
                    <Router>
                        <Fragment>
                            <Alerts />
                            <PrivateRoute path="/" component={Test} />
                            <Switch>
                                <Route path="/login" component={Login} />
                            </Switch>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));