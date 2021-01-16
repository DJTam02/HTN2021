function startButt(){
    document.getElementById("start").style.animation = 'startStartGlow 0.75s ease-in-out infinite alternate';
    setTimeout(function (){
        document.getElementById("start").style.animation = 'startGlow 0.75s ease-in-out infinite alternate';
    }, 750)
}
function stopButt(){
    document.getElementById("start").style.animation = 'stopGlow 0.75s ease-in-out ';
}
function fade(){
    document.getElementById("options").style.animation = 'fadein 1s ease-in-out';
    document.getElementById("options").style.opacity = "1";
}
function pressButt(){
    var opt = document.getElementById("options");
    var butt = document.getElementById("start");
    var bux = document.getElementById("box");
    butt.removeEventListener("click", pressButt);
    butt.removeEventListener("mouseleave", stopButt);
    butt.removeEventListener("mouseover", startButt);
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
            butt.style.left = endW + 'px';
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
    var boxEndL = w - 230;
    var boxEndT = h - 400;
    var boxT = 0;
    var boxL = 0;
    var interval = setInterval(function(){
        if (boxT >= boxEndT && boxL >= boxEndL){
            clearInterval(interval);
        }
        else{

            boxT = boxT + (boxEndT )/100;
            boxL = boxL + (boxEndL )/100;
            bux.style.height = boxT +'px';
            bux.style.width = boxL + 'px';
        }

    }, 10)
}