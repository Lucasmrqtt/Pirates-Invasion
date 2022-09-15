class Boats {
    constructor(x,y,w,h,boatPos){
        this.w = w
        this.h = h
        this.boatPos = boatPos
        this.Img = loadImage ('./assets/boat.png')
        this.body = Bodies.rectangle(x,y,w,h)
        World.add (world, this.body)
    }

    display(){
        var angle = this.body.angle
        var pos = this.body.position
        push()
        translate(pos.x,pos.y)
        rotate(this.angle)
        imageMode(CENTER)
        image(this.Img,0,this.boatPos,this.w,this.h)
        pop()
    }

    removeBoats(i){

        setTimeout(() => {
            World.remove(world,boats[i].body)
            delete boats [i]
        }, 2000);
    }


}