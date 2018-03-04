function loadLogin(){
    $('#google').click(loginGoogle);
    $('#facebook').click(loginFaceBook);
    $('#github').click(loginGitHub);
    $('#twitter').click(loginTwitter);
    localStorage.removeItem('userLogged');

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

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });

    function loginGoogle() {
        fireBaseLog(new firebase.auth.GoogleAuthProvider());
    }

    function loginFaceBook() {
        fireBaseLog(new firebase.auth.FacebookAuthProvider());
    }

    function loginTwitter() {
        fireBaseLog(new firebase.auth.TwitterAuthProvider());
    }

    function loginGitHub() {
        fireBaseLog(new firebase.auth.GithubAuthProvider());
    }

    function fireBaseLog(provider) {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var user = result.additionalUserInfo.profile.name;
            console.log(result);
            save(user, "userLogged");
            window.location.href = "index.html";
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
}