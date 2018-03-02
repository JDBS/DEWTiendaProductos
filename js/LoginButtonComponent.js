class LoginButtonComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            logged: this.isLogged(),
        };
    }
    isLogged (){
        return load("userLogged") && true;
    }
    logEvent(){
        //Ir a pagina login
        window.location.href = "login.html";
    }
    unLogEvent(){
        //desloguearse
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyB65JCI354B-wD5TjaDDscMWqrYl_NHLPg",
            authDomain: "ebest-38a9f.firebaseapp.com",
            databaseURL: "https://ebest-38a9f.firebaseio.com",
            projectId: "ebest-38a9f",
            storageBucket: "ebest-38a9f.appspot.com",
            messagingSenderId: "552646215125"
        };

        firebase.initializeApp(config);

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            this.setState({
                logged: false,
            });
            localStorage.removeItem('userLogged');            
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
       
    }    
    loggedComponent(){
        return (
            <div className={"btn btn-secondary btn-md"} onClick={this.unLogEvent.bind(this)}>
                logout
            </div>
        );
    }
    unLoggedComponent(){
        return (
            <div className={"btn btn-secondary btn-md"} onClick={this.logEvent.bind(this)}>
                login
            </div>
        );
    }
    getUser(){
        return load('userLogged');
    }
    render () {
        const logged = this.state.logged;
        return (
            <div>
                {logged && <span>{`Bienvenido ${this.getUser().substring(0,11)}... `}</span>}
                {logged && this.loggedComponent()}
                {!logged && this.unLoggedComponent()}
            </div>
        );
    }
}