 // Read in database
 function show() {
    console.log("here");
    var table = document.getElementById("tbl");
    var leadsRef = database.ref('data');
    // This event listener will trigger when database is changed
    leadsRef.on('value', function(snapshot) {
        for (let i = 1; i < table.rows.length; i = i + 0) {
            table.deleteRow(i);
        }
        snapshot.forEach(function(childSnapshot) {
            let row = table.insertRow(-1);
            let td1 = row.insertCell(0)
            let td2 = row.insertCell(1);
            row.addEventListener("click", removeData);
            td2.innerHTML = childSnapshot.val();
            td1.innerHTML = childSnapshot.key;
        });
    });
    table.style.display = "table";
}

// Remove from database 
function removeData(e) {
    var key = e.target.parentElement.firstChild.innerHTML;
    var path = firebase.database().ref("data/" + key);
    path.remove();
}

//Add to database
function insertData() {
    var name = document.getElementById("name").value;
    var val = document.getElementById("value").value;
    firebase.database().ref('data').update({
        [name]: parseInt(val) // Square brackets allow value of variable to be the name of the field
    });
    return false;
}