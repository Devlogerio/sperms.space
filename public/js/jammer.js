  // This is th class or object of the sperm
  var Jammer = function(initPack){
    var self = {};
    self.id = initPack.id;
    self.location = createVector(initPack.location.x, initPack.location.y, -1);
    self.r = initPack.r;
    self.rr = self.r * 2;
    self.angle = Math.random() * Math.PI;
    self.angle1 = Math.random() * Math.PI;
    self.angle2 = Math.random() * Math.PI;
    self.color = {r: round(random(255)), g: 0, b: round(random(255))}
    // everything related to drawing
    self.draw = function(playerLocation) {
      if(dist(playerLocation.x, playerLocation.y, self.location.x, self.location.y) > 500) { //Magic Number!
        return;
      }
      secondRendered.translate(self.location.x, self.location.y, self.location.z);
      secondRendered.rotateX(self.angle);
      secondRendered.rotateY(self.angle1);
      secondRendered.rotateZ(self.angle2);
      secondRendered.rectMode(CENTER);
      secondRendered.ambientMaterial(self.color.r,self.color.g,self.color.b,220);
      // secondRendered.model(jammerModel);
      secondRendered.sphere(self.r, 6, 6);
      // secondRendered.ellipseMode(CENTER);
      // secondRendered.sphere(self.rr);
    }
  
    Jammer.list[self.id] = self; // adds itself to the list
    return self;
  }
  Jammer.list = {};