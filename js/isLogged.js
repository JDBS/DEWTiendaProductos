var config = {
    apiKey: "AIzaSyB65JCI354B-wD5TjaDDscMWqrYl_NHLPg",
    authDomain: "ebest-38a9f.firebaseapp.com",
    databaseURL: "https://ebest-38a9f.firebaseio.com",
    projectId: "ebest-38a9f",
    storageBucket: "",
    messagingSenderId: "552646215125"
};
firebase.initializeApp(config);
    var user = firebase.auth().currentUser;

    if (user != null) {
        user.providerData.forEach(function (profile) {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        });
    }