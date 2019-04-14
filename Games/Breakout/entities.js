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

    // console.log("Block(" + this.x + " " + this.y + ")\n");

    // this.color = "rgb(" + Math.random()*255 + ", " + Math.random()*255 + ", " + Math.random()*255 + ")";
    this.color = colour;

    this.update = function () {
        if ( this.x + this.w > ball.x - (ball.size/2) ) {
            if ( this.x < ball.x + (ball.size/2) ) {
                if ( this.y + this.h > ball.y - (ball.size/2) ) {
                    if ( this.y < ball.y + (ball.size/2) ) {
                        this.exists = false;
                    }
                }
            }
        }
    }

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.rect(this.x, this.y, this.w, this.h);
        context.fill();
    }

}


// ---------------------------------------------------------------------------

function Ball() {

    this.init = function() {
        this.exists = true;

        this.x = width / 2;
        this.y = height / 2;
        this.speed = 20.0;
        this.dx = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.dy = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.color = "white";
        this.size = width/48;
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
        context.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        context.fill();
    }

    this.init();
}

// ---------------------------------------------------------------------------


function Bat() {

    this.init = function() {
        this.exists = true;
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

    this.init();
}


// ---------------------------------------------------------------------------
