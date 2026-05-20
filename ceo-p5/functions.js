
//RANDOM INTEGER------------------------------------------------------------------------------------------------------
//This function is created as the result of me following Renick Bell's lesson week 5
//Bell R (n.d.) p5js week 05, Renick Bell website, accessed 24 March 2026. https://renickbell.net/doku.php?id=p5js-week-05
function randomInteger(min, max) {
  return Math.floor(min + (max - min + 1) * Math.random());
}

//BUILD ARRAY FUNCTION------------------------------------------------------------------------------------------------------
//This function is also created as the result of me following Renick Bell's lesson week 5
/*function buildArray(n, fillFunction) {
  let outputArray = [];
  for (let i = 0; i < n; i++) {
    outputArray.push(fillFunction(i));
  }
  return outputArray;
}*/ //I dont need this now, but leave here in case I need it in the future


function mousePressed() {
  //PLAY CLICK SOUND------------------------------------------------------------------------------------------------------
  let rClick = random(clickSounds);
  if (rClick) rClick.play();



  //MOUSE INTERACTION FOR INSTRUCTION OVERLAY------------------------------------------------------------------------------------------------------
  //if open, any click closes it
  if (showInstructions) {
    showInstructions = false;
    return; 
  }

  //check if the button was clicked
  let btnX = 1594;
  let btnY = 855;
  let btnW = 293; 
  let btnH = 59;
  if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
    showInstructions = true;
    return; 
  }




  //BACK BUTTON CLICK------------------------------------------------------------------------------------------------------------------------
  let backX = 1592, backY = 930, backW = 142, backH = 103;
  
  if (
    mouseX >= backX && 
    mouseX <= backX + backW && 
    mouseY >= backY && 
    mouseY <= backY + backH
  ) {
    redirectToPage("../thu-p5/index.html");
    return; 
  }




//MOUSE INTERACTION FOR FISHER AREA------------------------------------------------------------------------------------------------------
  if (mouseX >= 0 && mouseX <= 218 && mouseY >= 0 && mouseY <= 218) {
    if (!rollerSound.isPlaying()) {
      rollerSound.play();
      
      //trigger results only when sounds stop
      rollerSound.onended(() => {
        rewardSound.play();
        
        if (daBacteriaNetwork.particles.length > 0) {
          activeFisherResult = {
            img: random(trashImgs),
            type: 'trash',
            rawParticles: [],
            spawnTime: millis()
          };
          for(let i=0; i<20; i++) {
            activeFisherResult.rawParticles.push({
              img: random(bacteriaRawImages),
              x: 350 + random(708),
              y: 140 + random(595),
              size: random(1.5, 2)
            });
          }
        } else {
          activeFisherResult = {
            img: random(fishImgs),
            type: 'fish',
            spawnTime: millis()
          };
        }
      });
    }
    return;
  }



  //BUBBLE INTERACTION------------------------------------------------------------------------------------------------------
  let hit = bubbleManager.checkInteraction(mouseX, mouseY);
  if (hit) {
    lastClickTime = millis(); 
  }
}





function keyPressed() {
  //77 is keycode for M and m
  if (keyCode === 77) { 
    isMuted = !isMuted;
    
    if (!isMuted) {
      userStartAudio();
    }
    
  }


  //70 is keycode for F and f
  // if (keyCode === 70) { 
  //   let fs = fullscreen();
  //   fullscreen(!fs);
  // }
}



function drawInteractiveButton(img, x, y, w, h) {
  //check if mouse within boundaries of the button
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    //hover: 10% increment in size
    image(img, x - (w * 0.05), y - (h * 0.05), w * 1.1, h * 1.1);


  } else {
    //normal state
    image(img, x, y, w, h);
  }
}



//SCALING FUNCTION------------------------------------------------------------------------------------------------------
//this scale function is created by Gemini
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



//REDIRECT FUNCTION----------------------------------------------------------------------------------------
function redirectToPage(url) {
    window.location.href = url;
}