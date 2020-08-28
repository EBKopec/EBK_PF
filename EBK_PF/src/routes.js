import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import Main from './components/pages/main';
import Content from './components/pages/content';
import Extensions from './components/pages/reports/extensions/index';
import Billing from './components/pages/reports/billing/summarized/index';
import Login from "./components/pages/login/login.component";
import Register from "./components/pages/login/register.component";
import AuthService from "./components/services/auth.service";
import './styles.css'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>

            AuthService.getCurrentUser() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
        }
    />
);


class Routes extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }

    logOut() {
        AuthService.logout();
    }
    render() {
        const { currentUser } = this.state;
        return (

            <BrowserRouter>
                <div className="main_body">
                    <nav className="menu-bottom">
                        {currentUser ? (

                            <div className="second-banner">
                                <div className="current_user">
                                    <Link to={"/"} className="link">
                                        {currentUser.username}
                                    </Link>
                                </div>
                                <div className="logout">
                                    <a href="/login" className="logout" onClick={this.logOut}>
                                        Sair
                                    </a>
                                </div>

                            </div>
                        ) : (
                                <div className="login-register">
                                    <div className="login">
                                        <Link to={"/login"} className="login">
                                            Login
                                    </Link>
                                    </div>

                                    <div className="register">
                                        <Link to={"/register"} className="register">
                                            Registrar
                                    </Link>
                                    </div>
                                    
                                </div>
                            )}
                    </nav>
                </div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute exact path="/" component={Main} />
                    <PrivateRoute exact path="/content/:id" component={Content} />
                    <PrivateRoute exact path="/extension" component={Extensions} />
                    <PrivateRoute exact path="/billing" component={Billing} />
                    {/* <Route exact path="/billing/:id" component={Billing}/> */}
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes;