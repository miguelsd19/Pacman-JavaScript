
class Comida {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.radius=16;
        this.show = function () {
            image(comidaImg, this.x, this.y);
        };
    }
}
