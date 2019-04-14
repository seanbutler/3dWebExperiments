
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

var entities = [];

for ( var n = 0; n < 100; n++)
{
    entities.push(new Star());
}

var rainbow = [
    "rgb(255, 0, 0)",
    "rgb(255, 128, 0)",
    "rgb(255, 255, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 0, 255)",
    "rgb(128, 0, 255)",
    "rgb(255, 0, 255)"
];

for ( var y = 0; y < rainbow.length; y++)
{
    for ( var x = 0; x < 10; x++)
    {
        entities.push(new Block(x, y, rainbow[y]));
    }
}

var bat = new Bat();
var ball = new Ball();

entities.push(bat);
entities.push(ball);

var animate = function () {

    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, width, height);

    requestAnimationFrame(animate);

    entities.forEach(function(element) {
        if (element.exists) {
            element.update();
            element.draw();
        }
    });

};

// ---------------------------------------------------------------------------

animate();
