$(document).ready(function () {
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCvl1YlUHqhBaY3MMm5TvZfBrSEifAJTqs",
    authDomain: "chatdatabase-13852.firebaseapp.com",
    databaseURL: "https://chatdatabase-13852.firebaseio.com",
    projectId: "chatdatabase-13852",
    storageBucket: "chatdatabase-13852.appspot.com",
    messagingSenderId: "103442999082"
};

firebase.initializeApp(config);
var database = firebase.database();

// Set all variables that will be used
var p1Username;

var con;
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
var waiting = false;



//Make sure Chat is always scrolled down to the bottom
window.setInterval(function() {
    var elem = document.getElementById('mList');
    elem.scrollTop = elem.scrollHeight;
  },10);

var messageList = $('#mList');



database.ref().on('value', function(snapshot) {
    // console.log(snapshot.val());
    // messageList.text(`${snapshot.val().username}: ${snapshot.val().message}`);
});

database.ref().on('child_added', function(childsnapshot) {
    var previousText = messageList.text();
    messageList.text(`${previousText}\n${childsnapshot.val().username}: ${childsnapshot.val().message}`);
});










$("#submitMessage").on('click', function(event) {
    event.preventDefault();

    $('#mList').scrollTop($('#mList')[0].scrollHeight);    

    var username = p1Username;
    var message = $("#message").val();

    console.log(username);
    console.log(message);

    database.ref().push({
        username: p1Username,
        message: message
    })
});


$(".buttonStart").on('click', function(event) {

    p1Username = $("#username").val();
    console.log(p1Username);
    $(".startText").hide();

});

























});