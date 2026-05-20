//DRAGGABLE IMAGE CLASS-----------------------------------------------------------------------------
class DraggableImage {
  constructor(img, x, y, rotation) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = img.width * 1.3;
    this.h = img.height * 1.3;
    this.rotation = rotation;
    
    // Floating movement properties
    this.vx = random(-1, 1); // Horizontal speed
    this.vy = random(-1, 1); // Vertical speed
    
    this.dragging = false;
    this.hover = false;
    this.offsetX = 0;
    this.offsetY = 0;

    this.currentScale = 1.0; // The scale currently being rendered
    this.targetScale = 1.0;  // The scale we want to reach
  }

  update() {
  // 1.check if hover
  if (mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2 &&
    mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
    this.hover = true;
    this.targetScale = 1.15;
  } else {
    this.hover = false;
    this.targetScale = 1.0;
  }

  // 2. scale transition
  //lerp(start, end, amount)
  this.currentScale = lerp(this.currentScale, this.targetScale, 0.1);

  // 3.handle float & drag
  if (this.dragging) {
    this.x = mouseX + this.offsetX;
    this.y = mouseY + this.offsetY;
  } else {
    this.x += this.vx;
    this.y += this.vy;
    
    //bounce back when reach the screen edge
    if (this.x < this.w / 2 || this.x > width - this.w / 2) this.vx *= -1;
    if (this.y < this.h / 2 || this.y > height - this.h / 2) this.vy *= -1;
  }
}

display() {
  push();
  translate(this.x, this.y);
  rotate(this.rotation);
  
  //lerping size
  image(this.img, 0, 0, this.w * this.currentScale, this.h * this.currentScale);
  pop();
}

  pressed() {
    if (this.hover) {
      this.dragging = true;
      //calculate offset so image doesn't snap its center to the mouse
      //this method is made by Gemini
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    this.dragging = false;
  }
}