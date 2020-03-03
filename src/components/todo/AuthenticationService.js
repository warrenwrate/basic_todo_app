class AuthenticationService {

    registerSuccessfulLogin(username, password){
        // sessionStorage is a javascript object
        // setting key: authenticated with value: username
        sessionStorage.setItem('authenticated', username);
    }

    logginOut(){
        sessionStorage.removeItem('authenticated');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticated')
        if (user===null){
            return false
        }
        return true
    }

}

export default new AuthenticationService();