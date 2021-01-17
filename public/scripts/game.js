
function pressed(e) {
    switch (e.key) {
        case keys[0]:
            document.getElementById("Left").style.backgroundImage = 'url("../images/Arrows/Larrow2.png")';
            break;
        case keys[1]:
            document.getElementById("Down").style.backgroundImage = 'url("../images/Arrows/Darrow2.png")';
            break;
        case keys[2]:
            document.getElementById("Up").style.backgroundImage = 'url("../images/Arrows/Uarrow2.png")';
            break;
        case keys[3]:
            document.getElementById("Right").style.backgroundImage = 'url("../images/Arrows/Rarrow2.png")';
            break;
    }
}
function lift(e) {
    switch (e.key) {
        case keys[0]:
            document.getElementById("Left").style.backgroundImage = 'url("../images/Arrows/Larrow1.png")';
            break;
        case keys[1]:
            document.getElementById("Down").style.backgroundImage = 'url("../images/Arrows/Darrow1.png")';
            break;
        case keys[2]:
            document.getElementById("Up").style.backgroundImage = 'url("../images/Arrows/Uarrow1.png")';
            break;
        case keys[3]:
            document.getElementById("Right").style.backgroundImage = 'url("../images/Arrows/Rarrow1.png")';
            break;
    }
}
function endScreen(){
    var bod = document.body;
    var op = 100;
    var transition = setInterval(function() {
        if (op == 0) {
            clearInterval(transition);
            bod.style.opacity = "0%";
            toEndScreen();
        } else {
            op--;
            bod.style.opacity = op + "%";
        }
    }, 10);
}
function toEndScreen(){
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
    document.getElementById("board").style.display = "none";
    document.getElementById("backButton").style.display = "none";
    document.getElementById("backButtonEnd").style.display = "block";
    document.getElementById("gameEndScreen").style.display = "inline-block";
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "black";
    miss = numChildren - (perf + gre + goo + ok);
    document.getElementById("perfs").innerHTML = "Perfects: " + perf
    document.getElementById("greas").innerHTML = "Greats: " + gre
    document.getElementById("goos").innerHTML = "Goods: " + goo
    document.getElementById("oks").innerHTML = "Okays: "  + ok
    document.getElementById("mis").innerHTML = "Misses: " + miss
    finalScore = (perf + gre*(0.7)+goo*(0.5)+ok*(0.3))/numChildren;
    document.getElementById("Endresults").innerHTML = "Final Score: " + parseInt(finalScore*100)
    console.log("final SCore", finalScore)
    if (finalScore >= 0.8){
        document.getElementById("kongPerf").style.display = "inline-block";
        document.getElementById("kongOk").style.display = "none";
        document.getElementById("kongBad").style.display = "none";
        document.getElementById("kongSuck").style.display = "none";
    }

    else if (finalScore >= 0.6){
        document.getElementById("kongOk").style.display = "inline-block";
        document.getElementById("kongPerf").style.display = "none";
        document.getElementById("kongBad").style.display = "none";
        document.getElementById("kongSuck").style.display = "none";
    }
    else if (finalScore >= 0.4){
        document.getElementById("kongOk").style.display = "none";
        document.getElementById("kongPerf").style.display = "none";
        document.getElementById("kongBad").style.display = "inline-block";
        document.getElementById("kongSuck").style.display = "none";
    }
    else if(finalScore >= 0){
        document.getElementById("kongOk").style.display = "none";
        document.getElementById("kongPerf").style.display = "none";
        document.getElementById("kongBad").style.display = "none";
        document.getElementById("kongSuck").style.display = "inline-block";

    }

    console.log(perf,gre,goo,ok,miss,arrowErrors);

}
function sendArrow(num, arrowNum) {
    var arrow = document.createElement("div");
    if(num == 0){
        arrow.classList.add("newArrowL");
    }
    if(num == 1){
        arrow.classList.add("newArrowD");
    }
    if(num == 2){
        arrow.classList.add("newArrowU");
    }
    if(num == 3){
        arrow.classList.add("newArrowR");
    }
    
    arrow.style.left = (num * wid) + "px";
    arrow.style.top = -(rect.top + wid + 1) + "px";
    console.log(wid);
    document.getElementById("arrows").appendChild(arrow);
    var pos = arrow.offsetTop;
    var totalDist = window.innerHeight + wid;
    //var start = Date.now();
    var interval = setInterval(function () {
        if (pos >= window.innerHeight - rect.top - wid) {
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
        } else {
            if (pos >= -wid) {
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

function map(name, filename) {
    var audio = new Audio('../mapFiles/' + filename);
    audio.volume = vol;
    audio.addEventListener("ended", function() {
        audio.currentTime = 0;
        endScreen();
    });
    console.log(audio.volume);
    audio.play();
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
        if (arrowErrors[document.leftArrow[1]] <= 0.005 && arrowErrors[document.leftArrow[1]] >= -0.005){
            perf++;
        }
        else if (arrowErrors[document.leftArrow[1]] <= 0.015 && arrowErrors[document.leftArrow[1]] >= -0.015){
            gre++;
        }
        else if (arrowErrors[document.leftArrow[1]] <= 0.025 && arrowErrors[document.leftArrow[1]] >= -0.025){
            goo++;
        }
        else if (arrowErrors[document.leftArrow[1]] <= 0.045 && arrowErrors[document.leftArrow[1]] >= -0.045){
            ok++;
        }
        console.log(arrowErrors[document.leftArrow[1]]);
    }
}
function downPressed(e) {
    if (e.key == keys[1]) {
        arrowErrors[document.downArrow[1]] = parseFloat(document.downArrow[0].style.top) / pixelsPerSec;
        if (arrowErrors[document.downArrow[1]] <= 0.005 && arrowErrors[document.downArrow[1]] >= -0.005){
            perf++;
        }
        else if (arrowErrors[document.downArrow[1]] <= 0.015 && arrowErrors[document.downArrow[1]] >= -0.015){
            gre++;
        }
        else if (arrowErrors[document.downArrow[1]] <= 0.025 && arrowErrors[document.downArrow[1]] >= -0.025){
            goo++;
        }
        else if (arrowErrors[document.downArrow[1]] <= 0.045 && arrowErrors[document.downArrow[1]] >= -0.045){
            ok++;
        }
        console.log(arrowErrors[document.downArrow[1]]);
    }
}
function upPressed(e) {
    if (e.key == keys[2]) {
        arrowErrors[document.upArrow[1]] = parseFloat(document.upArrow[0].style.top) / pixelsPerSec;
        if (arrowErrors[document.upArrow[1]] <= 0.005 && arrowErrors[document.upArrow[1]] >= -0.005){
            perf++;
        }
        else if (arrowErrors[document.upArrow[1]] <= 0.015 && arrowErrors[document.upArrow[1]] >= -0.015){
            gre++;
        }
        else if (arrowErrors[document.upArrow[1]] <= 0.025 && arrowErrors[document.upArrow[1]] >= -0.025){
            goo++;
        }
        else if (arrowErrors[document.upArrow[1]] <= 0.045 && arrowErrors[document.upArrow[1]] >= -0.045){
            ok++;
        }
        console.log(arrowErrors[document.upArrow[1]]);
    }
}
function rightPressed(e) {
    if (e.key == keys[3]) {
        arrowErrors[document.rightArrow[1]] = parseFloat(document.rightArrow[0].style.top) / pixelsPerSec;
        if (arrowErrors[document.rightArrow[1]] <= 0.005 && arrowErrors[document.rightArrow[1]] >= -0.005){
            perf++;
        }
        else if (arrowErrors[document.rightArrow[1]] <= 0.015 && arrowErrors[document.rightArrow[1]] >= -0.015){
            gre++;
        }
        else if (arrowErrors[document.rightArrow[1]] <= 0.025 && arrowErrors[document.rightArrow[1]] >= -0.025){
            goo++;
        }
        else if (arrowErrors[document.rightArrow[1]] <= 0.045 && arrowErrors[document.rightArrow[1]] >= -0.045){
            ok++;
        }
        console.log(arrowErrors[document.rightArrow[1]]);
    }
}
