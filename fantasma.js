/*class Fantasma {
    constructor(x, y) {
        this.x = x;
        this.z = y;
        this.direccion = 0;
        this.radius=16;//la mitad de ls 32 px de las imagenes
       // this.img=img;
       
        this.show = function () {
        
                //image(greenGhostImg , this.x , this.y , 32 , 32);
                image(greenGhostImg,0,0,32,32,this.x,this.y,32,32);

            
           // console.log("si");
        };
        //this.move=function(d){
            
       //}

        
    }

    
}
*/
class Fantasma {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.radius = 16;
        this.z = 0;
        this.img = img;
        this.direccion = 0;
        this.movement = true;
        this.direccion = 0;
        this.isweak = false;
        this.show = function () {
            if (this.isweak === false) {
                image(img, this.x, this.y, 32, 32);
                //console.log("5");
            }
            else {
                image(weakGhost, this.x, this.y, 32, 32);
            }
        };
        this.move = function (bricks) {
            if (this.movement === false) {
                var d = floor(random(4));
                this.direccion = d;
            }
            var lastx = this.x;
            var lasty = this.y;
            if (this.direccion === 0) {
                this.x += 32;
            }
            if (this.direccion === 1) {
                this.y += 32;
            }
            if (this.direccion === 2) {
                this.x -= 32;
            }
            if (this.direccion === 3) {
                this.y -= 32;
            }
            for (var i = 0; i < bricks.length; i++) {
                if (this.colission(bricks[i])) {
                    this.x = lastx;
                    this.y = lasty;
                    this.movement = false;
                    this.move(bricks);
                }
                else {
                    this.movement = true; //hacemos que no cambie su direccion hasta que choque con algo
                }
            }
            //funcion para evitar que se salgan de la pantalla
            if (this.x < 0)
                this.x = width - 32;
            if (this.x >= width)
                this.x = 0;
        };

        this.colission = function (roca) {
            var dis = dist(this.x, this.y, roca.x, roca.y); //nos da la distancia entre el objeto x,y y contra quien quiero saber si colisiona
            if (dis < this.radius + roca.radius)
                return true;
            return false;
        };
        
        this.salir = function (p) {
            if (p.plataform[this.y / 32 - 2][this.x / 32] === 'd')
                this.y -= 64;
            if (p.plataform[this.y / 32 - 3][this.x / 32] === 'd')
                this.y -= 96;
        };

        this.eat = function (comida) {
            var dis = dist(this.x, this.y, comida.x, comida.y); //nos da la distancia entre el objeto x,y y contra quien quiero saber si colisiona
            if (dis < this.radius + comida.radius)
                return true;
            return false;
        };
    }
}

