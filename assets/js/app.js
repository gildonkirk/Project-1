// Global Variables
// I made any internally declared variables global so that I could reuse them for other functions.  

var map, infoWindow, pos, marker, point, date, time, user;

// Initializes map - AKA - starts and displays the map on our web-page.
      
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  });

  infoWindow = new google.maps.InfoWindow;

// Geolocates the user, if they allow them to!

if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(function(position) {
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

        // Allows the marker to be movable and sets the marker to be displayed at the user's position.   

    marker = new google.maps.Marker({
      position: pos,
      map: map,
      draggable:true,
      title:"Drag me!"
    })

        // Visually displays the marker at the user's location.

    infoWindow.set(marker);
    infoWindow.open(map);
    map.setCenter(pos);
    
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });

} else {
    // Calls the function that handles a user that doesn't use geolocation.  We will need to modify this to display a way for them to input location information.
  handleLocationError(false, infoWindow, map.getCenter());
}

// Initialize Firebase
    var config = {
        apiKey: "AIzaSyCpRAXgZfRwym9rBEfn_RmA2kpfStrIAXo",
        authDomain: "project-1-88de6.firebaseapp.com",
        databaseURL: "https://project-1-88de6.firebaseio.com",
        projectId: "project-1-88de6",
        storageBucket: "project-1-88de6.appspot.com",
        messagingSenderId: "408567007214"
    };

    firebase.initializeApp(config);

// Create a variable to reference the database.
    var database = firebase.database();

//clicking on save updates the lat and long on html and table.

$("#save").on("click", function(event) {
          
  point = marker.getPosition();
  date = moment().format("MM/DD/YY");
  time = moment().format("hh:mm:ss");
  user = "";

  document.getElementById("latitude").value = point.lat();
  document.getElementById("longitude").value = point.lng();

  updateTable();

  // grabUserLocationDataAndHoldData();

    event.preventDefault();

    // Grabs User's Da
    // Creates local "temporary" object for holding User's data
    var newLocationData = {
        date: date,
        time: time,
        lat: point.lat(),
        lng: point.lng(),
        user: user
    };

    // Uploads employee data to the database
    database.ref().push(newLocationData);

    // Logs everything to console
    console.log(date);
    console.log(time);
    console.log(point.lat());
    console.log(point.long());

    // Alert
    alert("Trash location successfully added!");

  })
}

// Geolocation not accepted my user - function.

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// Update table with date, time, location information.

function updateTable() {
  $("#trashTable").append("<tr><td id='date'>" + date + "</td><td id='time'>" + time + "</td><td id='point'>" +
  point + "</td><td id='user'>" + user + "</td></td>");

  // ES: Updated function so id attribute was appended to each item
}

// function grabUserLocationDataAndHoldData() {
//
//     event.preventDefault();
//
//     // Grabs User's Data
//     var getDateForDB = $("#date").val().trim();
//     var getTimeForDB = $("#time").val().trim();
//     var getPointForDB = $("#point").val().trim();
//     var getUserForDB = $("#user").val().trim();
//
//     // Creates local "temporary" object for holding User's data
//     var newLocationData = {
//         date: getDateForDB,
//         time: getTimeForDB,
//         point: getPointForDB,
//         user: getUserForDB
//     };
//
//     // Uploads employee data to the database
//     database.ref().push(newLocationData);
//
//     // Logs everything to console
//     console.log(newLocationData.date);
//     console.log(newLocationData.time);
//     console.log(newLocationData.point);
//     console.log(newLocationData.user);
//
//     // Alert
//     alert("Trash location successfully added!");
// }

// // Firebase watcher + initial loader HINT: .on("value")
// database.ref().on("value", function(snapshot) {
//
//     // Log everything that's coming out of snapshot
//     console.log(snapshot.val());
//     console.log(snapshot.val().date);
//     console.log(snapshot.val().time);
//     console.log(snapshot.val().point);
//     console.log(snapshot.val().user);
//
//     // Change the HTML to reflect
//     $("#date").html(snapshot.val().date);
//     $("#time").html(snapshot.val().time);
//     $("#point").html(snapshot.val().point);
//     $("#user").html(snapshot.val().user);
//
//     // Handle the errors
// }, function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });