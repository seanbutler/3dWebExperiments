
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

function Pulse() {

    this.init = function() {
        this.x = Math.random()*width;
        this.y = Math.random()*height;
        this.color = "rgb(" + Math.random()*128 + ", " + Math.random()*128 + ", " + Math.random()*128 + ")";
        this.size = width/4 +  Math.random()*width/4;
    }

    this.update = function () {
        this.size *= 0.99;
    }

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        // context.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        context.ellipse(this.x,
                        this.y,
                        this.size,
                        this.size,
                        0,
                        8,
                        1);
        context.fill();
    }

    this.init();
}

// ---------------------------------------------------------------------------

function Boing() {

    this.init = function() {
        this.x = width / 2;
        this.y = height / 2;
        this.speed = 20.0;
        this.dx = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.dy = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.color = "rgb(" + 128+Math.random()*128 + ", " + Math.random()*128 + ", " + Math.random()*128 + ")";
        this.size = width/32 +  Math.random()*width/32;
    }

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;

        if ((Math.abs(this.x)>width-(this.size/2)) || (Math.abs(this.x)<this.size/2))
        {
            this.dx *= -1;
        }

        if ((Math.abs(this.y)>height-this.size/2) || (Math.abs(this.y)<this.size/2))
        {
            this.dy *= -1;
        }
    }

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        // context.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        context.ellipse(this.x - this.size/2,
                        this.y - this.size/2,
                        this.size,
                        this.size,
                        0,
                        8,
                        1);
        context.fill();
    }

    this.init();
}

// ---------------------------------------------------------------------------

function Star() {

    this.init = function() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = 10.0;
        this.dx = 0;
        // this.dx = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.dy = ( this.speed * Math.random() ) + ( this.speed * Math.random() );
        this.color = "rgb(" + Math.random()*255 + ", " + Math.random()*255 + ", " + Math.random()*255 + ")";
        this.size = width/256;
    }

    this.reset = function() {
        this.init();
        this.y = 0;
    }

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;

        if ((Math.abs(this.x)>width) || (Math.abs(this.y)>height))
        {
            this.reset()
        }
    }

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.rect(this.x, this.y, this.size, this.size);
        context.fill();
    }

    this.init();
}

// ---------------------------------------------------------------------------

var entities = []

// ---------------------------------------------------------------------------

var animate = function () {

    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, width, height);

    requestAnimationFrame(animate);

    entities.forEach(function(entity) {
        entity.update();
        entity.draw();
    });
};

// ---------------------------------------------------------------------------

animate();
