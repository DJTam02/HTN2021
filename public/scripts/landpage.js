function startButt(){
    if(started == false){
        document.getElementById("start").style.animation = 'startGlow 0.75s ease-in-out infinite alternate';
        document.getElementById("options").style.animation = 'stopOGlow 0.75s ease-in-out ';
    }
}
function stopButt(){
    if (started == false){
        document.getElementById("start").style.animation = 'stopGlow 0.75s ease-in-out ';
        document.getElementById("options").style.animation = 'startOGlow 0.75s ease-in-out infinite alternate';
    }
}
function fade(){
    document.getElementById("options").style.animation = 'fadein 1s ease-in-out';
    document.getElementById("options").style.opacity = "1";
}
function optButt(){
    document.getElementById("options").style.animation = 'startOGlow 0.75s ease-in-out infinite alternate';
    document.getElementById("start").style.animation = 'stopGlow 0.75s ease-in-out';
}
function optStopButt(){
    if (oStarted == false){
        document.getElementById("options").style.animation = 'stopOGlow 0.75s ease-in-out ';
    }
    if(started == true){
        document.getElementById("start").style.animation = 'startGlow 0.75s ease-in-out infinite alternate';
        document.getElementById("options").style.animation = 'stopOGlow 0.75s ease-in-out ';
    }  
}
function OptionP(){
    oStarted = true;
    started = false;
    document.getElementById("start").style.animation = 'stopGlow 0.75s ease-in-out ';
    document.getElementById("settings").style.display = "inline-block";
    document.getElementById("maps").style.display = "none";
    document.getElementById("maps").innerHTML = "";
}
function pressButt(){
    started = true;
    var opt = document.getElementById("options");
    var butt = document.getElementById("start");
    var bux = document.getElementById("box");
    butt.removeEventListener("click", pressButt);
    butt.removeEventListener("click", fade);
    opt.style.display = "inline-block";
    var startT = parseInt(butt.offsetTop);
    var startL = parseInt(butt.offsetLeft);
    var font = 300;
    var postT = startT;
    var postL = startL;
    var endF = 20;
    var endT = h/20 
    var endW = w/20 
    var interval = setInterval(function(){
        if (postT <= endT && postL <= endW){
            clearInterval(interval);
            butt.style.top = endT + 'px';
            butt.style.left = "5%";
        }
        else{
    
            font -= (font - endF)/100;
            postT = postT + ((endT - startT) / 100);
            postL = postL + ((endW - startL) / 100);
            butt.style.top = postT + 'px';
            butt.style.left = postL + 'px';
            butt.style.fontSize = font + 'px';
        }
    }, 10)
    var boxPadding = 50;
    var boxEndL = w - (w / 10);
    var boxEndT = h - 300;
    var boxT = 0;
    var boxL = 0;
    console.log(boxEndL, boxEndT);
    var interval2 = setInterval(function(){
        if (boxT >= boxEndT && boxL >= boxEndL){
            clearInterval(interval2);
            bux.style.width = "90%";
            bux.style.minWidth = "1015px";
        } else{
            boxT = boxT + (boxEndT )/100;
            boxL = boxL + (boxEndL )/100;
            bux.style.height = boxT +'px';
            bux.style.width = boxL + 'px';
        }

    }, 10);
}
function pressButt2(){
    started = true;
    ostarted = false;
    document.getElementById("maps").style.display = "inline-block";
    document.getElementById("settings").style.display = "none";
    console.log(numSec);
    getMaps();
}
function getMaps() {
    var ref = database.ref();
    ref.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            let innerDiv = document.createElement("div");
            innerDiv.classList.add("innerMapRow");
            let div = document.createElement("div");
            div.classList.add("mapRow");
            let head = document.createElement("h1");
            head.classList.add("mapHead");
            head.innerHTML = child.key;
            innerDiv.appendChild(head);
            div.appendChild(innerDiv);
            innerDiv.addEventListener("click", mapSelected);
            document.getElementById("maps").appendChild(div);
            //console.log(child.key + ": " + child.child("Filename").val());
        });
    });
}
function mapSelected(e) {
    document.getElementById("maps").innerHTML = "";
    var mapName = "";
    if (e.target.firstChild.innerHTML == undefined) {
        mapName = e.target.innerHTML;
    } else {
        mapName = e.target.firstChild.innerHTML;
    }
    var bod = document.body;
    var op = 100;
    var transition = setInterval(function() {
        if (op == 0) {
            clearInterval(transition);
            bod.style.opacity = "0%";
            changeToMap(mapName);
        } else {
            op--;
            bod.style.opacity = op + "%";
        }
    }, 10);
}
function changeToMap(mapName) {
    document.getElementById("title").style.display = "none";
    document.getElementById("box").style.display = "none";
    document.getElementById("board").style.display = "block";
    document.getElementById("backButton").style.display = "block";
    var op = 0;
    var bod = document.body;
    var transition = setInterval(function() {
        if (op == 100) {
            clearInterval(transition);
            bod.style.opacity = "100%";
        } else {
            op++;
            bod.style.opacity = op + "%";
        }
    }, 10);
    bod.style.backgroundImage = 'url("../images/testBG.jpg")';
    console.log(numSec)
    console.log(keys)
    rect = document.getElementById("arrows").getBoundingClientRect();
    wid = document.getElementById("arrows").offsetWidth / 4;
    pixelsPerSec = (rect.top + w) / numSec;
    arrowErrors = [];
    numChildren = -1;
    document.addEventListener("keydown", pressed);
    document.addEventListener("keyup", lift);
}

function goBack() {
    getMaps();
    document.removeEventListener("keydown", pressed);
    document.removeEventListener("keyup", lift);
    var bod = document.body;
    var op = 100;
    var transition = setInterval(function() {
        if (op == 0) {
            clearInterval(transition);
            bod.style.opacity = "0%";
            changeToMenu();
        } else {
            op--;
            bod.style.opacity = op + "%";
        }
    }, 10);
}

function changeToMenu() {
    document.getElementById("title").style.display = "block";
    document.getElementById("box").style.display = "block";
    document.getElementById("board").style.display = "none";
    document.getElementById("backButton").style.display = "none";
    document.getElementById("backButtonEnd").style.display = "none";
    document.getElementById("gameEndScreen").style.display = "none";
    document.body.style.backgroundImage = 'none';
    finalScore = 0;
    perf = 0;
    gre = 0;
    goo = 0;
    ok = 0;
    miss = 0;
    var op = 0;
    var bod = document.body;
    var transition = setInterval(function() {
        if (op == 100) {
            clearInterval(transition);
            bod.style.opacity = "100%";
        } else {
            op++;
            bod.style.opacity = op + "%";
        }
    }, 10);
}

function durationC(DC){
    numSec = DC;
}

function aC0(e){
e.innerHTML = "Press any key";
document.addEventListener("keydown", aCC0);
}

function aCC0(e){
keyC = e.key;
keys[0]= keyC
document.getElementById("arrowButton0").innerHTML = keys[0];
document.removeEventListener("keydown",aCC0);
console.log(keys)
}

function aC1(e){
    e.innerHTML = "Press any key";
    document.addEventListener("keydown", aCC1);
    }
    
function aCC1(e){
keyC = e.key;
keys[1]= keyC
document.getElementById("arrowButton1").innerHTML = keys[1];
document.removeEventListener("keydown",aCC1);
}

function aC2(e){
e.innerHTML = "Press any key";
document.addEventListener("keydown", aCC2);
}

function aCC2(e){
keyC = e.key;
keys[2]= keyC
document.getElementById("arrowButton2").innerHTML = keys[2];
document.removeEventListener("keydown",aCC2);
}

function aC3(e){
    e.innerHTML = "Press any key";
    document.addEventListener("keydown", aCC3);
    }
    
function aCC3(e){
keyC = e.key;
keys[3]= keyC
document.getElementById("arrowButton3").innerHTML = keys[3];
document.removeEventListener("keydown",aCC3);
    }
function mapMaker() {
    var bod = document.body;
    var op = 100;
    var transition = setInterval(function() {
        if (op == 0) {
            clearInterval(transition);
            bod.style.opacity = "0%";
            uploadSong();
        } else {
            op--;
            bod.style.opacity = op + "%";
        }
    }, 10);
}
function uploadSong() {
    document.getElementById("title").style.display = "none";
    document.getElementById("box").style.display = "none";
    document.getElementById("upload").style.display = "block";
    var op = 0;
    var bod = document.body;
    var transition = setInterval(function() {
        if (op == 100) {
            clearInterval(transition);
            bod.style.opacity = "100%";
        } else {
            op++;
            bod.style.opacity = op + "%";
        }
    }, 10);
}

function downloadSong() {
    var formData = new FormData();
    formData.append('music', document.getElementById("music").files[0]);
    formData.append('image', document.getElementById("background").files[0]);
    $.ajax({
        url: "/download",
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data) {
            songUploaded(document.getElementById("music").files[0].name, document.getElementById("background").files[0].name);
        },
        error: function(data) {
            alert("There was an error uploading your song.")
        }
    });   
    return false
}

function songUploaded(songName, bgImage) {
    var bod = document.body;
    var op = 100;
    var transition = setInterval(function() {
        if (op == 0) {
            clearInterval(transition);
            bod.style.opacity = "0%";
            displayMapMaker(songName, bgImage);
        } else {
            op--;
            bod.style.opacity = op + "%";
        }
    }, 10);
}

function displayMapMaker(songName, bgImage) {
    document.getElementById("upload").style.display = "none";
    document.getElementById("mapMaker").style.display = "block";
    var op = 0;
    var bod = document.body;
    var transition = setInterval(function() {
        if (op == 100) {
            clearInterval(transition);
            bod.style.opacity = "100%";
            var audio = document.createElement("audio");
            audio.src = "mapFiles/" + songName;
            audio.setAttribute("preload", "metadata");
            document.getElementById("mapMaker").appendChild(audio);
            audio.onloadedmetadata = function () {
                document.song = songName;
                document.back = bgImage;
                loadMapMaker(songName, audio.duration, bgImage);
            }
        } else {
            op++;
            bod.style.opacity = op + "%";
        }
    }, 10);
}

function loadMapMaker(songName, length, bgImage) {
    length = Math.floor(length);
    console.log("duration: " + length);
    document.body.style.backgroundImage = 'url("../mapFiles/' + bgImage + '")';
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.removeProperty("height");
    var board = document.createElement("div");
    board.id = "board2";
    document.body.appendChild(board);
    for (let i = 0; i < length; i++) {
        let row = document.createElement("div");
        for (let j = 0; j < 4; j++) {
            let square = document.createElement("div");
            square.classList.add("timingBox");
            row.appendChild(square);
        }
        row.classList.add("timingRow");
        board.appendChild(row);
    }
    boxProp = document.getElementsByClassName("timingBox")[4].getBoundingClientRect();
    boxLength = boxProp.top;
    board.addEventListener("click", addArrow);
    console.log("children: " + board.childElementCount);
}

function addArrow(e) {
    if (e.target.classList.contains("timingBox")) {
        var boardProp = document.getElementById("board2").getBoundingClientRect();
        var boardEnd = boardProp.left + 1;
        var boxRect = e.target.getBoundingClientRect();
        var newArrow = document.createElement("div");
        if (boxRect.left == boardEnd) {
            newArrow.classList.add("newArrowL");
        } else if (boxRect.left == boardEnd + boxLength - 2) {
            newArrow.classList.add("newArrowD");
        } else if (boxRect.left == boardEnd + (2 * boxLength) - 4) {
            newArrow.classList.add("newArrowU");
        } else {
            newArrow.classList.add("newArrowR");
        }
        newArrow.style.left = (boxRect.left - boardEnd) + "px";
        newArrow.style.top = e.clientY + "px";
        newArrow.addEventListener("mousedown", selectArrow);
        newArrow.addEventListener("mouseover", updateSeconds);
        newArrow.addEventListener("mouseout", function() {
            document.getElementById("info").style.display = "none";
        });
        if (!willOverlap(e.clientY, newArrow.classList.item(0))) {
            document.getElementById("board2").appendChild(newArrow);
        } else {
            alert("You cannot overlap your arrows!");
        }
    }
}
function updateSeconds(e, selectedArrow) {
    document.getElementById("info").style.display = "block";
    var box;
    if (selectedArrow != undefined) {
        box = selectedArrow.getBoundingClientRect();
    } else {
        box = e.target.getBoundingClientRect();
    }
    document.getElementById("sec").innerHTML = Math.round((box.top / boxLength) * 1000) / 1000;
}
function selectArrow(e) {
    mousedOver = false;
    document.selectedArrow = e.target;
    document.original = e.target.style.top;
    document.addEventListener("mouseup", releaseArrow);
    document.addEventListener("mousemove", moveArrow);
}

function moveArrow(e) {
    document.selectedArrow.style.top = e.clientY + "px";
    updateSeconds(e, document.selectedArrow)
}

function releaseArrow(e) {
    console.log(document.original);
    document.removeEventListener("mousemove", moveArrow);
    document.removeEventListener("mouseup", releaseArrow);
    if (overlapping(document.selectedArrow)) {
        alert("You cannot overlap your arrows!");
        document.selectedArrow.style.top = document.original;
    }
}
function overlapping(arrow) {
    var cName = arrow.classList.item(0);
    var els = document.getElementsByClassName(cName);
    for (let i = 0; i < els.length; i++) {
        if (els[i] != arrow) {
            let rect1 = els[i].getBoundingClientRect();
            let rect2 = arrow.getBoundingClientRect();
            if (!(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom)) {
                return true;
            }
        }
    }
    return false;
}   
function willOverlap(pos, cName) {
    var els = document.getElementsByClassName(cName);
    for (let i = 0; i < els.length; i++) {
        let rect1 = els[i].getBoundingClientRect();
        console.log(rect1.top, rect1.bottom, pos, boxLength);
        if (pos + boxLength >= rect1.top && pos + boxLength <= rect1.bottom) {
            return true;
        }
    }
    return false;
}
function saveMap() {
    var name = document.getElementById("mapName").value;
    var els = document.getElementById("board2").childNodes;
    var arrows = [];
    var counter
    for (let i = 0; i < els.length; i++) {
        if (!els[i].classList.contains("timingRow")) {
            arrows.push(els[i]);
        }
    }
    arrows.sort((a, b) => (a.style.top > b.style.top) ? 1 : -1);
    var arrowsList = {}
    for (let i = 0; i < arrows.length; i++) {
        let boardProp = document.getElementById("board2").getBoundingClientRect();
        let boardEnd = boardProp.left + 1;
        let box = arrows[i].getBoundingClientRect();
        arrowsList[i + 1] = {
            Length: 0,
            Type: Math.round((box.left - boardEnd) / (boxLength - 1)),
            Time: (Math.round((box.top / boxLength) * 1000))
        }
    }
    var mapData = {
        Filename: document.song,
        Background: document.back,
        Arrows: arrowsList
    };
    firebase.database().ref().update({
        [name]: mapData
    });
    alert("Map Saved!");
    backToMenu();
}

function backToMenu() {
    var bod = document.body;
    var op = 100;
    var transition = setInterval(function() {
        if (op == 0) {
            clearInterval(transition);
            bod.style.opacity = "0%";
            showMenu();
        } else {
            op--;
            bod.style.opacity = op + "%";
        }
    }, 10);
}
function showMenu() {
    document.getElementById("title").style.display = "block";
    document.getElementById("box").style.display = "block";
    document.getElementById("board2").remove();
    document.getElementById("maps").innerHTML = "";
    document.getElementById("mapMaker").style.display = "none";
    var op = 0;
    var bod = document.body;
    bod.style.backgroundImage = "none";
    var transition = setInterval(function() {
        if (op == 100) {
            clearInterval(transition);
            bod.style.opacity = "100%";
        } else {
            op++;
            bod.style.opacity = op + "%";
        }
    }, 10);
}
