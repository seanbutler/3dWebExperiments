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
        this.x =    Math.random() * width;
        this.y = Math.random() * height;
        this.speed = 10.0;
        this.dx =   0; // (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.dy =   ( this.speed * Math.random() ) + ( this.speed * Math.random() );
        this.color = "rgb(" + Math.random()*255 + ", " + Math.random()*255 + ", " + Math.random()*255 + ")";
        this.size = 4;
    }

    this.reset = function() {
        this.init();
        this.y =    0;
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

function Ball() {

    this.init = function() {
        this.x = width / 2;
        this.y = height / 2;
        this.speed = 20.0;
        this.dx = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.dy = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.color = "green";
        this.size = 32;
    }

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;

        if ((Math.abs(this.x)>width-32) || (Math.abs(this.x)<32))
        {
            this.dx *= -1;
        }

        if ((Math.abs(this.y)>height-32) || (Math.abs(this.y)<32))
        {
            this.dy *= -1;
        }
    }

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        context.fill();
    }

    this.set_bat = function (bat) {
        this.bat = bat;
    }

    this.init();
}

// ---------------------------------------------------------------------------


function Bat() {

    this.init = function(ball) {
        this.x = width / 2;
        this.y = height * 0.9;
        this.speed = 20.0;
        this.dx = 0;
        this.dy = 0;
        this.color = "green";
        this.width = 128;
        this.height = 32;
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
        context.rect(this.x-this.width/2, this.y, this.width, this.height);
        context.fill();
    }

    this.set_ball = function(ball) {
        this.ball = ball;
    }

    this.init();

}


// ---------------------------------------------------------------------------
