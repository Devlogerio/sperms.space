  // This is th class or object of the food
  var Food = function(initPack){
    var self = {};
    self.id = initPack.id;
    self.ate = false;
    self.ate = false;
    self.color = color(random(255), random(255), random(255));
    self.location = createVector(initPack.location.x, initPack.location.y, -1);
    // everything related to drawing
    self.draw = function(playerLocation) {
      if(dist(playerLocation.x, playerLocation.y, self.location.x, self.location.y) > 500) { //Magic Number!
        return;
      }
      if(self.ate === true) {
        return;
      }
      secondRendered.translate(self.location.x, self.location.y, self.location.z);
      secondRendered.noStroke();
      secondRendered.fill(self.color);
      secondRendered.box(2, 2);
    }
  
    Food.list[self.id] = self; // adds itself to the list
    return self;
  }
  Food.list = {};