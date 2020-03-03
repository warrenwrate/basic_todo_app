import axios from 'axios';

class TodoDataService {

    retrieveAllTodos(username){
        return axios.get(`http://localhost:8080/todos`)
    }

    saveNewTodo(todo){
        console.log(todo);
        return axios.post("http://localhost:8080/users/{username}/newTodo", todo)
    }

}

export default new TodoDataService();