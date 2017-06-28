
// Global Variables
// I made any internally declared variables global so that I could reuse them for other functions.  
      var map, infoWindow, pos, marker, point;
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
        $("#save").on("click", function() {
          
          point = marker.getPosition(); 
          document.getElementById("latitude").value = point.lat();
          document.getElementById("longitude").value = point.lng();
        })
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
      console.log(result[0].geometry.location.lat());
      console.log(result[0].geometry.location.lng());
   });
});

// link to meet up api and have it so people can sign in to their meet up, and add or join events posted in the app
