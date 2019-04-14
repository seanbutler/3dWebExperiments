
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

var animate = function () {

    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, width, height);

    requestAnimationFrame(animate);

    entities.forEach(function(element) {
        element.update();
        element.draw();
    });

};

// ---------------------------------------------------------------------------

animate();
