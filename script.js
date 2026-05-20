 import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@12.37.0/+esm" 


 //NAV BAR ANIMATION------------------------------------------------------------------------------------
  animate(
  "nav a", 
  { y: [-130, 0] },
  { 
    type: "spring", 
    stiffness: 100, 
    damping: 10,
    delay: (i) => i * 0.15 //15s gap between each link animation
  }
);


  const navLinks = document.querySelectorAll('nav a'); //selecting all nav links

  navLinks.forEach(link => {
    //mouse ENTERS the box
    link.addEventListener('mouseenter', () => {
        animate(link, { y: "3rem" }, { type: "spring", stiffness: 300, damping: 15 });
    });

    //mouse LEAVES the box
    link.addEventListener('mouseleave', () => {
        animate(link, { y: 0 }, { type: "spring", stiffness: 800, damping: 15 });
    });
});



//TICKER ANIMATION------------------------------------------------------------------------------------
animate(
  "#ticker",
  { x: [0, "-50%"] }, 
  {
    duration: 100,     
    ease: "linear",  
    repeat: Infinity   
  }
);




// LOGO SCROLL ANIMATION------------------------------------------------------------------------------------
scroll(
  animate("#logo", {
    top: "-0.5%",
    left: "37vw",
    x: "0%",
    y: "0%",
    scale: 0.8,
    width: "26vw"
  }, {
    ease: "easeInOut"     
  }),
  {
    target: document.querySelector("#about"),
    offset: ["start end", "start start"]
  }
);






//BALD ANIMATION------------------------------------------------------------------------------------
const baldImg = document.querySelector("#bald");
const frameState = { current: 1 }; 
let activeAnimation;

//function to update the image source
const updateFrame = (index) => {
  const frameIndex = Math.round(index);
  baldImg.src = `web-assets/bald-${frameIndex}.png`;
  frameState.current = frameIndex;
};

//play forward to frame 7 on hover
baldImg.addEventListener("mouseenter", () => {
  if (activeAnimation) activeAnimation.stop();

  activeAnimation = animate(frameState.current, 7, {
    duration: 0.5, 
    ease: "linear",
    onUpdate: updateFrame
  });
});

//reverse back to frame 1 on leave
baldImg.addEventListener("mouseleave", () => {
  if (activeAnimation) activeAnimation.stop();

  activeAnimation = animate(frameState.current, 1, {
    duration: 0.5, 
    ease: "linear",
    onUpdate: updateFrame
  });
});





//STAGE ANIMATION---------------------------------------------------------------------
const stages = document.querySelectorAll('.stages');

stages.forEach(stage => {
  //mouse enter
  stage.addEventListener('mouseenter', () => {
    animate(stage, 
      { x: "30%" }, 
      { type: "spring", stiffness: 800, damping: 30 },
    );
  });

  //mouse leaves
  stage.addEventListener('mouseleave', () => {
    animate(stage, 
      { x: 0 }, 
      { type: "spring", stiffness: 800, damping: 10 }
    );
  });
});





//DETAILS BG ANIMATION --------------------------------------------------------------------
const detailsSection = document.querySelector("#details");

animate(1, 3, {
  duration: 0.8,      
  repeat: Infinity,   
  repeatType: "mirror", 
  ease: "linear",
  onUpdate: (latest) => {
    // Math.round ensures we hit 1, 2, and 3 accurately 
    // as the value mirrors back and forth
    // I used Gemini to help with this
    const frameIndex = Math.round(latest); 
    detailsSection.style.backgroundImage = `url('web-assets/credit-bg-${frameIndex}.png')`;
  }
});


