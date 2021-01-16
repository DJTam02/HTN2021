document.addEventListener("keydown", pressed);
function pressed(e) {
    if (e.key == "e") {
        map("TestMap1");
    }
    document.getElementById(e.key.substring(5, e.key.length)).style.backgroundColor = "white";
}
document.addEventListener("keyup", lift);
function lift(e) {
    document.getElementById(e.key.substring(5, e.key.length)).style.backgroundColor = "";
}

function sendArrow(num) {
    var w = document.getElementById("arrows").offsetWidth / 4;
    var rect = document.getElementById("arrows").getBoundingClientRect();
    var arrow = document.createElement("div");
    arrow.classList.add("newArrow");
    arrow.style.backgroundImage = 'url("../images/lol.JPG")'; // Add different arrows
    arrow.style.left = (num * w) + "px";
    arrow.style.top = -(rect.top + w + 1) + "px";
    document.getElementById("arrows").appendChild(arrow);
    var pos = arrow.offsetTop;
    var totalDist = window.innerHeight + w;
    console.log(totalDist);
    var interval = setInterval(function () {
        if (pos >= window.innerHeight - rect.top) {
            clearInterval(interval);
            arrow.remove();
        } else {
            pos += totalDist / (250 * numSec);
            arrow.style.top = pos + "px";
        }
    }, 1);
}

function map(name) {
    var mapRef = database.ref(name);
    var arrowRef = mapRef.child("Arrows");
    arrowRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            setTimeout(function () { 
                sendArrow(parseInt(child.child("Type").val()));
            }, (parseInt(child.child("Time").val()) - (numSec * 1000)));
        });
    });
}