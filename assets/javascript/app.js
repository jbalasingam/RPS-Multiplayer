/* 

1. Connect to our database
2. Get the default data
3. Display the message to the user

4. Capture our submit button click 
5. Add message details to database
6. Display the message to the user

*/

var messageList = $('#mList');

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

    var username = $("#username").val();
    var message = $("#message").val();

    console.log(username);
    console.log(message);

    database.ref().push({
        username: username,
        message: message
    })
});