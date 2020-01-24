  // This is th class or object of the sperm
  var Sticky = function(initPack){
    var self = {};
    self.id = initPack.id;
    self.location = createVector(initPack.location.x, initPack.location.y, -1);
    // everything related to drawing
    self.draw = function(playerLocation) {
      if(dist(playerLocation.x, playerLocation.y, self.location.x, self.location.y) > 500) { //Magic Number!
        return;
      }
      secondRendered.translate(self.location.x, self.location.y, self.location.z);
      secondRendered.noStroke();
      secondRendered.ambientMaterial(255,0,0,255);
      secondRendered.model(stickyModel);
    }
  
    Sticky.list[self.id] = self; // adds itself to the list
    return self;
  }
  Sticky.list = {};