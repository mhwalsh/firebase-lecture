//-- Initialize Firebase --
var config = {
  apiKey: "XXXX",
  authDomain: "prime-fun-3d63b.firebaseapp.com",
  databaseURL: "https://prime-fun-3d63b.firebaseio.com",
  storageBucket: "prime-fun-3d63b.appspot.com",
};
firebase.initializeApp(config);

function updateState() {
    var header = document.getElementById('header');
    var dbRef = firebase.database().ref().child('header');
    dbRef.on('value', function(snap) {
        header.innerText = snap.val();
    });
}

//-- Authentication Logic --
var emailText = document.getElementById('emailText');
var passwordText = document.getElementById('passwordText');
var loginButton = document.getElementById('loginButton');
var signUpButton = document.getElementById('signUpButton');
var signOutButton = document.getElementById('signOutButton');

loginButton.addEventListener('click', function(e) {
  console.log('in login function');
  var email = emailText.value;
  var password = passwordText.value;
  var auth = firebase.auth();

  var promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(function(e) {
    console.log('error in login');
    console.log(e);
  });
});

//-- Sign Up Logic --
signUpButton.addEventListener('click', function(e) {
  var email = emailText.value;
  var password = passwordText.value;
  var auth = firebase.auth();

  var promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(function(e) {
    console.log(e);
  });
});

// --  on auth state state change --
firebase.auth().onAuthStateChanged(function(firebaseUser) {
  if(firebaseUser){
    updateState();
    console.log('Your firebaseUser = ',firebaseUser);
  }else{
    console.log('Not logged in');
  }
});
