// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
  // This is th class or object of the sperm
  var Hammer = function(initPack){
    var self = {};
    self.id = initPack.id;
    self.location = createVector(initPack.location.x, initPack.location.y, -1);
    self.width = initPack.width;
    // everything related to drawing
    self.draw = function(playerLocation) {
      if(dist(playerLocation.x, playerLocation.y, self.location.x, self.location.y) > 500) { //Magic Number!
        return;
      }
      secondRendered.translate(self.location.x, self.location.y, self.location.z);
      secondRendered.fill(232, 116, 143);
      secondRendered.rotateZ(PI/2);
      // secondRendered.box(self.width, 10);
      secondRendered.cylinder(5, self.width, 10, 10);
      // secondRendered.ellipsoid(self.width/2, 6, 6, 20, 20);
    }
  
    Hammer.list[self.id] = self; // adds itself to the list
    return self;
  }
  Hammer.list = {};
