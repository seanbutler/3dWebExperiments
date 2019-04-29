// ---------------------------------------------------------------------------

documentKeyDown = function(event) {
    var keyCode = event.keyCode;
    keyboardService.keys[keyCode]=true;
    // console.log("Down")
};

documentKeyUp = function(event) {
    var keyCode = event.keyCode;
    keyboardService.keys[keyCode]=false;
    // console.log("Up")
};

function KeyboardService() {
    this.keys=[];
    this.IsKeyDown = function(keyCode) {
        return this.keys[keyCode];
    };
};

keyboardService = new KeyboardService();
document.addEventListener("keydown", documentKeyDown, false);
document.addEventListener("keyup", documentKeyUp, false);

// ---------------------------------------------------------------------------

function Star() {

    this.init = function() {
        this.exists = true;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = 10.0;
        this.dx = 0; // (this.speed * Math.random()) - ( this.speed * 0.5 );
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

function Block(x, y, colour) {
    this.exists = true;

    this.w = width / 10.0;
    this.h = height / 20.0;
    this.x = x * this.w;
    this.y = y * this.h;

    this.isa = "Block";
    this.isCollidable = true;

    this.color = colour;

    this.update = function () {
    }

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.rect(this.x-this.w, this.y-this.h, this.w, this.h);
        context.fill();
    }

    this.Collided = function(other) {
        console.log(Date.now() + " " + this.isa + " Collided");
        this.exists = false;
    }

}

// ---------------------------------------------------------------------------

function Ball() {

    this.init = function() {
        this.exists = true;

        this.x = width / 2;
        this.y = height / 2;
        this.w = width/48;
        this.h = height/48;

        this.speed = 20.0;
        this.dx = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.dy = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.color = "white";
        this.size = width/48;
        this.isa = "Ball";
        this.isCollidable = true;
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
        context.rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        context.fill();
    }

    this.Collided = function(other) {
        console.log(Date.now() + " " + this.isa + " Collided");
    }

    this.init();
}

// ---------------------------------------------------------------------------

function Bat() {

    this.init = function() {
        this.exists = true;
        this.x = width / 2;
        this.y = height * 0.9;
        this.w = width * 0.2;
        this.h = height * 0.03;

        this.speed = 20.0;
        this.dx = 0;
        this.dy = 0;

        this.color = "green";
        this.isa = "Bat";
        this.isCollidable = true;
    }

    this.update = function () {

        if ( keyboardService.IsKeyDown(65) ) {
            this.x -= 8;
        }

        if ( keyboardService.IsKeyDown(68) ) {
            this.x += 8;
        }
    }

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
        context.fill();
    }

    this.Collided = function(other) {
        console.log(Date.now() + " " + this.isa + "Collided");
        // this.color = "red"
    }

    this.init();
}


// ---------------------------------------------------------------------------
