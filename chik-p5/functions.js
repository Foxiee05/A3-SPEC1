//RANDOM INTEGER
//Bell R (n.d.) p5js week 05, Renick Bell website, accessed 24 March 2026. https://renickbell.net/doku.php?id=p5js-week-05
function randomInteger(min, max) {
  return Math.floor(min + (max - min + 1) * Math.random());
}

//REDIRECT
function redirectToPage(url) {
    window.location.href = "../thu-p5/index.html";
}




//BUILD ARRAY FUNCTION
//This function is also created as the result of my teamate following Renick Bell's lesson week 5, it is a more efficient way to create arrays with custom values, and it also makes the code cleaner and easier to read.
function buildArray(n, fillFunction) {
  let outputArray = [];
  for (let i = 0; i < n; i++) {
    outputArray.push(fillFunction(i));
  }
  return outputArray;
}


function mousePressed() {
//click sounds
   let rClick = random(clickSounds);
  if (rClick) rClick.play();


    // if popup is open
  if (showInstructions) {

    // close when clicking anywhere
    showInstructions = false;

  } else {

    // only check button if popup is closed
    instructionBtn.checkClick(mouseX, mouseY);
  }

if (nextBtn.isHovering()) {
    redirectToPage();
  }

  userStartAudio();
  if (isMuted) {
    outputVolume(0);
  } else {
    outputVolume(1);
  }

  //KARAOKE TRIGGER
  if (interactiveKaraokeObject) {
    let wasAssetClicked = interactiveKaraokeObject.checkClick(mouseX, mouseY);
    if (wasAssetClicked) {
      //if clicked the karaoke man, mute karaoke and bar
      if (sounds[5] && sounds[5].isPlaying()) sounds[5].setVolume(0);
      if (sounds[6] && sounds[6].isPlaying()) sounds[6].setVolume(0);
      return; // Stop processing column hits so sounds don't start playing again!
    }
  }

//BACKGROUND SOUNDS-------
  if (sounds[5] && sounds[5].isPlaying()) sounds[5].stop();
  if (sounds[6] && sounds[6].isPlaying()) sounds[6].stop();
  if (sounds[7] && sounds[7].isPlaying()) sounds[7].stop();

  let s;

  // LEFT SIDE 
  if (mouseX < width / 5) {
    s = sounds[7]; //drill sound

  // MIDDLE 
  } else if (mouseX < (width / 3) * 2) {
    s = sounds[5]; //karaoke sound

  // RIGHT SIDE 
  } else {
    s = sounds[6]; //bar sound
  }

  //play track on loopm
  if (s) {
    s.loop(); 
  }
 
}



function generateneuron() {
  let v = (typeof instructionBox !== 'undefined' && instructionBox.variationIndex === 2) ? 3 : 0;

  for (let i = 0; i < 100; i++) {
    neuron.push({
      x: random(spawnArea.x, spawnArea.x + spawnArea.w + random(-v,v)) - 150,
      y: random(spawnArea.y, spawnArea.y + spawnArea.h + random(-v,v)),
      img: random(neuronImages),
      scale: random(0.5, 1),
      visible: false,
      timer: int(random(0, 120))
    });
  }
}



//PRESS M TO MUTE UNMUTE
function keyPressed() {
  if (key === 'm' || key === 'M') {
    isMuted = !isMuted; 

    if (isMuted) {
      outputVolume(0); 
    } else {
      outputVolume(1); 
    }
  }
}


//RESPONSIVITY
function scaleToWindow() {
  let w = windowWidth;
  let h = windowHeight;
  let aspectRatio = 1920 / 1080;

  let displayW, displayH;

  if (w / h > aspectRatio) {
    // Window is wider than the aspect ratio
    displayH = h;
    displayW = h * aspectRatio;
  } else {
    // Window is taller than the aspect ratio
    displayW = w;
    displayH = w / aspectRatio;
  }

  // Use the .style() method to change the CSS display size 
  // without changing the 1920x1080 internal resolution
  mainCanvas.style('width', displayW + 'px');
  mainCanvas.style('height', displayH + 'px');
}

function windowResized() {
  scaleToWindow();
}