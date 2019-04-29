
// ---------------------------------------------------------------------------

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var width = window.innerWidth;
var height = window.innerHeight;

var dpr = window.devicePixelRatio;
canvas.width = width * dpr;
canvas.height = height * dpr;
context.scale(dpr, dpr);

// ---------------------------------------------------------------------------

var ball = new Ball();

// ---------------------------------------------------------------------------

var animate = function () {
    context.fillStyle = "rgb(255, 255, 255)";
    context.fillRect(0, 0, width, height);
    requestAnimationFrame(animate);
    ball.update();
    ball.draw();
};

// ---------------------------------------------------------------------------

animate();
