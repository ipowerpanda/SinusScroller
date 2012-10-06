
var canvas;
var stage;

var scrollTextPlain = "Here comes just another sinus scroller made by the mighty panda. Hope you enjoy it! Greetings fly out to the NATTER!";
var scrollFont = "bold 36px Arial";
var scrollTextArray = new Array();
var scrollSpeed = 3;

var amplitude = 50;

var yRichtung;
var curX = 0;

var buffer = 0;


var starArray = new Array();
var starCount = 200;
var centerOfScreenX;
var centerOfScreenY;

var bg;


$(document).ready(function () {

    $("#sliderSpeed").slider({ min: 0, max: 20, value:scrollSpeed, stop: function (event, ui) { scrollSpeed = ui.value; } });
    $("#sliderAmplitude").slider({ min: 0, max: 100, value: amplitude, stop: function (event, ui) { amplitude = ui.value; } });

  
    canvas = document.getElementById("myCanvas");
    centerOfScreenY = canvas.clientHeight / 2;
    centerOfScreenX = canvas.clientWidth / 2;
    yRichtung = canvas.clientHeight / 2;
    stage = new createjs.Stage(canvas);
    addBackground();
    initStars();
    starArray.forEach(function (v) { stage.addChild(v) });
    fillScrollTextArray();
    addScrollTextToStage();
    stage.update();

    createjs.Ticker.setFPS(20);
    createjs.Ticker.addListener(tick);

}); 

function addBackground() {
    bg = new createjs.Bitmap("/Content/background.png");
    stage.addChild(bg);
}


function initStars() {

    var g = new createjs.Graphics();
    g.setStrokeStyle(1).beginFill("#FFF").drawCircle(0, 0, 1 );
    for (var i = 0; i < starCount; i++) {
        var shape = new createjs.Shape(g);
        initStar(shape);
        starArray.push(shape);
    }

    calcStarPositions();
};

function initStar(shape) {
    shape.xInitial = Math.floor(Math.random() * 1000) - 500;
    shape.yInitial = Math.floor(Math.random() * 1000) - 500;
    shape.z = Math.floor(Math.random() * 1001) + 100;
}

function tick() {

    scrollTextArray.forEach(function (v,i) {

        v.y = amplitude * (Math.sin(v.x * (Math.PI / (200))) * -1) + yRichtung;
        v.x -= scrollSpeed;
    });

    if (scrollTextArray[scrollTextArray.length-1].x < 0) {
        resetScroller();
    }

    calcStarPositions();
    stage.update();
}


function calcStarPositions() {
    starArray.forEach(function (v)
    {
        v.x = (v.xInitial / v.z * 100) + centerOfScreenX;
        v.y = (v.yInitial / v.z * 100) + centerOfScreenY;
        v.z -= 15;
        if (v.x > 800 || v.y > 600 | v.z < 1) {
            initStar(v);
        }

    });
}

function resetScroller() {

    buffer = 0;
    for (var i = 0; i < scrollTextPlain.length; i++) {
        var t = scrollTextArray[i];
        t.x = canvas.clientWidth + buffer;
        buffer += t.getMeasuredWidth();
    }
}

function addScrollTextToStage() {

    scrollTextArray.forEach(function (v) { stage.addChild(v) });
}

function fillScrollTextArray() {
    
    for (var i = 0; i < scrollTextPlain.length; i++) {

        var t = new createjs.Text(scrollTextPlain[i], scrollFont, "red");
        t.y = canvas.clientHeight / 2;
        t.x = canvas.clientWidth + buffer;
        buffer += t.getMeasuredWidth();
        scrollTextArray.push(t);
    }

};