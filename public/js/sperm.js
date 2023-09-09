// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
// 87 meter house in Tehran/ 75 meter house in Karaj/ 250 meter villa in north Iran, 350 mett villa
// we have a rented place for cats as well (petshop, 90 meters)
var Tail = function(length) {
  var self = {};
  self.points = [];
  self.length = length;
  self.pointDistance = 0.5;
  self.location = createVector(-1.4, 0, 0);
  self.waveWidth = 20;
  self.waveHeight = 0.08;
  self.savedSpeed = 100;
  self.savedStopSpeed = 25;
  self.speed = self.savedStopSpeed;
  self.counter = 360;
  self.generatePoints = function () {
      for(var i = 0; i < self.length; i += self.pointDistance) {
          self.points.push(createVector(self.location.x - i, self.location.y, self.location.z));
      }
  }
  self.generatePoints();
  self.update = function(isMoving) {
    if(isMoving === true) {
      self.speed = self.savedSpeed; // when moving 150
    } else {
      self.speed = self.savedStopSpeed; // when stop 50
    }
      self.counter += 1;
      if(self.counter > 360){
          self.counter = 0;
      }
      for(var i in self.points){
        var wave = sin(i * self.waveWidth + self.counter * self.speed) * i * self.waveHeight;
        self.points[i].y = 0.25 +  wave;
      }
  }
  self.draw = function() {
    secondRendered.scale(5);
    secondRendered.strokeWeight(1);
    secondRendered.stroke(255, 255, 255, 255);
    secondRendered.noFill();
    secondRendered.beginShape();
    for(var i in self.points) {
      secondRendered.vertex(self.points[i].x, self.points[i].y + -0.25, self.location.z);
    }
    secondRendered.endShape();
  }
  return self;
}



// This is th class or object of the sperm
var Sperm = function(initPack){
  var self = {};
  self.id = initPack.id;
  self.name = initPack.name;
  self.angle = 0;
  self.isMoving = false;
  self.location = createVector(initPack.location.x, initPack.location.y, -1);
  self.tail = new Tail(6);
  self.isBoosting = false;
  self.howManyAte = 0;
  self.boostNumber = 3;
  self.hp = 100;
  self.isDead = false;
  // everything related to drawing
  self.draw = function(){
    // pointLight(255, 255, 255, self.location.x, self.location.y, self.location.z + 20);
    secondRendered.translate(self.location.x, self.location.y, self.location.z);
    if(self.isBoosting === true) {
      self.tail.savedSpeed = 250;
    } else {
      self.tail.savedSpeed = 100;
    }
    secondRendered.noStroke();
    secondRendered.fill(150, 150, 150, 100);
    secondRendered.rotateZ(self.angle);
    secondRendered.ellipsoid(5, 3, 3, 10);
    secondRendered.translate(-1, 0, 0);
    secondRendered.ellipsoid(3.5, 2, 2, 8);
    secondRendered.translate(-4, 0, 0);
    secondRendered.ellipsoid(3, 1, 1, 6);
    secondRendered.translate(5, 0, 0);
    // secondRendered.model(spermModel);
    self.tail.update(self.isMoving);
    self.tail.draw();

    // // eyes
    // secondRendered.noStroke();
    // secondRendered.fill(0);
    // secondRendered.translate(0.5, 0.3, 0.1);
    // secondRendered.sphere(0.35, 6);
    // secondRendered.translate(0, -0.6, 0);
    // secondRendered.sphere(0.35, 6);

  }

  Sperm.list[self.id] = self; // adds itself to the list
  return self;
}
Sperm.list = {};
