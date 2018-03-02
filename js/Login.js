$(document).ready(() => {
    $('#google').click(loginGoogle);
    $('#facebook').click(loginFaceBook);
    $('#github').click(loginGitHub);
    $('#twitter').click(loginTwitter);
    // document.getElementById('logOut').addEventListener('click', logOut, false);

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB65JCI354B-wD5TjaDDscMWqrYl_NHLPg",
        authDomain: "ebest-38a9f.firebaseapp.com",
        databaseURL: "https://ebest-38a9f.firebaseio.com",
        projectId: "ebest-38a9f",
        storageBucket: "",
        messagingSenderId: "552646215125"
    };
    firebase.initializeApp(config);
    localStorage.removeItem('userLogged');
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log('Se ha logueado correctamente');
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });

    function loginGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();
        fireBaseLog(provider);
    }

    function loginFaceBook() {
        let provider = new firebase.auth.FacebookAuthProvider();
        fireBaseLog(provider);
    }

    function loginTwitter() {
        let provider = new firebase.auth.TwitterAuthProvider();
        fireBaseLog(provider);        
    }

    function loginGitHub() {
        let provider = new firebase.auth.GithubAuthProvider();
        fireBaseLog(provider);
    }

    function fireBaseLog(provider) {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var user = result.additionalUserInfo.username;
            console.log(result);
            localStorage.setItem("userLogged", user);
            window.location.href = "index.html";
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    function logOut() {
        localStorage.removeItem("userLogged");
        window.location.href = "login.html";
    }
});
