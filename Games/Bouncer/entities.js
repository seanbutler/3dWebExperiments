

// ---------------------------------------------------------------------------

function Ball() {

    this.init = function() {
        this.x = width / 2;
        this.y = height / 2;
        this.speed = 20.0;
        this.dx = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.dy = (this.speed * Math.random()) - ( this.speed * 0.5 );
        this.color = "white";
        this.size = width/32;
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
