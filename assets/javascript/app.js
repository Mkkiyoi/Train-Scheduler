(function() {

    'use strict';

    // Initialize config for firebase database.
    let config = {
        apiKey: "AIzaSyB7AsEBrqZQifTPlf-CnHwbFTGr8oedwEQ",
        authDomain: "testdb-73df7.firebaseapp.com",
        databaseURL: "https://testdb-73df7.firebaseio.com",
        projectId: "testdb-73df7",
        storageBucket: "testdb-73df7.appspot.com",
        messagingSenderId: "833925431795",
        appId: "1:833925431795:web:833563f80eab0b71dfd286"
    };
    
    // Initialize connection to firebase
    firebase.initializeApp(config);
    
    // Get reference point to firebase databse
    let database = firebase.database();

    database.ref().set({
        trains: null
    });

    // Whenever a value is added or changed in the database, get a snapshot of the database.
    // Reflect database change in the trian schedule  
    database.ref().on('child_added', function (snapshot) {
            console.log(snapshot.val());

            // Get table body.
            let trainSchedule = $('#train-schedule');
            
            // Create a new table row.
            let tableRow = $('<tr>');

            // Create new table cells with new train information.
            let nameCell = $('<td>').text(snapshot.val().name);
            let destinationCell = $('<td>').text(snapshot.val().destination);
            let frequencyCell = $('<td>').text(snapshot.val().frequency);
            let arrivalCell = $('<td>').text(snapshot.val().arrivalTime);
            
            // Need to calculate how many min away this train is
            // let minAwayCell = $('<td>').text(snapshot.val().minAway);

            // Append table cells to the new table row.
            tableRow.append(nameCell);
            tableRow.append(destinationCell);
            tableRow.append(frequencyCell);
            tableRow.append(arrivalCell);
            // tableRow.append(minAwayCell);

            // Append table row to the table body
            trainSchedule.append(tableRow);
    }, function (errorObject) {
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
    }


    $(document).ready(function() {
        $('#submit').on('click', function(event) {
            scheduleTrain(event);
        });
    });
})();