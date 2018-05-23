$(document).ready(function () {
//hide the send message button until username is entered
$("#submitMessage").hide();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCvl1YlUHqhBaY3MMm5TvZfBrSEifAJTqs",
    authDomain: "chatdatabase-13852.firebaseapp.com",
    databaseURL: "https://chatdatabase-13852.firebaseio.com",
    projectId: "chatdatabase-13852",
    storageBucket: "chatdatabase-13852.appspot.com",
    messagingSenderId: "103442999082"
};

var app = firebase.initializeApp(config);
var database = firebase.database();
var firebaseRef = firebase.database().ref();
// firebaseRef.child("Opponent").set("null");
// firebaseRef.child("Player").set("null");


var messageList = $('#mList');
var presenceRef = firebase.database().ref("ConnectionMessage");
var connectedRef = firebase.database().ref(".info/connected");
var playerRef = firebase.database().ref("Player");
var opponentRef = firebase.database().ref("Opponent");
// jQuery selectors used in multiple places.
var messages = $('.messages');
var username = $('#username');
var player = {
    number: '0',
    name: '',
    wins: 0,
    losses: 0,
    turns: 0,
    choice: ''
};
var opponent = {
    number: '0',
    name: '',
    wins: 0,
    losses: 0,
    turns: 0,
    choice: ''
};


//Make sure Chat is always scrolled down to the bottom
window.setInterval(function() {
    var elem = document.getElementById('mList');
    elem.scrollTop = elem.scrollHeight;
  },10);

//Initial connection to firebase
database.ref().on('child_added', function(childsnapshot) {
    var previousText = messageList.text();
    messageList.text(`${previousText}\n${childsnapshot.val().username}: ${childsnapshot.val().message}`);
});
//Checking to see if there are any current players
if (database.player1 == undefined){
    $(".waitYourTurn").hide();
} else if(database.player2 == undefined){
    $(".waitYourTurn").hide();
} else {
    $(".waitYourTurn"). show();
}

//for the messaging app
$("#submitMessage").on('click', function(event) {
    event.preventDefault();
    $('#mList').scrollTop($('#mList')[0].scrollHeight);    
    var message = $("#message").val();
    database.ref().push({
        username: username,
        message: message
    })
});


// On-click function for submitting a name.
$('.buttonStart').on('click', function () {

        $("#submitMessage").show();
        $(".startText").hide();

        player.name = username.val();
        username = username.val();
        
        database.ref().on("value", function(snapshot) {
            Player1 = snapshot.val().Player;
            Player2 = snapshot.val().Opponent;
        });

        if (Player1 == 'null') {

            console.log("Player 1 is empty")
            firebaseRef.child("Player").set(username);


        } else if(Player2 == 'null'){

            console.log("Player 2 is empty")
            firebaseRef.child("Opponent").set(username);

        } else {
            console.log("Wait for current game to finish.")
            $(".alert").show();
        }
});


//Connection Handling for firebase
// Write a string when this client loses connection
// presenceRef.on("disconnect",function(snapshot){


//             if(username == player1){
//                 presenceRef.onDisconnect().set("I disconnected");
//                 playerRef.onDisconnect().set("null");
//             } else if(username == player2){
//                 presenceRef.onDisconnect().set("I disconnected");
//                 opponentRef.onDisconnect().set("null");
//             }

// });

// presenceRef.onDisconnect().set("I disconnected");
// opponentRef.onDisconnect().set("null");
// playerRef.onDisconnect().set("null");

var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
    
    if (snap.val() === true){
        presenceRef.set("Player Connected");
    } 

    if(username == player1){
        playerRef.set("null");
    } else if(username == player2){
        opponentRef.set("null");
    }
        

});
// end connection handling











});//end on document ready