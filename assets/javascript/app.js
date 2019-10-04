(function() {

    'use strict';

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyC080ONM_20Rf_UKup9nFM1Eh1gY82h5SI",
        authDomain: "train-scheduler-67309.firebaseapp.com",
        databaseURL: "https://train-scheduler-67309.firebaseio.com",
        projectId: "train-scheduler-67309",
        storageBucket: "",
        messagingSenderId: "929968473514",
        appId: "1:929968473514:web:e4938c39abb791279217d3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // Get reference point to firebase databse
    let database = firebase.database();

    // Initialize moment.js
    moment().format();

    // Whenever a value is added or changed in the database, get a snapshot of the database.
    // Reflect database change in the trian schedule  
    database.ref().on('child_added', function(snapshot) {
            console.log(snapshot.val());

            // Get table body.
            let trainSchedule = $('#train-schedule');
            
            // Create a new table row.
            let tableRow = $('<tr>');

            // Create new table cells with new train information.
            // Name
            let nameCell = $('<td>').text(snapshot.val().name);

            // Desination
            let destinationCell = $('<td>').text(snapshot.val().destination);

            // Frequency of the train
            let frequency = snapshot.val().frequency;
            let frequencyCell = $('<td>').text(frequency);

            // Arival Time converted from military time to AM/PM
            let arrival = moment(snapshot.val().arrivalTime, 'HH:mm').format('LT')
            let arrivalCell = $('<td>').text(arrival);
            
            // Minutes away from arrival, calculated from frequency and arrival time.
            let convertedArrival = moment(snapshot.val().arrivalTime, "HH:mm").subtract(1, "years");
            let timeDiff = moment().diff(moment(convertedArrival), "minutes");
            let minAway = frequency - (timeDiff % frequency);
            let minAwayCell = $('<td>').text(minAway);

            // Append table cells to the new table row.
            tableRow.append(nameCell);
            tableRow.append(destinationCell);
            tableRow.append(frequencyCell);
            tableRow.append(arrivalCell);
            tableRow.append(minAwayCell);

            // Append table row to the table body
            trainSchedule.append(tableRow);

    }, function (errorObject) {
        // On error, 
        console.log('Error logged: ' + errorObject.message);
    });

    function scheduleTrain(event) {
        event.preventDefault();
        let trainName = $('#train-name').val().trim();
        let trainDestination = $('#train-destination').val().trim();
        let trainFrequency = $('#train-frequency').val().trim();
        let trainArrival = $('#train-arrival').val().trim(); 

        database.ref().push({
            name: trainName,
            destination: trainDestination,
            frequency: trainFrequency,
            arrivalTime: trainArrival
        });

        trainName.val('');
        trainDestination.val('');
        trainFrequency.val('');
        trainArrival.val('');
    }


    $(document).ready(function() {
        $('#submit').on('click', function(event) {
            scheduleTrain(event);
        });
    });
})();