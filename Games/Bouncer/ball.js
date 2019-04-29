

// ---------------------------------------------------------------------------

function Ball() {

    this.init = function() {
        this.x = width * Math.random();
        this.y = height * Math.random();
        this.speed = 20.0;
        this.dx = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.dy = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.color = "orange";
        this.radius = width/16;
    }

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;

        if ((Math.abs(this.x)>width-(this.radius)) || (Math.abs(this.x)<this.radius))
        {
            this.dx *= -1;
        }

        if ((Math.abs(this.y)>height-this.radius) || (Math.abs(this.y)<this.radius))
        {
            this.dy *= -1;
        }
    }

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI, 0);
        context.fill();
    }

    this.init();
}

// ---------------------------------------------------------------------------
