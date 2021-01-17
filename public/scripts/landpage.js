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
}
function pressButt(){
    getMaps();
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