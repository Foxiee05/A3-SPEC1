//INSTRUCTION BUTTON---------------------------------------------------------------------
class InstructionButton {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;

    // original image size
    this.w = img.width;
    this.h = img.height;
  }

  display() {

    push();

    // scale 10% bigger on hover
    if (this.isHovering()) {

      translate(this.x + this.w / 2, this.y + this.h / 2);

      scale(1.1);

      imageMode(CENTER);
      image(this.img, 0, 0);

    } else {

      imageMode(CORNER);
      image(this.img, this.x, this.y);
    }

    pop();
  }

  isHovering() {
    return (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    );
  }

  checkClick(mx, my) {
    if (
      mx > this.x &&
      mx < this.x + this.w &&
      my > this.y &&
      my < this.y + this.h
    ) {
      showInstructions = !showInstructions;
    }
  }
}

class NextButton {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;

    // original image size
    this.w = img.width;
    this.h = img.height;
  }

  display() {

    push();

    // scale 10% bigger on hover
    if (this.isHovering()) {

      translate(this.x + this.w / 2, this.y + this.h / 2);

      scale(1.1);

      imageMode(CENTER);
      image(this.img, 0, 0);

    } else {

      imageMode(CORNER);
      image(this.img, this.x, this.y);
    }

    pop();
  }


  isHovering() {
    return (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    );
  }
}

//INSTRUCTION BOX---------------------------------------------------------------------
class InstructionBox {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;

    // original image size
    this.w = img.width;
    this.h = img.height;
  }

  display() {

    imageMode(CENTER);

    // draw original-size image
    image(this.img, this.x, this.y);

    imageMode(CORNER);
  }
}



//IMAGE OBJECT---------------------------------------------------------------
class ImageObject {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;

    // original image size
    this.w = img.width;
    this.h = img.height;
  }

  display() {
    image(this.img, this.x, this.y);
  }
}


//TILES-------------------------------------------------------------------
class tilesLayout {
  constructor(x, y, img) {
    this.xPosition = x;
    this.yPosition = y;
    this.img = img;
    this.width = img.width;
    this.height = img.height;
  }

  display() {
    image(this.img, this.xPosition, this.yPosition);
  }
}


//BUSHES LINE -----------------------------------------------------------------------------------
class BushesLine {
  constructor(imgArray, x, y, amount, spacing) {
    this.objects = [];

    for (let i = 0; i < amount; i++) {
      this.objects.push({
        x: x + i * spacing,
        img: random(imgArray)
      });
    }

    this.y = y;
  }

  display() {
    for (let obj of this.objects) {

      // original image size
      image(obj.img, obj.x, this.y);

    }
  }
}




//COLA CANS (FOR RANDOM POS OBJECTS)------------------------------------------------------------------------
class ColaCan {
  constructor(x, y, img) {
    this.homePos = createVector(x, y);
    this.currentPos = createVector(x, y);
    this.vel = createVector(0, 0);

    this.img = img;
    this.angle = 0;
    this.minX = 0;
    this.maxX = 1900;
    this.minY = 500;
    this.maxY = 980;

    this.threshold = 100;

    this.hovered = false;
    this.canPlaySound = true;

    this.opacity = 255;
    this.targetOpacity = 255;

    // optional: random rotation feel
    this.rotationSpeed = random(-0.01, 0.01);
  }

  update() {
    let mousePos = createVector(mouseX, mouseY);
    let distToMouse = p5.Vector.dist(this.currentPos, mousePos);

    if (distToMouse < this.threshold) {
      let away = p5.Vector.sub(this.currentPos, mousePos);
      away.setMag(2);
      this.vel.lerp(away, 0.3);
      this.targetOpacity = 0;
    } else {
      let back = createVector(0, 0);
      this.vel.mult(0);
    }
      


    //opacity change
    this.opacity = lerp(this.opacity, this.targetOpacity, 0.03);

    //velocity add
      this.currentPos.add(this.vel);

    //IMPORTANT: clamp position inside box
    this.currentPos.x = constrain(this.currentPos.x, this.minX, this.maxX);
    this.currentPos.y = constrain(this.currentPos.y, this.minY, this.maxY);

    // optional rotation animation
    this.angle += this.rotationSpeed;
  }
  
  isHovered(mx, my) {
  let d = dist(mx, my, this.currentPos.x, this.currentPos.y);
  return d < 100;
}

  display() {
    push();
    imageMode(CENTER);
    translate(this.currentPos.x, this.currentPos.y);
    rotate(this.angle);
    tint(255, this.opacity);
    image(this.img, 0, 0);
    pop();
  }
}



//BUTTERFLIES --------------------------------------------------------------------------
class Butterfly {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;

    this.angle = random(TWO_PI); // movement direction
    this.speed = random(1, 3); // flying speed
    this.flapOffset = random(1000); // for wing animation
  }

  move() {
    this.angle += random(-0.05, 0.05);

    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  }
  display() {
    push();

    translate(this.x, this.y);

    // wing flapping using sine wave
    let flap = sin(frameCount * 0.2 + this.flapOffset) * 0.3;

    scale(1 + flap, 1 - flap); // wing motion =)))) (bay trong bcuoi zl)

    image(this.img, -this.img.width / 2, -this.img.height / 2);

    pop();
  }
}




//KARAOKE MAN -----------------------------------------------------------------------------------------------------
class InteractiveKaraoke {
  constructor(img1, img2) {
    let zones = [
      { minX: 50, maxX: 450 },
      { minX: 1100, maxX: 1450 }
    ];

    let chosenZone = random(zones);
    // UPPER is creation of 2 zones for x, in case of bald man causes overlapping


    this.x = random(chosenZone.minX, chosenZone.maxX);
    this.y = random(500, 1000);
    
    this.img1 = img1;
    this.img2 = img2;
    
    this.w = img1.width || 100; // Fallback size if image is not yet fully calculated
    this.h = img1.height || 100;
    
    this.isClicked = false;
  }


  isHovering() {
    let dX = abs(mouseX - this.x);
    let dY = abs(mouseY - this.y);
    //since image is drawn centered, hover box expands outward from the center
    return (dX < this.w / 2 && dY < this.h / 2);
  }


display() {
    push();
    imageMode(CENTER);
    

    translate(this.x, this.y);
    
    if (this.isHovering()) {
      scale(1.1);
    }
    
    let activeImg = this.isClicked ? this.img2 : this.img1;
    
    image(activeImg, 0, 0);
    pop();
  }




checkClick(mx, my) {
    // Reuse the hovering logic to determine if it was clicked
    if (this.isHovering()) {
      this.isClicked = true;
      
      if (sounds[5]) sounds[5].setVolume(0);
      if (sounds[6]) sounds[6].setVolume(0);
      if (sounds[8]) sounds[8].setVolume(0);

      
      return true; 
    }
    return false;
  }
}