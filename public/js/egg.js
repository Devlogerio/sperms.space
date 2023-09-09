// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
  // This is th class or object of the sperm
  var Egg = function(initPack){
    var self = {};
    self.id = initPack.id;
    self.location = createVector(initPack.location.x, initPack.location.y, 0);
    self.r = initPack.r;
    self.r2 =  self.r*1.5;
    self.r3 =  self.r*2;
    self.angleX = 0;
    self.angleY = 0;
    self.angleZ = 0;
    self.speedAngleX = 0.01;
    self.speedAngleY = 0.015;
    self.speedAngleZ = 0.02;
    // everything related to drawing
    self.draw = function(playerLocation) {
      if(dist(playerLocation.x, playerLocation.y, self.location.x, self.location.y) > 500) { //Magic Number!
        return;
      }
      secondRendered.translate(self.location.x, self.location.y, self.location.z);
      secondRendered.rotateX(self.angleX);
      secondRendered.noStroke();
      secondRendered.fill(255, 208, 0,255);
      secondRendered.sphere(self.r, 7, 7);
      // secondRendered.scale(18);
      // secondRendered.model(eggModel);
      secondRendered.rotateY(-self.angleY);
      secondRendered.fill(245, 212, 66,10);
      secondRendered.sphere(self.r2, 9, 9);
      // secondRendered.scale(0.5);
      // secondRendered.model(eggModel);
      secondRendered.rotateZ(self.angleZ);
      secondRendered.fill(245, 212, 66,5);
      secondRendered.sphere(self.r3, 9, 9);

      // Circling
      self.angleX += self.speedAngleX;
      self.angleY += self.speedAngleY;
      self.angleZ += self.speedAngleZ;
      if(self.angleX > PI || self.angleX < 0) {
        self.speedAngleX = -self.speedAngleX;
      }
      if(self.angleY > PI || self.angleY < 0) {
        self.speedAngleY = -self.speedAngleY;
      }
      if(self.angleZ > PI || self.angleZ < 0) {
        self.speedAngleZ = -self.speedAngleZ;
      }
    }
  
    Egg.theEgg = self; // adds itself to the list
    return self;
  }
  Egg.theEgg = {};
