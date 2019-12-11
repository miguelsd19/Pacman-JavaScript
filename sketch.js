//creamos nuestra variable para imprmir el mapa
var num=4;
var rocaImg;
var roca;
var comidaImg;
var plat;
var rocas=[];//donde estan las rocas del juego
var comidas=[];
var powerimg;
var powerups=[];
var pacmanDImg;
var pacmanIImg;
var pacman;
var ghosts=[];
var Activeghosts=[];
//imagenes de fantasmas
var redGhostImg;
var greenGhostImg;
var pinkGhostImg;
var purpleGhostImg;
var weakGhost;
//fantasmas
var redGhost;
var greenGhost;
var pinkGhost;
var purpleGhost;

var activeGhost= [];
var q=0;
var song;
var song2;
var song3;
var song4;
var r=0;
var num1=0
var num2=0;

var pila=['z'];
var cadena=[];
//cargamos las imagenes
function preload(){
  rocaImg=loadImage("images/roca.bmp");
  comidaImg=loadImage("images/food.png");
  powerImg=loadImage("images/grape.png");
  pacmanDImg=loadImage("images/carly.png");
  pacmanIImg=loadImage("images/carly2.png");
  redGhostImg=loadImage("images/redd.png");
  greenGhostImg=loadImage("images/greenn.png");
  pinkGhostImg=loadImage("images/pinkk.png");
  purpleGhostImg=loadImage("images/purplee.png");
  weakGhost=loadImage("images/wea.png");
  song= loadSound("music/int.mp3");
  song2=loadSound("music/over.wav");
  song3=loadSound("music/eat.wav");
  song4=loadSound("music/weak.wav");
}
//-----------------------------------------------------------------------------------------
function setup(){
  createCanvas(800,700);
  
  roca=new Roca(200,300);
  plat=new Plataforma(21,25);

  for(var i = 0; i < plat.getRows(); i++)
      for(var j = 0; j < plat.getColumns(); j++){
          if(plat.getElement(i,j) === '*')
              rocas.push(new Roca(j*32,i*32));
          else if(plat.getElement(i,j) === '-')
              comidas.push(new Comida(j*32,i*32));
          else if(plat.getElement(i,j) === 'o')
              powerups.push(new Powerup(j*32,i*32));
          else if(plat.getElement(i,j) === 'p')
              pacman = new Pacman(j*32,i*32);
          else if(plat.getElement(i,j) === 'r')
              ghosts.push(new Fantasma(j*32,i*32,redGhostImg));
          else if(plat.getElement(i,j) === 'i')
              ghosts.push(new Fantasma(j*32,i*32,pinkGhostImg));
          else if(plat.getElement(i,j) === 'g')
              ghosts.push(new Fantasma(j*32,i*32,greenGhostImg));
          else if(plat.getElement(i,j) === 'u')
              ghosts.push(new Fantasma(j*32,i*32,purpleGhostImg));
          
      }

   if(song.isPlaying()){

   }else{
    OutFantasmas();
   }
    
}

//------------------------------------------------------------------------------------------

function draw(){
  if(q===0){
    song.play();
    q=1;
  }
  
  background(0);
  for(var i=0; i<rocas.length; i++)
    rocas[i].show();

  for(var i=0; i<comidas.length; i++)
    comidas[i].show();

  for(var i=0; i<powerups.length; i++){
    powerups[i].show();   // uvas
  }

 // if(r===0){
    pacman.show(0);
 // }
  //keyPressed();
  //pacman.show(0);

  for(var i = 0; i < ghosts.length; i++){
    ghosts[i].show();
    //console.log(i);
  }

  for(var i=0; i<comidas.length; i++){
    if(pacman.eat(comidas[i])){
      song3.stop();
      comidas.splice(i,1);//eliminamos las colisiones
      song3.play();
    }
  }


  for(var i = 0; i < activeGhost.length; i++){
    frameRate(10); //le bajamos los fps para que no vayan tan rapido
    activeGhost[i].show();
    activeGhost[i].move(rocas);
    if(pacman.colission(activeGhost[i])){
      if(activeGhost[i].isweak === true){
       
        ghosts.push(new Fantasma(32*12,32*10,activeGhost[i].img));
        activeGhost.splice(i,1);
        makeGhostStrong();
        //activeGhost[i].isweak=false;
      }
      else{
        song2.play();
        cadena.push("c");
        alert("GAME OVER -> CADENA NO ACEPTADA ");
        window.location.reload();
      }
    
    }
    //console.log(i);
  }

  for(var i=0; i<powerups.length; i++){
    if(pacman.eat(powerups[i])){
      Weak();
      powerups.splice(i,1); //se come la fruta
      song4.play();
      if(cadena.length===0){
        cadena.push("b");
        pila.push("1");
      }
      else if(cadena.length === 3){
        cadena.push("b");
        pila.splice(0,1,0);
      }
      else {
        cadena.push("b");
      }
      
      num1=num1+1;
    }
  }

  automata();
  checkWin();
}

//-------------------------------------------------------------------------------

function Weak(){
  for(var i=0;i<activeGhost.length;i++){
    activeGhost[i].isweak=true;
  }
}

function OutFantasmas(){
  if (ghosts.length>0){
    var g=ghosts.pop();
    g.salir(plat);
    activeGhost.push(g);
  }
  
  setTimeout(OutFantasmas,10000);
}

function keyPressed(){
  /*if(r===0){
    pacman.show(0);
    r=1;
  }*/
  
  if(keyCode==RIGHT_ARROW){
    if(plat.plataform[pacman.y/32][pacman.x/32 + 1] !=='*')
    pacman.move(0);
    pacman.show(0);
    r=1;
  }
  if(keyCode==DOWN_ARROW){
    if(plat.plataform[pacman.y/32 + 1][pacman.x/32] !=='*')
    pacman.move(1);
    if(r===1){
      pacman.show(0);
      r=1;
    }else{
      pacman.show(2);
      r=2;
    }
    
  }
  if(keyCode==LEFT_ARROW){
    if(plat.plataform[pacman.y/32][pacman.x/32 - 1] !=='*')
    pacman.move(2);
    pacman.show(2);
    r=2;
  }
  if(keyCode==UP_ARROW){
    if(plat.plataform[pacman.y/32 - 1][pacman.x/32] !=='*')
    pacman.move(3);
    if(r===1){
      pacman.show(0);
      r=1;
    }else{
      pacman.show(2);
      r=2;
    }
  }
  
}

function makeGhostStrong(){
  for(var i = 0; i < activeGhost.length; i++)
      activeGhost[i].isWeak = true;
}

function checkWin(){
 // print(comidas.length);
  if(comidas.length === 0){
    cadena.push("a");//leemos la letra a
    pila.splice(0,0,'0');// borramos la z de la pila
    num1=num1+1;
    alert("Ganaste -> Cadena aceptada");
    window.location.reload();
    
  }
}

function automata(){
  if(num1 === num2){
    console.log("estado q",cadena.length);
    console.log("cadena leida: ");
    
    for(var i=0;i<cadena.length;i++){
    console.log(cadena[i]);

  }
  console.log("simbolo en la pila: ");
  for(var i=0;i<pila.length;i++){
    console.log(pila[i]);
  }
  num2=num2+1;

  
}
}