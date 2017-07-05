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
var eventName = '';
var eventDescrip = '';
var trashPoint = '';
var eventDate = '';
var eventTime = '';

var eventInfo = {
	count: eventCount,
	name: eventName,
	description: eventDescrip,
	address: trashPoint,
	date: eventDate,
	time: eventTime
}

$(document).on('click', '.submit', function(e){
	e.preventDefault();
	eventCount++;
	eventName = $('#name').val();
	eventDescrip = $('#description').val();
	trashPoint = $('#meet').val();
	eventDate = $('#meetDate').val();
	eventTime = $('#meetTime').val();
	console.log(eventName);
	console.log(eventDescrip);
	console.log(trashPoint);
	console.log(eventDate);
	console.log(eventTime);
	// database.ref().push
});