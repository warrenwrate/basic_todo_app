import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import { withRouter } from 'react-router' //allows updates when rendering new routes
import '../../bootstrap.css'
import AuthenticationService from './AuthenticationService';

class Header extends Component{
    
    render(){
        const logged = AuthenticationService.isUserLoggedIn();
        console.log(logged);
           
        return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div><a href="https://google.com" className="navbar-brand">Sample Todo Application</a></div>
                <ul className="navbar-nav">
                    {logged && <li ><Link className="nav-link" to="/welcome/warrenwrate">Home</Link></li>}
                    {logged && <li ><Link className="nav-link" to="/todolist">Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {!logged && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {logged && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logginOut}>Logout</Link></li>}
                </ul>
            </nav>
        </header>)
    }
}

export default withRouter(Header);  //allows updates when rendering new routes.