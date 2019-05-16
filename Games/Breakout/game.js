
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
    if ( Math.abs( ( element.x + element.dx ) - other.x) > (element.w/2 + other.w/2)) {
      return false;
    }
    if ( Math.abs(( element.y + element.dy ) - other.y) > (element.h/2 + other.h/2)) {
      return false;
    }
    return true;
}

function RelativeVector(element, other) {
  var x = ( element.x - other.x );
  var y = ( element.y - other.y );
  return [x, y];
}

function GetHorizontalRelation(element, other) {
  if ( ( element.x - other.x ) > ( element.w / 2 + other.w / 2 )) {
    return -1;
  }

  if ( ( other.x - element.x ) > ( element.w / 2 + other.w / 2 )) {
    return 1;
  }

  return 0;
}

function GetVerticalRelation(element, other) {
  if ( ( element.y - other.y ) > ( element.h / 2 + other.h / 2 )) {
    return -1;
  }

  if ( ( other.y - element.y ) > ( element.h / 2 + other.h / 2 )) {
    return 1;
  }

  return 0;
}


// ---------------------------------------------------------------------------

var entities = [];

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
        entities.push(new Block(x, y+3, rainbow[y]));
    }
}

var ball = new Ball();
var bat = new Bat();

entities.push(bat);
entities.push(ball);

var animate = function () {

    context.fillStyle = "rgba(0, 0, 0, 0.25)";
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
                              // console.log(element.isa + " " + other.isa);
                                element.Collided(other);
                                other.Collided(element);
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
