document.addEventListener("keydown", pressed);
function pressed(e) {
    if (e.key == "e") {
        map("TestMap1");
    }
    switch (e.key) {
        case keys[0]:
            document.getElementById("Left").style.backgroundColor = "white";
            break;
        case keys[1]:
            document.getElementById("Down").style.backgroundColor = "white";
            break;
        case keys[2]:
            document.getElementById("Up").style.backgroundColor = "white";
            break;
        case keys[3]:
            document.getElementById("Right").style.backgroundColor = "white";
            break;
    }
}
document.addEventListener("keyup", lift);
function lift(e) {
    switch (e.key) {
        case keys[0]:
            document.getElementById("Left").style.backgroundColor = "transparent";
            break;
        case keys[1]:
            document.getElementById("Down").style.backgroundColor = "transparent";
            break;
        case keys[2]:
            document.getElementById("Up").style.backgroundColor = "transparent";
            break;
        case keys[3]:
            document.getElementById("Right").style.backgroundColor = "transparent";
            break;
    }
}

function sendArrow(num, arrowNum) {
    var arrow = document.createElement("div");
    arrow.classList.add("newArrow");
    arrow.style.backgroundImage = 'url("../images/lol.JPG")'; // Add different arrows
    arrow.style.left = (num * w) + "px";
    arrow.style.top = -(rect.top + w + 1) + "px";
    document.getElementById("arrows").appendChild(arrow);
    var pos = arrow.offsetTop;
    var totalDist = window.innerHeight + w;
    //var start = Date.now();
    var interval = setInterval(function () {
        if (pos >= window.innerHeight - rect.top - w) {
            //let end = Date.now();
            //console.log(end - start);
            clearInterval(interval);
            arrow.remove();
            if (num == 0) {
                document.removeEventListener("keydown", leftPressed);
            } else if (num == 1) {
                document.removeEventListener("keydown", downPressed);
            } else if (num == 2) {
                document.removeEventListener("keydown", upPressed);
            } else {
                document.removeEventListener("keydown", rightPressed);
            }
            if (arrowNum == numChildren) {
                console.log("done");
            }
        } else {
            if (pos >= -w) {
                if (num == 0) {
                    document.leftArrow = [arrow, arrowNum];
                    document.addEventListener("keydown", leftPressed);
                } else if (num == 1) {
                    document.downArrow = [arrow, arrowNum];
                    document.addEventListener("keydown", downPressed);
                } else if (num == 2) {
                    document.upArrow = [arrow, arrowNum];
                    document.addEventListener("keydown", upPressed);
                } else {
                    document.rightArrow = [arrow, arrowNum];
                    document.addEventListener("keydown", rightPressed);
                }
            }
            pos += totalDist / (300 * numSec);
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
                sendArrow(parseInt(child.child("Type").val()), parseInt(child.key));
            }, (parseInt(child.child("Time").val()) - (numSec * 1000)));
        });
        numChildren = snapshot.numChildren();
    });
}

function leftPressed(e) {
    if (e.key == keys[0]) {
        arrowErrors[document.leftArrow[1]] = parseFloat(document.leftArrow[0].style.top) / pixelsPerSec;
        console.log(arrowErrors[document.leftArrow[1]]);
    }
}

function downPressed(e) {
    if (e.key == keys[1]) {
        arrowErrors[document.downArrow[1]] = parseFloat(document.downArrow[0].style.top) / pixelsPerSec;
        console.log(arrowErrors[document.downArrow[1]]);
    }
}
function upPressed(e) {
    if (e.key == keys[2]) {
        arrowErrors[document.upArrow[1]] = parseFloat(document.upArrow[0].style.top) / pixelsPerSec;
        console.log(arrowErrors[document.upArrow[1]]);
    }
}
function rightPressed(e) {
    if (e.key == keys[3]) {
        arrowErrors[document.rightArrow[1]] = parseFloat(document.rightArrow[0].style.top) / pixelsPerSec;
        console.log(arrowErrors[document.rightArrow[1]]);
    }
}
