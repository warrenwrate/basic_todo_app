import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import '../../bootstrap.css'
import AuthenticationService from './AuthenticationService';
import Header from './Header';
import AuthenticatedRoute from './AuthenticatedRoute';
import TodoDataService from './api/TodoDataService';


class TodoApp extends Component {
    render(){
        return(
            <div className="TodoApp">
                <Router>
                    <>
                    <Header/>
                    <Switch> {/* ensures only one component is matched at a time */}
                        <Route path="/" exact component={Login} />
                        <Route path="/login" component={Login} />
                        <AuthenticatedRoute path="/welcome/:name" component={Welcome} />
                        <AuthenticatedRoute path="/todolist" component={TodoList} />
                        <AuthenticatedRoute path="/logout" component={Logout} />
                        <AuthenticatedRoute path="/newtodo" component={NewTodo} />
                        <Route component={ErrorComponent}/> {/* default location for errors */}
                    </Switch> 
                    <Footer/>
                    </>
                </Router>
            </div>
        )
    }
}

class Welcome extends Component{
    render(){
        return(
            <div>
                <h1>Welcome</h1>
                <div className="container">
                You are now on the welcome page!!
                click on todos <Link to="/todolist">here</Link>
                </div>
            </div>
        )
    }
}


class TodoList extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos : [
                // {id: 1, task:"learn react", complete:false, dueDate: new Date()},
                // {id: 2, task:"learn spring rest", complete:false, dueDate: new Date()},
                // {id: 3, task:"learn docker", complete:false, dueDate: new Date()},
                // {id: 4, task:"learn kubernetes", complete:false, dueDate: new Date()},
                // {id: 5, task:"learn kafka", complete:false, dueDate: new Date()},
                // {id: 6, task:"learn mysql", complete:false, dueDate: new Date()},
                // {id: 7, task:"learn aws", complete:false, dueDate: new Date()}
            ]
        }
    }

    componentDidMount(){
        TodoDataService.retrieveAllTodos("warren")
        .then(response =>{
            console.log(response)
            this.setState({todos: response.data})
        })
        .catch(error =>{
            console.log("error occurred: " + error)
        } )
    }
    render(){
        return(
            <div>
                <h1>List Todos</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Tasks</th>
                                <th>Complete</th>
                                <th>Date Due</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                            <tr key={todo.id}>
                                <td>{todo.id}</td> 
                                <td>{todo.description}</td>
                                <td>{todo.complete.toString()}</td>
                                <td>{todo.dueDate.toString()}</td>
                            </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <Link className="btn btn-success" to="/newtodo">Add Todo</Link>
                </div>
            </div>
        )
    }
}

class NewTodo extends Component {
    constructor(props) {
        super(props);
        this.state = { description: '',
                       complete: false,
                       dueDate: new Date() };
      }

    mySubmitHandler = (event) => {
        event.preventDefault();

        let sendTodo = {
            id: 34,
            description: this.state.description,
            complete: this.state.complete,
            dueDate: this.state.dueDate,
            username: "warrenwrate"
        }
        TodoDataService.saveNewTodo(sendTodo)
            .then(response => { console.log(response) })
            .catch(error => { console.log("error:" + error)})
        this.props.history.push(`/todolist`)
      }

    myChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });    
    }

    checkboxClick = () =>
    {
        let opposite = !this.state.complete
        this.setState({ complete: opposite  })
    }

    render(){

        return(
            <div>
                <h1>Add a New Todo</h1>
                <div className="container">
                    <form onSubmit={this.mySubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input type="text" className="form-control" name="description" onChange={this.myChangeHandler} placeholder="Enter description" id="description"/>
                    </div>
                    <div className="form-group form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" name="complete" type="checkbox" onChange={this.checkboxClick}/> Complete
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

function ErrorComponent() {
        return(
            <div>
                Uh oh.... We hit an error.
            </div>
        )
}



class Footer extends Component{
    render(){
        return(
            <footer className="footer">
                <span className="text-muted">Mutted Test</span>
            </footer>
        )
    }
}

class Login extends Component{

    constructor(props){
        super(props)
        this.state = {
            username : 'warrenwrate',
            password : '',
            authenticated: false,
            failedAuth: false 
        }
        this.userNameChange = this.userNameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    userNameChange = (event) =>{
        this.setState(
            {
                username : event.target.value
            }
        )

    }

    passwordChange = (event) =>{
        this.setState(
            {
                password : event.target.value
            }
        )  
    }

    loginClicked = () =>{
        console.log(this.state)
        if (this.state.password === "123"){
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`) // sends you to welcome page 
            this.setState({
                authenticated : true,
                failedAuth : false
            })
        }
        else{
            this.setState({
                authenticated : false,
                failedAuth : true
            })
        }

    }

    render(){
        return(
            <div className="Login">
                <h1>Login</h1>
                <div className="container">
                <ShowLoginSuccess authenticated={this.state.authenticated}/>
                <ShowLoginFailed failedAuth={this.state.failedAuth}/>
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.userNameChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.passwordChange}/>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

class Logout extends Component{
    render(){
        return(
            <div className="container">
                <h1>Logged Out</h1>
                Please come back soon.
            </div>
        )
    }
}

function ShowLoginSuccess(props){
    if(props.authenticated){
        return <div className="alert alert-success">Login Successful</div>
    }
    return null
}

function ShowLoginFailed(props){
    if(props.failedAuth){
        return <div className="alert alert-warning">Login NOT Successful</div>
    }
    return null
}

export default TodoApp;