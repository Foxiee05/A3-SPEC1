// *******************************************
// ***********INITIALIZATION*******************
// ********************************************

//COLORS INIT-----------------------------------
let white = "#F7F7F7";
let black = "#232323";
let pink = "#FE98DF";
let brown = "#B95C04";
let yellow = "#FFDB2E";
let skin = "#FEED93";
let red = "#E43812";
let green = "#7ECF44";
let blue = "#35A8FF";
let darkBlue = "#0A0FA5";
let purple = "#A63EDF";
let darkPurple = "#98157B";
let darkGreen = "#263717";

//IMAGES INIT-----------------------------------
let images = [];
let scatteredImages = []; 

let backgroundImg;

//STATIC SHAPE POINTS---------------------------------------
let staticShapePoints = [];
let randomColors = [];




// *******************************************
// ***********PRELOAD*******************
// ********************************************
function preload() {
  for (let i = 0; i < 15; i++) { //dragging 15 images
    images.push(loadImage(`web-assets/landing-${i + 1}.png`));
  }

  //background image
  backgroundImg = loadImage('web-assets/landing-BG.png');
}



// *******************************************
// ***********SETUP*******************
// ********************************************

function setup() {
  //select home section
  const container = document.getElementById('home');
  
  //create canvas based on the home section size
  let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  
  //move the canvas into landing-p5 div
  canvas.parent('landing-p5'); 

  imageMode(CENTER); 
  



  //determine how many images to show based on screen width
  let imageCount;
  if (width < 600) {
    imageCount = 3; // Phone resolution
  } 
  else if (width < 1024) {
    imageCount = 5; // Tablet resolution
  }
  else {
    imageCount = 10; // Desktop
  }

  //build the array using that count
  scatteredImages = buildArray(imageCount, () => {
    let imgIdx = randomInteger(0, 14); //
    return new DraggableImage(
      images[imgIdx],
      randomInteger(100, width - 100), // x
      randomInteger(100, height - 100), // y
      random(TWO_PI) // random rotation
    );
  });

  




  //create points for the center shape
  //Gemini helped me with the math for the points randomness
  let centerX = width / 2;
  let centerY = height / 2;
  let baseSize;

  if (windowWidth < windowHeight) {
    baseSize = windowHeight / 2.8;
  }
  else {
    baseSize = windowWidth / 2.8;
  }

  for (let a = 0; a < TWO_PI; a += 0.1) {
    let offset = random(-baseSize / 2, baseSize / 2);
    let r = baseSize + offset;
    let x = centerX + r * cos(a);
    let y = centerY + r * sin(a);
    
    //store the calculated point
    staticShapePoints.push({x: x, y: y});
  }

  randomColors.push(random([ yellow, green, blue, white, skin]));
}




// *******************************************
// ***********DRAW*******************
// ********************************************
function draw() {
  background(white);


  //BACKGROUND IMAGE------------------------------------------------------------------------------------
  // 1.calculate the ratios
  let imgRatio = backgroundImg.width / backgroundImg.height;
  let canvasRatio = width / height;
  
  let renderW, renderH;

  if (canvasRatio > imgRatio) {
    //canvas is wider than the image aspect ratio
    renderW = width;
    renderH = width / imgRatio;
  } else {
    //canvas is taller than the image aspect ratio
    renderW = height * imgRatio;
    renderH = height;
  }

  // 2.draw the background image centered
  image(backgroundImg, width / 2, height / 2, renderW, renderH);






  //CENTER SHAPE------------------------------------------------------------------------------------
  fill(randomColors[randomColors.length - 1]);
  beginShape();
  for (let p of staticShapePoints) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);

  


  //SCATTERED IMAGES------------------------------------------------------------------------------------
  scatteredImages.forEach(img => {
    img.update();
    img.display();
  });
}