$(document).ready(function() {
    $('#calendar').fullCalendar({
	})
});

var config = {
	apiKey: "AIzaSyCpRAXgZfRwym9rBEfn_RmA2kpfStrIAXo",
	authDomain: "project-1-88de6.firebaseapp.com",
	databaseURL: "https://project-1-88de6.firebaseio.com",
	projectId: "project-1-88de6",
	storageBucket: "project-1-88de6.appspot.com",
	messagingSenderId: "408567007214"
};

firebase.initializeApp(config);		
var database = firebase.database();

var eventCount = 0;
$(document).on('click', '.submit', function(e){
	e.preventDefault();
	eventCount++;
	var eventName = $('#name').val();
	var eventDescrip = $('#description').val();
	var trashPoint = $('#meet').val();
	var eventDate = $('#meetDate').val();
	var eventTime = $('#meetTime').val();

	var eventInfo = {
	count: eventCount,
	name: eventName,
	description: eventDescrip,
	address: trashPoint,
	date: eventDate,
	time: eventTime
	}

	database.ref('events').push(eventInfo);
});