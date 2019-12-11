
class Pacman {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.direccion = 0;
        this.radius=16;//la mitad de ls 32 px de las imagenes
        this.f=0;
       
        this.show = function (f) {
           // let f = this.vx < 0 ? pacmanDImg : pacmanIImg;
           if(f===0){
            image(pacmanDImg, this.x , this.y , 32 , 32); //, 32*this.frame++ , 32*this.direction  ,32  , 32); // cargas imagen,para que eliga cual va a ser a la derecha, para saber a que direccion se dirige, tamaño de la imagen
            //this.frame = (this.frame === 5) ?0 : this.frame;
           }
           if(f===2){
                image(pacmanIImg, this.x , this.y , 32 , 32); //, 32*this.frame++ , 32*this.direction  ,32  , 32); // cargas imagen,para que eliga cual va a ser a la derecha, para saber a que direccion se dirige, tamaño de la imagen
                //this.frame = (this.frame === 5) ?0 : this.frame;
           }
            
        };
        this.move=function(d){
            this.direccion=d;
            if(this.direccion===0){
                this.x+=32;
            }
            if(this.direccion===1){
                this.y+=32;
            }
            if(this.direccion===2){
                this.x-=32;
            }
            if(this.direccion===3){
                this.y-=32;
            }
            //funcion para evitar que se salgan de la pantalla
        if(this.x<0)
        this.x=width - 32;
    if(this.x>=width)
        this.x=0;
        }

        this.eat=function(comida){
            var dis=dist(this.x,this.y,comida.x,comida.y);//nos da la distancia entre el objeto x,y y contra quien quiero saber si colisiona
            if(dis<this.radius + comida.radius)
            return true;
        return false;
        }

        this.colission=function(enemy){
            var dis=dist(this.x,this.y,enemy.x,enemy.y);//nos da la distancia entre el objeto x,y y contra quien quiero saber si colisiona
            if(dis<this.radius + enemy.radius)
            return true;
        return false;
        }
    }

    
}
