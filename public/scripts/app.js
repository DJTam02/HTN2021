function slide() {
    var el = document.getElementById("square");
    var pos = -100;
    var interval = setInterval(function () {
        if (pos == 800) {
            clearInterval(interval);
        } else {
            pos += 10;
            el.style.top = pos + 'px';
        }
    }, 10);
}