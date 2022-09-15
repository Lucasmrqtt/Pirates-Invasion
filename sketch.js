const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine, world;

var boat,boats = []
var ground,tower,towerImg;
var bgImg;
var angle = 20
var cannon, cannonBalls = [];

function preload() {
  bgImg = loadImage("./assets/background.gif")
  towerImg = loadImage("./assets/tower.png")

}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode (DEGREES)
  angle = 15

  //criando as opções do soloe da torre
  var options = {
    isStatic:true
  }

  //criando o corpo do solo
  ground = Bodies.rectangle(0,height-1,width*2,1,options)
  //adicionando o corpo ao mundo
  World.add(world,ground)

  //criando a torre
  tower = Bodies.rectangle(160,350,160,310,options)
  World.add(world,tower)

  cannon = new Cannon(180,110,130,100,angle)
  
  textAlign(CENTER,CENTER)
  //imageMode(CENTER)
}


function draw() {
  background(189);
  //criando a imagem do fundo
  image(bgImg,0,0,width,height)
 
  Engine.update(engine);

  //exibindo o solo na tela
  rect(ground.position.x, ground.position.y, width*2,1)

  //exibindo a torre na tela
  push()//inicializa uma nova configuração
  imageMode(CENTER)
  image(towerImg,tower.position.x, tower.position.y,160,310)
  pop() //retorna para a configuração antiga
   
  for (let i = 0; i < cannonBalls.length; i++) {
    showCannonBalls(cannonBalls[i],i)
    colisionWithBoat(i);
  }

  cannon.display();
  showBoats();  

  //posição do mouse
  text(mouseX+" | "+mouseY,mouseX,mouseY)
}

function keyReleased(){
  if (keyCode == DOWN_ARROW || keyCode == 32) {
    cannonBalls[cannonBalls.length-1].shoot();
  }

}

function keyPressed (){
  if (keyCode == DOWN_ARROW || keyCode == 32) {
    var cannonBall = new Cannon_ball (cannon.x,cannon.y)
    cannonBalls.push(cannonBall);
  }

}

function showCannonBalls(ball,i) {
  if (ball) {
    ball.display();
    if (ball.body.position.x >= width) {
      World.remove(world,cannonBalls[i])
      cannonBalls.splice(index,1)
    }
    if (ball.body.position.y >= height-50) {
      ball.removeBalls(i)
    }
  }
}

function showBoats(){
  if (boats.length > 0) {
    if (boats[boats.length-1] == undefined ||boats[boats.length-1].body.position.x <width-300 ) {
      var positions = [-40,-60,-70,-20,-80]
      var position = random (positions)
      var boat = new Boats(width-79,height-60,170,170,position)
    boats.push(boat);
    }
    for (let i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0})
        boats[i].display();
      }
    }

  } else{
    var boat = new Boats(width-79,height-60,170,170,-80)
    boats.push(boat);
  }
}

function colisionWithBoat(index) {
 for (let i = 0; i < boats.length; i++) {
  if (cannonBalls[index]!= undefined && boats[i]!= undefined) {
    var colision = Matter.SAT.collides(cannonBalls[index].body, boats[i].body)
    if (colision.collided ) {
      boats [i].removeBoats(i);
      World.remove(world,cannonBalls[index].body)
      cannonBalls.splice(index,1)
    }
  }
 } 
}