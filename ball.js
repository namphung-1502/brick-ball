class Ball extends GameObject {
    constructor(context, x, y, vx, vy, color, rad) {
        super(context, x, y, vx, vy, color)
        this.w = 50;
        this.h = 50;
        this.rad = rad;

    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        this.context.fillStyle = this.color;
        this.context.fill();
    }
    update(secondsPassed) {
        this.x += this.vx * secondsPassed * speed;
        this.y += this.vy * secondsPassed * speed;
    }
    clearCanvas() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }
}