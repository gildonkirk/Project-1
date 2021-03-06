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

    // Uploads data to the database
    database.ref().push(newLocationData);

    // Logs everything to console
    console.log(date);
    console.log(time);
    console.log(point.lat());
    console.log(point.lng());

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
}


//GeoLocation not accepted my user - function. 
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
        streetAdd();
      }

      function streetAdd(){
        $('#map').after('<p id="instruct">Log Trash Site:</p>');
        $('#instruct').after('<form id="addEnter" class="form-inline"></form>');
        $('#addEnter').append('<div id="form-group1" class="form-group"></div>');
        $('#form-group1').append('<label for="street">Address</label>');
        $('#form-group1').append('<input type="text" class="form-control" id="address" placeholder="123 Street, City, State Zip">');
        $('#form-group1').append('<button type="submit" class="submitAddress btn btn-default">Enter</button>')
      }


$(document).on('click', '.submitAddress', function(e){
  e.preventDefault();
  var address = $('#address').val();
  var geocoder = new google.maps.Geocoder();

   geocoder.geocode({'address': address}, function (result) {
      var lat = result[0].geometry.location.lat();
      var lng = result[0].geometry.location.lng();
      $('#latitude').val(lat);
      $('#longitude').val(lng);
   });
});


