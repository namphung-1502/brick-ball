class Brick {
    constructor(context, x, y, padding = 10, width = 100, height = 50, setTop = 50, setLeft = 30, isLive = true) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.padding = padding;
        this.width = width;
        this.height = height;
        this.setTop = setTop;
        this.setLeft = setLeft;
        this.isLive = isLive;
        this.brickX = (this.x * (this.width + this.padding)) + this.setLeft;
        this.brickY = (this.y * (this.height + this.padding)) + this.setTop;
    }
    draw() {
        if (this.isLive) {
            this.context.beginPath();
            this.context.rect(this.brickX, this.brickY, this.width, this.height);
            this.context.fillStyle = "#0095DD";
            this.context.fill();
            this.context.closePath();

        }

        this.context.fillStyle = 'black';
        this.context.font = '25px Time New Roman';
        this.context.fillText("FPS: " + Math.round(fps), 800, 30);
    }
    setHide() {
        this.isLive = false;
    }
}