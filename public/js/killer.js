  // This is th class or object of the sperm
  var Killer = function(initPack){
    var self = {};
    self.id = initPack.id;
    self.location = createVector(initPack.location.x, initPack.location.y, -1);
    self.r = 10;
    self.rD2 = self.r/2;
    self.hited = false;
    self.angle = random(3.14) + 0.1;
    // everything related to drawing
    self.draw = function(playerLocation) {
      if(dist(playerLocation.x, playerLocation.y, self.location.x, self.location.y) > 500) { //Magic Number!
        return;
      }
      if(self.hited === true) {
        return;
      }
      secondRendered.rectMode(CENTER);
      secondRendered.translate(self.location.x, self.location.y, self.location.z);
      secondRendered.noStroke();
      secondRendered.rotate(self.angle);
      secondRendered.ambientMaterial(255, 89, 28,255);
      // secondRendered.box(self.r, self.r);
      secondRendered.torus(self.rD2, 3, 3, 5);
    }
  
    Killer.list[self.id] = self; // adds itself to the list
    return self;
  }
  Killer.list = {};