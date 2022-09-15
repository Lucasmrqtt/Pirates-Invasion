class Cannon_ball {
    constructor(x,y){
        var options = {isStatic : true}
        this.tragectory = []
        this.r = 30
        this.Img = loadImage ('./assets/cannonball.png')
        this.body = Bodies.circle(x,y,this.r,options)
        World.add (world, this.body )
    }

    shoot(){
        var newAngle = cannon.angle-28
        newAngle = newAngle*(3.14/180)
        var velocity = p5.Vector.fromAngle(newAngle)
        velocity.mult(0.3)
        Matter.Body.setStatic (this.body, false)
        Matter.Body.setVelocity (this.body,{
            x:velocity.x*(180/3.14), 
            y:velocity.y*(180/3.14)
        })
    }

    display(){
        var pos = this.body.position;
        push();
        imageMode(CENTER)
        image (this.Img,pos.x,pos.y,this.r,this.r)
        pop();
        if (this.body.velocity.x > 0 && this.body.position.x > 250) {
            var position = [this.body.position.x, this.body.position.y]
            this.tragectory.push(position)
        }
        for (let i = 0; i < this.tragectory.length; i++) {
            image(this.Img,this.tragectory[i][0],this.tragectory[i][1],5,5)
        }
    }

    removeBalls(index){

        Matter.Body.setVelocity(this.body,{x:0,y:0})
        setTimeout(() => {
            World.remove(world,this.body)
            delete cannonBalls [index]
        }, 1000);
    }
}