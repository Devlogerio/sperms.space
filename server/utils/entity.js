// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
const Victor = require('victor');
const {limitVector} = require('./functions');

// This is the mother class of all entities and live objects in the game
class Entity {
    constructor () {
        this.id = '';
        this.room = '';
        this.isMoving = false;
        this.vaginaPushBack = 1.5; // 1.1
        this.mass = new Victor(1,1);
        this.location = new Victor(0,0);
        this.velocity = new Victor(0,0);
        this.acceleration = new Victor(0,0);
        this.deAcceleration = new Victor(0.8,0.8);
        this.velocityMinLimit = 0.2;
        this.velocityMaxLimit = 5;
        this.forceLimit = 1;//0.3;
    }
    // what will happen every frame equally to everyone specially updating speed of moving objects if the object is static so we need to overwrite it in the child
    update() {
        if (this.isMoving === false){
            this.velocity.multiply(this.deAcceleration); // we divid the velocity so it slowes down
            if(this.velocity.length < this.velocityMinLimit) { // if too slow
                this.velocity = multiply(new Victor(0,0)); // stop
            }
        }
        this.velocity.add(this.acceleration);
        this.velocity = limitVector(this.velocity, this.velocityMaxLimit); // limiting the maximum speed
        
        this.location.add(this.velocity); // make it move
        this.acceleration = new Victor(0,0); // if we dont set acceleration back to 0 then we will be dealing with soo small or soo big numbers
    }
    // this will make the acceleration it can be used for accelerating toward multiple directions, this function is not called each frame and its just an ability
    applyForce (force){
        force.divide(this.mass); // acceleration is going to be affected by the mass of object
        this.acceleration.add(force);
    }
}

module.exports = {Entity};
