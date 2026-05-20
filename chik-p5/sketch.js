// --------------------------------------------------------------
//---------------GLOBAL VARIABLES ------------------------------
//------------------------------------------------------------
let images = [];
let BGimages = [];

let mainCanvas;

let tilesGround = [];
let cans = [];
let butterflies = [];
let trashObjects = [];
let trashItems = [];

let humanHead = [];
let headEaseImg;

let musicNotes = [];
let noteImages = [];
let neuron = [];
let circles = [];
let sounds = [];
let items = [];
let spiralTiles = [];
let spiralObjects = [];
let bushes = [];
let bushesLine = [];

let colaCans = [];

let karaokeImg1, karaokeImg2;
let interactiveKaraokeObject;

let cansClearedSoundTriggered = false;

//------instruction button
let objects = [];

let box1;
let instructionBtn;
let instructionBox;
let showInstructions = true; // start with instructions shown
let nextBtn;
let instructionImg;
let boxImg;
let boxNormal1;
let boxNormal2;
let boxAnnoyed1;
let boxAnnoyed2;
//------Animation transition
//global variables
let introName = []; 
let introIndex = 0;
let introState = "ANIMATING"; 
let pauseStartTime = 0;
const holdDuration = 1000;

let spawnArea = {
  x: 750,
  y: 210,
  w: 300,
  h: 200
};

//-------sounds
let sound;
let clickSounds = [];
let swipeSound;
let catSound;
let isMuted = false;


//----------can arrays
let canX = buildArray(50, (i) => randomInteger(10, 1920));
let canY = buildArray(50, (i) => randomInteger(10, 1080));

let canWidth = buildArray(50, (i) => randomInteger(200, 500));
let canHeight = buildArray(50, (i) => randomInteger(90, 200));






// --------------------------------------------------------------
//---------------PRELOAD ------------------------------
//------------------------------------------------------------
function preload() {
  //preload sounds
soundFormats('wav');

  for (let i = 1; i < 5; i++) {
    clickSounds[i] = loadSound(`sounds/click-${i}.wav`);
  }
  catSound = [ 
    loadSound('sounds/cat-1.wav'),
    loadSound('sounds/cat-2.wav'),
  ];
  swipeSound = loadSound('sounds/swipe.wav');
  box1 = loadImage("assets/instruction-box/box-1.png");
  BGimages = [loadImage("assets/trees.png")];  
sounds[0] = loadSound("sounds/Sound 1.wav");
sounds[2] = loadSound("sounds/Sound 3.wav");
// sounds cause headache, so I want to use real recordings of noise pollution in the city, which are more relatable and effective in conveying the message.
sounds[4] = loadSound("sounds/Ambient.wav"); 
sounds[5] = loadSound("sounds/karaoke.wav");
sounds[6] = loadSound("sounds/bar.wav");
sounds[7] = loadSound("sounds/drill.wav");
sounds[8] = loadSound("sounds/karaoke-ambience.wav");

//grass textures
grassImages = [
    loadImage("assets/grass-rock-1.png"),
    loadImage("assets/grass-rock-2.png"),
    loadImage("assets/wiggle-grass.png"),
    loadImage("assets/wiggle-grass-1.png"),
  ];
  //trash items that can be thrown into the park, they will be thrown in random positions with random rotation to create a messy look, also to show the variety of trash that can be found in the park and how they affect the environment.
  trashThrownImages = [
    loadImage("assets/cola.png"), 
    loadImage("assets/can-2.png"),
    loadImage("assets/leave-1.png"),
    loadImage("assets/leave-2.png"),
    loadImage("assets/furball.png"),
    loadImage("assets/cut.png"),
    loadImage("assets/giun.png"),
    loadImage("assets/mic.png"),
    loadImage("assets/screw-1.png"),
    loadImage("assets/screw-2.png"),
    loadImage("assets/honker-1.png"),
    loadImage("assets/honker-2.png"),
    loadImage("assets/firework.png"),
    loadImage("assets/fly.png")

  ];
  //butterflies to create the mood weee
  butterfly = [loadImage("assets/butterfly.png")];
  //trash items
  trashImages = [
    loadImage("assets/achair-1.png"),
    loadImage("assets/achair-2.png"),
    loadImage("assets/penguin-trash.png"),
    loadImage("assets/Cat.png"),
    loadImage("assets/dog.png"),
  ];
  //Mr.Nam
  humanHeadImages = [
    loadImage("assets/human-headache.png")
  ];
  //bushes to create a line of bushes in the background.
  bushes = [ 
    loadImage("assets/Bush-1.png"),
    loadImage("assets/Bush-2.png"),
  ];
  //music notes
  musicNoteImages = [
    loadImage("assets/music-note-1.png"),
    loadImage("assets/music-note-2.png"),
    loadImage("assets/music-note-3.png"),
  ];
  //neuron images for the man headache, to show the effect of noise pollution on mental health, also to create a more surreal and artistic look.
  neuronImages = [
    loadImage("assets/neuron-1.png"),
    loadImage("assets/neuron-2.png"),
    loadImage("assets/neuron-3.png"),
    loadImage("assets/neuron-4.png"),
    loadImage("assets/neuron-5.png"),
  ];
  //testing spiral layout for fun, not sure if I will use it in the final version but I like how it looks :D
  spiralTiles = [
     loadImage("assets/tiny-tiles-1.png"),
  ];
   for (let i = 0; i < 15; i++) {
    introName[i] = loadImage(`assets/intro-name-anim-1/park-walk-${i+1}.png`);
  }
  //instruction box and button
  nextBtnImg = loadImage("assets/instruction-box/next-button.png")
  instructionImg = loadImage("assets/instruction-box/instruction-button.png");
  boxImg = loadImage("assets/instruction-box/instruction-box.png");

  boxNormal1 = loadImage("assets/box-cat-1.png");
  boxAnnoyed1 = loadImage("assets/box-cat-2.png");
  boxNormal2 = loadImage("assets/box-dog-1.png");
  boxAnnoyed2 = loadImage("assets/box-dog-2.png");
  



  //KARAOKE MAN---------
  karaokeImg1 = loadImage("assets/karaoke.png");
  karaokeImg2 = loadImage("assets/karaoke-2.png");

  //HEAD EASED-----------
  headEaseImg = loadImage("assets/human-headache-ease.png");

}




// --------------------------------------------------------------
//---------------SETUP ------------------------------
//------------------------------------------------------------

function setup() {
  mainCanvas = createCanvas(1920, 1080);
  scaleToWindow();

 if (sounds[4]) {
    sounds[4].loop();
  }

  if (sounds[8]) {
    sounds[8].loop(); 
  }

 objects.push(
    new ImageObject(1920-box1.width, 0, box1)
  );
  generateneuron();
   for (let i = 0; i < 20; i++) {
    items.push({
      x: random(width),
      y: random(height),
      size: 50,
      played: false // prevent spam
    });
  }
  
instructionBox = new InstructionBox(
    width/2 - 130,
    height/2,
    boxImg
  );
  //instruction button
instructionBtn = new InstructionButton(
    1594, 855,
    instructionImg
  );

  //nextbutton
nextBtn = new NextButton(
    1748, 930,
    nextBtnImg,
  )
  

  
//generate bushes line
bushesLine = new BushesLine(
    bushes, // image
    1,   // start x
    300,   // start y
    4,     // amount
    500     // spacing
  );
  //gennerate grounds
  for (let i = 0; i < 10; i++) {
    tilesGround.push(
      new tilesLayout(
        random(width - 100), 
        random(400, 1080), 
        random(grassImages))
    );
  }
  // generate cola cans
  for (let i = 0; i < 50; i++) {
  colaCans.push(
    new ColaCan(canX[i], canY[i], random(trashThrownImages))
  );
}
  //generate butterflies
  for (let i = 0; i < 5; i++) {
    butterflies.push(
      new Butterfly(random(width), random(height), random(butterfly))
    );
  }
  for (let i = 0; i < 5; i++) {
    trashItems.push({
      x: random(width - 50),
      y: height - 450,
      img: random(trashImages),
    });
  }
  //generate dust 
for (let i = 0; i < 20; i++) {
  circles.push({
    x: random(width),
    y: random(height),
    size: random(2, 20),
    speedX: random(-0.1, 0.1), // slow movement
    speedY: random(-0.3, 0.3),
    offset: random(1000) // for floating effect
  });
}
//generate music notes
for (let i = 0; i < 5; i++) {
  musicNotes.push({
    x: random(width),
    y: random(height),

    img: random(musicNoteImages),

    speedY: random(-0.5, -1.5), // slowly go UP
    swayOffset: random(1000),   // for sine wave
    swayAmount: random(20, 50)  // how wide it sways
  });
}

//karaoke man
interactiveKaraokeObject = new InteractiveKaraoke(karaokeImg1, karaokeImg2);


  //LOADING SCREEN---------------------------------------------------------------
  let loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
}





// --------------------------------------------------------------
//---------------DRAW ------------------------------
//------------------------------------------------------------
function draw() { 

   //INTRO NAME SEQUENCE---------------------------------------------------------
  if (introState !== "FINISHED") {
    background(0);

    if (introState === "ANIMATING") {
      //display current image
      image(introName[introIndex], 0, 0, 1920, 1080);

      //change img every 6 frames
      if (frameCount % 6 === 0) { 
        if (introIndex < introName.length - 1) {
          introIndex++;
        } else {
          //when rest of images have been shown, switch to PAUSED state
          introState = "PAUSED";
          pauseStartTime = millis();
        }
      }
    } 
    else if (introState === "PAUSED") {
      //keep showing the last image
      image(introName[introName.length - 1], 0, 0, width, height);

      //1sec hold then switch to FINISHED
      if (millis() - pauseStartTime > holdDuration) {
        introState = "FINISHED";
      }
    }

    return; //exit right away and skip the rest of draw loop until finished
  }
  //intruction text layout
  


  background(255, 255, 255); // transparent background to show BG image
  
  fill('#FFFFFF')
  rect(0,0,width,height)


  image(BGimages[0], 0, 0, width, height);

  tilesGround.forEach((e) => {
    e.display();
  });



   //COLA CANS-----------------------------------------------------------------
   //filter cans that opacity = 0
  colaCans = colaCans.filter(c => c.opacity > 0.5);

 //cola cans with mouse interaction
 colaCans.forEach(c => {

    // only update when instruction box not showing
    if (!showInstructions) {
      c.update();
    }

    c.display();

    let hovering = c.isHovered(mouseX, mouseY);

    if (hovering && !c.hovered) {
      // just entered hover
      if (c.canPlaySound && !showInstructions) { 
        swipeSound.play();
        c.canPlaySound = false;

        // cooldown reset
        setTimeout(() => {
          c.canPlaySound = true;
        }, 2000); // 2 second cooldown
      }
    }

    c.hovered = hovering;
  });


  //WHEN COLACANS ARRAY ONLY HAS 20 OBJECTS LEFT, TRIGGER THISSSS
  if (colaCans.length <= 20 && !cansClearedSoundTriggered) {
     
     //lower ambient sound
     if (sounds[4]) {
       sounds[4].setVolume(0.2); 
     }
     
     //mute drill
     if (sounds[7]) {
       sounds[7].setVolume(0); 
     }
     
     //lock the block so it only runs once
     cansClearedSoundTriggered = true; 
   }


  trashItems.forEach((t) => {
    push();
    translate(t.x, t.y);

    image(t.img, -t.img.width / 2, -t.img.height / 2);

    pop();
  });
  bushesLine.display();
  butterflies.forEach((b) => {
    b.move();
    b.display();
  });
  circles.forEach(c => {
  // slow drifting movement
  c.x += c.speedX;
  c.y += c.speedY;

  // gentle floating (like air)
  c.y += sin(frameCount * 0.02 + c.offset) * 0.5;

  // wrap around screen
  if (c.x > width) c.x = 0;
  if (c.x < 0) c.x = width;
  if (c.y > height) c.y = 0;
  if (c.y < 0) c.y = height;

  // draw
  fill('#f4f4f4');
  circle(c.x, c.y, c.size);
});

musicNotes.forEach(n => {
  // move upward slowly
  n.y += n.speedY;

  // sway left-right using sine wave
  let sway = sin(frameCount * 0.05 + n.swayOffset) * n.swayAmount;

  let xPos = n.x + sway;

  // reset when off screen (loop)
  if (n.y < -50) {
    n.y = height + 50;
    n.x = random(width);
  }

  // draw centered
image(
    n.img,
    xPos - n.img.width / 2,
    n.y - n.img.height / 2
  );
});


//karaoke man
if (interactiveKaraokeObject) {
    interactiveKaraokeObject.display();
  }




  //HEADACHE CHANGINBG
  //if 20 or fewer cans remain + karaoke man clicked
  let headacheEased = (colaCans.length <= 20 && interactiveKaraokeObject && interactiveKaraokeObject.isClicked);

  if (headacheEased) {
    //clear all neuron
    neuron = []; 
    
    //draw eased heaad
    image(
      headEaseImg,
      width - headEaseImg.width - 150,
      height - headEaseImg.height + 3
    );

  } else {
    //else keep shaking
    let headShakeX = random(-3, 3); 
    let headShakeY = random(-3, 3);
    image(
      humanHeadImages[0],
      width - humanHeadImages[0].width - 150 + headShakeX,
      height - humanHeadImages[0].height + 3 + headShakeY
    );
  }



// NEURON-----------------  
   neuron.forEach(p => {
    // countdown
    if (!p.visible) {
      p.timer--;
      if (p.timer <= 0) {
        p.visible = true;
      }
    }

    if (p.visible) {
      push();
      let neuronShakeX = random(-2, 2);
      let neuronShakeY = random(-2, 2);
      translate(p.x + neuronShakeX, p.y + neuronShakeY);
      scale(p.scale);
      image(p.img, -p.img.width/2, -p.img.height/2);
      pop();
    }
  });



for (let box1 of objects) {
    box1.display();
  }
instructionBtn.display();
nextBtn.display();


  if (showInstructions) {
    instructionBox.display();
  }
//DOGS CHANGING EMOTIONS
// similar to headache easing sketch, when 20 or fewer cans remain, change the dogs' expressions to show relief
let dogRelieved = (colaCans.length <= 20 && interactiveKaraokeObject && interactiveKaraokeObject.isClicked);
if (dogRelieved) {
  neuron = []; 
  image(
    boxNormal2,
    width - boxNormal1.width - 40, 
    90 
  );
} else {
  let dogShakeX = random(-2, 2);
  let dogShakeY = random(-2, 2);
  image(
    boxAnnoyed2,
    width - boxNormal1.width - 40 + dogShakeX, 
    90 + dogShakeY
  );
}

//CAT CHANGING EMOTIONS
let catRelieved = (colaCans.length <= 20 && interactiveKaraokeObject && interactiveKaraokeObject.isClicked);
if (catRelieved) {
  neuron = []; 
  image(
    boxNormal1,
    width - boxNormal1.width - 40, 
    boxNormal1.height + 90
  );
} else {
  let catShakeX = random(-2, 2);
  let catShakeY = random(-2, 2);
  image(
    boxAnnoyed1,
    width - boxNormal2.width - 40 + catShakeX, 
    boxNormal1.height + 90 + catShakeY
  );

  // GENERATIVE CAT SOUND
  // small random chance every frame
  if (random(1) < 0.05) {

    // pick random sound
    let s = random(catSound);

    // only play if no cat sound currently playing
    let anyPlaying = false;

    for (let snd of catSound) {
      if (snd.isPlaying()) {
        anyPlaying = true;
      }
    }

    if (!anyPlaying) {
      s.play();
    }
  }
  
}

}
