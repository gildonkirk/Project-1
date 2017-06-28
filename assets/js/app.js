
// Global Variables
// I made any internally declared variables global so that I could reuse them for other functions.  


var map, infoWindow, pos, marker, point, date, time, user;



// initializes map - aka - starts and displays the map on our web-page.
      
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  });

  infoWindow = new google.maps.InfoWindow;

// geolocates the user, if they allow them to! 

if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(function(position) {
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log(position)

        // Allows the marker to be movable and sets the marker to be displayed at the user's position.   

    marker = new google.maps.Marker({
      position: pos,
      map: map,
      draggable:true,
      title:"Drag me!"
    })

        //vidually displays the marker at the user's location

    infoWindow.set(marker);
    infoWindow.open(map);
    map.setCenter(pos);
    
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });

} else {
    // calls the function that handles a user that doesn't use geolocation.  We will need to modify this to display a way for them to input location information.  
  handleLocationError(false, infoWindow, map.getCenter());
}

//clicking on save updates the lat and long on html and table.  

$("#save").on("click", function() {
          
  point = marker.getPosition();
  date = moment().format("MM/DD/YY")
  time = moment().format("hh:mm:ss")
  user = ""

  document.getElementById("latitude").value = point.lat();
  document.getElementById("longitude").value = point.lng();

  updateTable();

  })
}

//GeoLocation not accepted my user - function. 

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

//update table with date, time, location information.

function updateTable() {
  $("#trashTable").append("<tr><td>" + date + "</td><td>" + time + "</td><td>" +
  point + "</td><td>" + user + "</td></tr>");
}
