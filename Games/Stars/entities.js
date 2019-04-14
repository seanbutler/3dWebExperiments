// ---------------------------------------------------------------------------

function Star() {

    this.init = function() {
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
