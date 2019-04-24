
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

function IntersectionTestAABB(element, other) {

    // console.log(element.isa + " " + element.x + " " + element.y);
    // console.log(other.isa + " " + other.x + " " + other.y);
    // console.log(1);

    if ( element.x - (element.w / 2) < other.x + (other.w / 2)) {
        if ( element.x + (element.w / 2) > other.x - (other.w / 2)) {
            if ( element.y - (element.h / 2) < other.y + (other.h / 2)) {
                if ( element.y + (element.h / 2) > other.y - (other.h / 2)) {
                    return true;
                }
            }
        }
    }
    return false
}

// ---------------------------------------------------------------------------

var entities = [];

for ( var n = 0; n < 50; n++)
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

    context.fillStyle = "rgba(0, 0, 0, 0.125)";
    context.fillRect(0, 0, width, height);

    requestAnimationFrame(animate);

    entities.forEach(function(element) {
        if (element.exists) {
            element.update();
            element.draw();

            if (element.isCollidable) {
                entities.forEach(function(other) {
                    if (other.isCollidable) {
                        if ( element.isa != other.isa ) {
                            if (IntersectionTestAABB(element, other)) {
                                element.Collided(other);
                                other.Collided(element);
                                // console.log(element.isa + " " + other.isa);
                            }
                        }
                    }
                });
            }
        }
    });
};

// ---------------------------------------------------------------------------

animate();
