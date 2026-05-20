//I tried to write them my own since I thought these was just simple sound implementation, but I was not being used to the vanilla js syntaxes and have to use Gemini to help with


// Array to keep track of preloaded Audio elements
const clickSounds = [];
const namSounds = [];
//start the web muted
let isMuted = true;

// Preload Background Music Element
const bgMusic = new Audio('web-sounds/web-music.wav');
bgMusic.loop = true;
bgMusic.volume = 0.4;





//PRELOAD EFFECTS------------------------------------------------------------------------------------------------------
//click sounds
for (let i = 1; i <= 5; i++) {
  const audio = new Audio(`web-sounds/click-${i}.wav`);
  clickSounds.push(audio);
}

//nam sounds
for (let i = 1; i <= 3; i++) {
  const audio = new Audio(`web-sounds/nam-${i}.wav`);
  namSounds.push(audio);
}

//hover/leave
const hoverEnterSound = new Audio('web-sounds/mouse-enter.wav');
const hoverLeaveSound = new Audio('web-sounds/mouse-leave.wav');


// Wait for DOM to load to bind UI elements
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('audio-toggle');
  const audioIcon = document.getElementById('audio-icon');

  if (toggleBtn && audioIcon) {
    toggleBtn.addEventListener('click', (event) => {
      // Prevent this specific click from triggering a global click sound
      event.stopPropagation();

      //toggle state
      isMuted = !isMuted;

      if (isMuted) {
        audioIcon.src = 'web-assets/mute.svg';
        toggleBtn.classList.add('muted');
        
        //pause the background music instantly when muted
        bgMusic.pause();
      } else {
        audioIcon.src = 'web-assets/unmute.svg';
        toggleBtn.classList.remove('muted');
        
        //play background music when unmuted
        bgMusic.play();
        
        // Play an initial sound instantly to unlock Web Audio context on mobile browsers
        const testSound = clickSounds[0];
        testSound.currentTime = 0;
        testSound.play().catch(e => console.log("Audio activation context deferred:", e));
      }
    });
  }

  // ---------Mute Audio When Clicking Stage Play Buttons -------------
  const stageButtons = document.querySelectorAll('.stage-textbox-button');
  stageButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      // 1. Prevent the global window click listener from playing a click sound right after muting
      event.stopPropagation();



      // 2. Set global sound state tracker to muted
      isMuted = true;



      // 3. Stop background ambient soundtracks immediately
      bgMusic.pause();



      // 4. Update the control layout widget states visually if they exist on the page
      if (audioIcon && toggleBtn) {
        audioIcon.src = 'web-assets/mute.svg';
        toggleBtn.classList.add('muted');
      }
    });
  });



  // ----------- Dynamic Hover/Leave Event Attacher ------------
  const interactiveElements = document.querySelectorAll(
    'nav a, .stages, .stages-phone, .stage-textbox-button, #how'
  );

  interactiveElements.forEach(element => {
    // 1. Mouse Enter Handler
    element.addEventListener('mouseenter', () => {
      if (isMuted) return; // Disregard if global switch is active
      
      hoverEnterSound.currentTime = 0; // Rewind state for immediate rapid feedback
      hoverEnterSound.play().catch(error => {
        console.log("Hover enter block intercepted:", error);
      });
    });



    // 2. Mouse Leave Handler
    element.addEventListener('mouseleave', () => {
      if (isMuted) return; // Disregard if global switch is active

      hoverLeaveSound.currentTime = 0; // Rewind state for immediate rapid feedback
      hoverLeaveSound.play().catch(error => {
        console.log("Hover leave block intercepted:", error);
      });
    });
  });




  // ---------- Bald Image Specific Hover Handler -------------
  const baldImg = document.getElementById('bald');
  if (baldImg) {
    baldImg.addEventListener('mouseenter', () => {
      if (isMuted) return; // Disregard if global switch is active

      // Pick a random index between 0 and 2 from the namSounds array
      const randomIndex = Math.floor(Math.random() * namSounds.length);
      const selectedNamSound = namSounds[randomIndex];

      // Reset playback position for responsive fast re-triggering
      selectedNamSound.currentTime = 0;
      
      // Play the random track once
      selectedNamSound.play().catch(error => {
        console.log("Nam hover audio block intercepted:", error);
      });
    });
  }
});









//CLICK SOUND ----------------------------------------------------------------------------------------------------------
// Add a global click event listener to the entire window
window.addEventListener('click', () => {
  // If the page is muted, do not execute playback
  if (isMuted) return;

  //pick random index between 0 and 4
  const randomIndex = Math.floor(Math.random() * clickSounds.length);
  const selectedSound = clickSounds[randomIndex];

  // Reset playback position so overlapping fast clicks function correctly
  selectedSound.currentTime = 0;
  
  //play click sound once
  selectedSound.play().catch(error => {
    console.log("Audio playback error:", error);
  });
});