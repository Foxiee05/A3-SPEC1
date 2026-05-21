let mainCanvas;

//ROTATION IMAGE FOR MOBILE DEVICES INIT-----------------------------------
let rotateImg;


// BACKGROUND AND INTRO ASSETS
let backgroundLayers = [];
let dustCloudImages = [];
let dustCloudGifs = [];
let dustClouds = [];
let introNameImages = [];

// DUST CLOUD INTERACTION
let hoveredDustCloud = null;
let draggedDustCloud = null;
let dustCloudDragOffsetX = 0;
let dustCloudDragOffsetY = 0;

// SIDE PANEL AND NAVIGATION ASSETS
let rightBoxImages = [];
let boxOneTwoImage;
let boxThreeImage;
let boxFourFiveImage;
let smokeStackImage;
let pollenFlowersImage;
let handLikedRootsImage;
let lungsImage;
let smokeStackGif;
let pollenFlowersGif;
let handLikedRootsGif;
let lungsGif;
let instructionButtonImage;
let backButtonImage;
let nextButtonImage;
let instructionImage;
let instructionOneImage;
let instructionMainImage;
let dragThisImage;
let shirtImage;
let baldManImages = [];

// POPUP AND SLIDER ASSETS
let popUpBoxImage;
let noButtonImage;
let yesButtonImage;
let slideBarImage;
let slideNavImage;
let bacteriaImages = [];

// VEHICLE POPUP ASSETS
let vehicleTypes = ["bike", "car", "bus"];
let vehicleImagesByType = {};
let popUpImagesByType = {};
let electricPopUpImagesByType = {};
let electricVehicleImagesByType = {};

// EFFECT PARTICLE ASSETS
let upperTeethImage;
let lowerTeethImage;
let khoiImages = [];
let cleanParticleImages = [];
let fallingParticles = [];
let backgroundBacteria = [];

// SOUND ASSETS AND AUDIO STATE
let clickSounds = [];
let smokeEmitsSound;
let noiseAmbienceSound;
let afterClickYesSound;
let honkSoundsByType = {};
let slimySound;
let xrayScanSound;
let stateSounds = [];
let isMuted = false;
let lastMuteToggleTime = 0;
let muteToggleDebounceMs = 80;
let hasNoiseAmbienceStarted = false;
let lastHoveredHonkVehicle = null;

// SCENE VISIBILITY AND INTRO STATE
let isPopUpVisible = false;
let isInstructionVisible = false;
let areVehiclesPaused = false;
let introNameIndex = 0;
let introNameState = "ANIMATING";
let hasShownInstructionAfterIntro = false;
let introNamePauseStartTime = 0;
let introNameHoldDuration = 1000;
let introNameFrameInterval = 6;

// BALDMAN STATE AND PROGRESSION COUNTERS
let selectedVehicleType = "";
let selectedVehicle = null;
let hasVehicleChanged = false;
let currentBaldManState = 0;
let pollutedVehiclesSwallowed = 0;
let electricVehiclesSwallowed = 0;
let finalStateElectricVehiclesSwallowed = 0;
let pollutedVehicleStateThresholds = [5, 3, 2, 2];
let electricVehicleStateThreshold = 2;
let finalStateElectricVehicleThreshold = 3;
let arePollutedGifsPlaying = false;
let wasBaldManAtFinalState = false;
let canvasZoom = 1;
let backgroundColorAmount = 0;

// BACKGROUND LAYOUT
let cityY = 200;
let roadY = 0;

// DUST CLOUD LAYOUT AND MOTION
let minimumDustClouds = 4;
let maximumDustClouds = 6;
let minimumDustCloudScale = 0.15;
let maximumDustCloudScale = 0.2;
let dustCloudLayerCount = 4;
let dustCloudPngOffsetY = -120;
let dustCloudGifOffsetY = -160;
let dustCloudMinimumSpacing = 130;
let dustCloudAssetSize = 220;
let dustCloudHoverScale = 1.1;
let dustCloudHoverPadding = 0;
let dustCloudSpeedMultiplier = 4;

// NAVIGATION BUTTON POSITIONS
let instructionButtonX = 1594;
let instructionButtonY = 855;

let backButtonX = 1592;
let backButtonY = 930;

let nextButtonX = 1748;
let nextButtonY = 930;

let buttonHoverScale = 1.1;

// SIDE PANEL BOX LAYOUT
let boxOneTwoY = 35;
let boxOneTwoScale = 0.9;
let boxOneTwoGap = 6;
let boxThreeY = 245;
let boxThreeScale = 0.85;
let boxFourFiveY = 565;
let boxFourFiveScale = 1.1;
let boxIconSize = 155;
let smokeStackIconSize = 165;
let smokeStackOffsetY = -10;
let boxThreeIconSize = 285;
let lungsIconSize = 200;

let noButtonX = 1430;
let noButtonY = 170;

// FINAL STATE VISUAL AND AUDIO INTENSITY
let finalStateCanvasZoom = 1.1;
let canvasZoomSpeed = 0.035;
let cityLayerJitterAmount = 2.5;
let backgroundColorFadeSpeed = 0.035;
let normalAmbienceVolume = 1;
let finalStateAmbienceVolume = 1.5;

// POPUP SLIDER BEHAVIOR
let changeSliderProgress = 0;
let changeSliderTargetProgress = 0;
let isDraggingChangeSlider = false;
let changeSliderY = 750;
let changeSliderOffsetX = 25;
let changeSliderScale = 0.9;
let changeSliderDragSpeed = 0.07;
let changeSliderRotationTurns = 2;
let changeSliderCompleteProgress = 0.95;
let popUpVehicleOffsetY = -30;
let popUpInstructionX = 597;
let popUpInstructionY = 186;
let instructionMainX = 570;
let instructionMainY = 300;
let dragThisOffsetY = 22;
let dragThisOffsetX = -480;
let dragThisMoveAmount = 18;
let dragThisMoveSpeed = 0.055;
let changeSliderBacteria = [];
let changeSliderBacteriaCount = 35;
let changeSliderBacteriaMinSize = 32;
let changeSliderBacteriaMaxSize = 61;

// TEETH ANIMATION
let baldManHitX = 980;

let upperTeethOpenY = -50;
let upperTeethClosedY = 5;

let lowerTeethOpenY = 20;
let lowerTeethClosedY = 1;

let upperTeethY = upperTeethOpenY;
let lowerTeethY = lowerTeethOpenY;

let teethBiteDuration = 120;
let teethHoldDuration = 500;
let teethOpenDuration = 220;

let teethAnimationState = "open";
let teethAnimationStartTime = 0;
let pendingTeethBites = [];
let activeTeethBite = null;

// VEHICLES
let movingVehicles = [];
let vehicleSmokeParticles = [];
let cleanVehicleParticles = [];
let minimumVehiclesOnRoad = 2;
let maximumVehiclesOnRoad = 3;
let minimumVehicleGap = 220;
let vehicleHoverPadding = 20;
let smokeParticleLifetime = 500;
let smokeEmitInterval = 130;
let finalStateSmokeEmitInterval = 65;
let finalStateSmokeMinCount = 9;
let finalStateSmokeMaxCount = 13;
let smokeMinSize = 0.7;
let smokeMaxSize = 1.35;
let finalStateSmokeMinSize = 1.15;
let finalStateSmokeMaxSize = 2.2;
let cleanParticleLifetime = 1200;
let cleanParticleCount = 4;
let cleanParticleEmitInterval = 130;
let cleanParticleTravelDistance = 150;
let cleanParticleMinSize = 0.9;
let cleanParticleMaxSize = 1.35;
let fallingParticleEmitTimer = 0;
let fallingFlowerLeafNormalInterval = 50;
let fallingFlowerLeafGifInterval = 400;
let fallingFlowerLeafSpeedMin = 4;
let fallingFlowerLeafSpeedMax = 5.5;
let fallingFlowerLeafDriftMin = -0.35;
let fallingFlowerLeafDriftMax = 0.35;
let fallingFlowerLeafMinSize = 1.2;
let fallingFlowerLeafMaxSize = 1.8;

// FALLING CLEAN PARTICLES AND FINAL STATE BACTERIA
let fallingParticleLayerCount = 5;
let backgroundBacteriaCount = 100;
let backgroundBacteriaScale = 0.8;
let backgroundBacteriaMinPopSpeed = 0.15;
let backgroundBacteriaMaxPopSpeed = 0.45;

function preload() {
  soundFormats("wav");

    rotateImg = loadImage('assets/device-rotate.png');

  backgroundLayers = [
    loadImage("assets/city3.png"),
    loadImage("assets/city2.png"),
    loadImage("assets/city1.png"),
    loadImage("assets/city.png"),
    loadImage("assets/road.png"),
    loadImage("assets/city4.png")
  ];

  dustCloudImages = [
    loadImage("assets polluted/Dust_Cloud_1.png"),
    loadImage("assets polluted/Dust_Cloud_2.png"),
    loadImage("assets polluted/Dust_Cloud_3.png")
  ];

  dustCloudGifs = [
    loadImage("assets polluted/Dust_Cloud_1.gif"),
    loadImage("assets polluted/Dust_Cloud_2.gif"),
    loadImage("assets polluted/Dust_Cloud_3.gif")
  ];

  for (let i = 0; i < 8; i++) {
    introNameImages[i] = loadImage(
      "assets chung/name-intro-2/go-to-work-" + (i + 1) + ".png"
    );
  }

  shirtImage = loadImage("assets/shirt.png");
  rightBoxImages = [
    loadImage("assets chung/box-1.png"),
    loadImage("assets chung/box-2.png")
  ];
  boxOneTwoImage = loadImage("assets/box4,5.png");
  boxThreeImage = loadImage("assets/box3.png");
  boxFourFiveImage = loadImage("assets/box4,5.png");
  smokeStackImage =
    loadImage("assets polluted/Smoke_Stack.png");
  pollenFlowersImage =
    loadImage("assets polluted/Pollen_Flowers.png");
  handLikedRootsImage =
    loadImage("assets polluted/Hand-liked_Roots.png");
  lungsImage =
    loadImage("assets polluted/Lungs.png");
  smokeStackGif =
    loadImage("assets polluted/Smoke_Stack.gif");
  pollenFlowersGif =
    loadImage("assets polluted/Pollen_Flowers.gif");
  handLikedRootsGif =
    loadImage("assets polluted/Hand-liked_Roots.gif");
  lungsGif =
    loadImage("assets polluted/Lungs.gif");

  instructionButtonImage =
    loadImage("assets chung/instruction-button.png");
  backButtonImage =
    loadImage("assets chung/back-button.png");
  nextButtonImage =
    loadImage("assets chung/next-button.png");
  instructionImage =
    loadImage("assets chung/instruction.png");
  instructionOneImage =
    loadImage("assets/instruction1.png");
  instructionMainImage =
    loadImage("assets/instructionsMain.png");
  dragThisImage =
    loadImage("assets/Drag this.png");

  baldManImages = [
    loadImage("assets/baldManState1.png"),
    loadImage("assets/baldManState2.png"),
    loadImage("assets/baldManState3.png"),
    loadImage("assets/baldManState4.png"),
    loadImage("assets/baldManState5.png")
  ];

  popUpBoxImage = loadImage("assets/popUpBox.png");
  noButtonImage = loadImage("assets/no.png");
  yesButtonImage = loadImage("assets/yes.png");
  slideBarImage = loadImage("assets/slideBar.png");
  slideNavImage = loadImage("assets/slidenav.png");
  bacteriaImages = [
    loadImage("assets polluted/bacteriaRaw-2.png"),
    loadImage("assets polluted/bacteriaRaw-3.png"),
    loadImage("assets polluted/bacteriaRaw-4.png"),
    loadImage("assets polluted/bacteriaRaw-5.png")
  ];

  popUpImagesByType = {
    bike: loadImage("assets/popUpBike.png"),
    car: loadImage("assets/popUpCar.png"),
    bus: loadImage("assets/popUpBus.png")
  };

  electricPopUpImagesByType = {
    bike: loadImage("assets/popUpElectricBike.png"),
    car: loadImage("assets/popUpElectricCar.png"),
    bus: loadImage("assets/popUpElectricBus.png")
  };

  electricVehicleImagesByType = {
    bike: loadImage("assets/electricBike.png"),
    car: loadImage("assets/electricCar.png"),
    bus: loadImage("assets/electricBus.png")
  };

  upperTeethImage = loadImage("assets/upperTeeth.png");
  lowerTeethImage = loadImage("assets/lowerTeeth.png");

  khoiImages = [
    loadImage("assets/khói1.png"),
    loadImage("assets/khói2.png"),
    loadImage("assets/khói3.png"),
    loadImage("assets/khói4.png")
  ];
  cleanParticleImages = [
    loadImage("assets/leaves1.png"),
    loadImage("assets/leaves2.png"),
    loadImage("assets/flowers1.png"),
    loadImage("assets/flowers2.png")
  ];

  vehicleImagesByType = {
    bike: loadImage("assets/bike.png"),
    car: loadImage("assets/car.png"),
    bus: loadImage("assets/bus.png")
  };

  clickSounds = [
    loadSound("sounds/click-1.wav"),
    loadSound("sounds/click-2.wav"),
    loadSound("sounds/click-3.wav"),
    loadSound("sounds/click-4.wav"),
    loadSound("sounds/click-5.wav")
  ];
  smokeEmitsSound = loadSound("sounds/smoke emits.wav");
  noiseAmbienceSound = loadSound("sounds/noise ambience.wav");
  afterClickYesSound = loadSound("sounds/after click yes.wav");
  honkSoundsByType = {
    bike: loadSound("sounds/Honk bike.wav"),
    car: loadSound("sounds/Honk car.wav"),
    bus: loadSound("sounds/Honk bus.wav")
  };
  slimySound = loadSound("sounds/slimy.wav");
  xrayScanSound = loadSound("sounds/Xray scan.wav");
  stateSounds = [
    null,
    loadSound("sounds/state2.wav"),
    loadSound("sounds/state3.wav"),
    loadSound("sounds/state4.wav"),
    loadSound("sounds/state5.wav")
  ];
}

function setup() {
  pixelDensity(1);
  mainCanvas = createCanvas(1920, 1080);
  
  // Call our scaling function immediately
  scaleToWindow();


  setMasterMute();
  window.addEventListener("keydown", handleWindowKeyDown);
  resizeDustCloudAssets();
  resizePollutedAssets();
  setPollutedGifPlayback(false);
  createDustClouds();
  createVehicles();


  let loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
}

function drawIntroNameSequence() {
  if (introNameState === "FINISHED") {
    return false;
  }

  // The intro owns the canvas until it finishes, so the main scene does not update underneath the opening animation.
  background(0);

  if (introNameState === "ANIMATING") {
    image(introNameImages[introNameIndex], 0, 0, width, height);

    if (frameCount % introNameFrameInterval === 0) {
      if (introNameIndex < introNameImages.length - 1) {
        introNameIndex++;
      } else {
        introNameState = "PAUSED";
        introNamePauseStartTime = millis();
      }
    }
  } else if (introNameState === "PAUSED") {
    image(
      introNameImages[introNameImages.length - 1],
      0,
      0,
      width,
      height
    );

    if (millis() - introNamePauseStartTime > introNameHoldDuration) {
      introNameState = "FINISHED";
      showInstructionAfterIntro();
    }
  }

  return true;
}

function showInstructionAfterIntro() {
  if (hasShownInstructionAfterIntro) {
    return;
  }

  isInstructionVisible = true;
  hasShownInstructionAfterIntro = true;
  updateVehiclePauseState();
}

function draw() {
    //ROTATION DETECTION FOR MOBILE DEVICES----------------------------------------------------------------
  if (windowWidth < windowHeight) {
    background(0); // Black background for the warning
    
    // Draw the rotation image in the center
    imageMode(CENTER);
    
    // We scale the image to fit the 1080p canvas coordinates
    // regardless of the phone's actual resolution
    image(rotateImg, 1920 / 2, 1080 / 2);
    
    // Stop the rest of the draw function from running
    return; 
  }


  if (drawIntroNameSequence()) {
    return;
  }

  startNoiseAmbienceAfterIntro();
  drawStateBackground();
  updatePollutedGifPlayback();
  updateCanvasZoom();
  updateVehicleHoverSounds();

  push();
  applyCanvasZoom();

  updateFallingParticles();
  drawBackgroundLayersBeforeVehicles();

  if (!areVehiclesPaused) {
    updateVehicles();
  }

  drawVehicleSmokeParticles();
  drawCleanVehicleParticles();
  drawVehicles();

  drawBackgroundLayersAfterVehicles();

  updateTeethAnimation();

  if (!isBaldManAtFinalState()) {
    image(lowerTeethImage, 22, lowerTeethY);
    image(upperTeethImage, 20, upperTeethY);
  }

  image(baldManImages[currentBaldManState], 30, 0);
  image(shirtImage, 0, 0);

  pop();

  drawRightBox();

  if (isInstructionVisible) {
    drawInstruction();
  }

  drawNavigationButtons();

  drawPopUpBox();
}

// BACKGROUND

function drawBackgroundLayersBeforeVehicles() {
  drawDustCloudLayer(0);
  drawFallingParticleLayer(0);
  drawCityLayer(0, cityY);
  drawDustCloudLayer(1);
  drawFallingParticleLayer(1);

  drawCityLayer(1, cityY);
  drawDustCloudLayer(2);
  drawFallingParticleLayer(2);

  drawCityLayer(2, cityY);
  drawDustCloudLayer(3);
  drawFallingParticleLayer(3);

  drawCityLayer(3, cityY);

  drawRoadLayer();
}

function drawBackgroundLayersAfterVehicles() {
  cityY = cityY ?? 200;
  drawCityLayer(5, cityY);
  drawFallingParticleLayer(4);
}

// STATE BACKGROUND

function drawStateBackground() {
  updateBackgroundColorAmount();
  updateBackgroundBacteria();

  // The background color is tied to baldman state so the whole city slowly feels more polluted instead of snapping to a new mood.
  let normalBackground = color(255);
  let finalBackground = color("#98157B");
  let backgroundColor = lerpColor(
    normalBackground,
    finalBackground,
    backgroundColorAmount
  );

  // Replaced global color wipe with a noStroke rendering rectangle covering the canvas profile
  push();
  noStroke();
  fill(backgroundColor);
  rect(0, 0, 1920, 1080);
  pop();
  
  drawBackgroundBacteria();
}

function updateBackgroundColorAmount() {
  let targetBackgroundAmount =
    currentBaldManState /
    max(1, baldManImages.length - 1);

  backgroundColorAmount = lerp(
    backgroundColorAmount,
    targetBackgroundAmount,
    backgroundColorFadeSpeed
  );
}

function updateBackgroundBacteria() {
  if (!isBaldManAtFinalState()) {
    backgroundBacteria = [];
    return;
  }

  while (backgroundBacteria.length < backgroundBacteriaCount) {
    backgroundBacteria.push(createBackgroundBacteria());
  }
}

function createBackgroundBacteria() {
  return {
    image: random(bacteriaImages),
    x: random(width),
    y: random(height),
    phase: random(TWO_PI),
    popSpeed: random(
      backgroundBacteriaMinPopSpeed,
      backgroundBacteriaMaxPopSpeed
    ),
    rotation: random(TWO_PI),
    rotationSpeed: random(-0.01, 0.01)
  };
}

function drawBackgroundBacteria() {
  if (!isBaldManAtFinalState()) {
    return;
  }

  drawingContext.shadowColor = "#A63EDF";
  drawingContext.shadowBlur = 8;

  for (let bacteria of backgroundBacteria) {
    let popAmount =
      (sin(frameCount * bacteria.popSpeed + bacteria.phase) + 1) /
      2;
    let bacteriaScale =
      backgroundBacteriaScale *
      smoothstep(0.18, 0.82, popAmount);

    if (bacteriaScale <= 0.01) {
      continue;
    }

    let bacteriaWidth =
      bacteria.image.width * bacteriaScale;
    let bacteriaHeight =
      bacteria.image.height * bacteriaScale;

    push();
    translate(bacteria.x, bacteria.y);
    rotate(
      bacteria.rotation +
      frameCount * bacteria.rotationSpeed
    );
    imageMode(CENTER);
    image(
      bacteria.image,
      0,
      0,
      bacteriaWidth,
      bacteriaHeight
    );
    pop();
  }

  drawingContext.shadowBlur = 0;
}

function smoothstep(edge0, edge1, value) {
  let amount = constrain(
    (value - edge0) / (edge1 - edge0),
    0,
    1
  );

  return amount * amount * (3 - 2 * amount);
}

// CANVAS CAMERA

function updateCanvasZoom() {
  let targetZoom = 1;

  if (isBaldManAtFinalState()) {
    targetZoom = finalStateCanvasZoom;
  }

  canvasZoom = lerp(
    canvasZoom,
    targetZoom,
    canvasZoomSpeed
  );
}

function applyCanvasZoom() {
  translate(width / 2, height / 2);
  scale(canvasZoom);
  translate(-width / 2, -height / 2);
}

function drawCityLayer(layerIndex, layerY) {
  let jitter = getFinalStateJitter(layerIndex);

  image(
    backgroundLayers[layerIndex],
    jitter.x,
    layerY + jitter.y
  );
}

function drawRoadLayer() {
  let jitter = getFinalStateJitter(4);

  image(
    backgroundLayers[4],
    jitter.x,
    roadY + jitter.y
  );
}

function getFinalStateJitter(layerIndex) {
  if (!isBaldManAtFinalState()) {
    return { x: 0, y: 0 };
  }

  let jitterX =
    sin(frameCount * 0.72 + layerIndex * 1.7) *
    cityLayerJitterAmount;
  let jitterY =
    cos(frameCount * 0.84 + layerIndex * 1.3) *
    cityLayerJitterAmount;

  return {
    x: jitterX,
    y: jitterY
  };
}

// DUST CLOUDS

function createDustClouds() {
  dustClouds = [];

  let dustCloudCount = floor(
    random(minimumDustClouds, maximumDustClouds + 1)
  );

  for (let i = 0; i < dustCloudCount; i++) {
    dustClouds.push(createDustCloud());
  }

  scatterDustCloudsInsideCanvas(dustClouds);
}

function createDustCloud() {
  let layer = floor(random(dustCloudLayerCount));
  let scale = random(
    minimumDustCloudScale,
    maximumDustCloudScale
  );
  let dustCloudSize = 1000 * scale;
  let imageIndex = floor(random(dustCloudImages.length));
  let cloudX = random(0, width - dustCloudSize);

  return {
    image: dustCloudImages[imageIndex],
    gif: dustCloudGifs[imageIndex],
    layer: layer,
    x: cloudX,
    y: getDustCloudSpawnY(),
    size: dustCloudSize,
    speed: getDustCloudSpeed(layer),
    waveOffset: random(TWO_PI),
    waveSize: random(3, 9)
  };
}

function getDustCloudLeftSpawnX(dustCloudSize) {
  return random(-width * 0.35, -dustCloudSize);
}

function resetDustCloudFromLeft(dustCloud) {
  // Reuse the existing cloud object instead of creating endless new clouds;
  // this keeps the animation lighter during the GIF-heavy final state.
  dustCloud.x = getDustCloudLeftSpawnX(dustCloud.size);
  dustCloud.y = getDustCloudSpawnY();
  dustCloud.layer = floor(random(dustCloudLayerCount));
  dustCloud.speed = getDustCloudSpeed(dustCloud.layer);
  dustCloud.waveOffset = random(TWO_PI);
  dustCloud.waveSize = random(3, 9);
}

function updateDustCloudSpeeds() {
  for (let dustCloud of dustClouds) {
    dustCloud.speed = getDustCloudSpeed(dustCloud.layer);
  }
}

function getDustCloudSpeed(layer) {
  if (layer === 0) {
    return 0.3 * dustCloudSpeedMultiplier;
  }

  if (layer === 1) {
    return 0.4 * dustCloudSpeedMultiplier;
  }

  if (layer === 2) {
    return 0.5 * dustCloudSpeedMultiplier;
  }

  if (layer === 3) {
    return 0.6 * dustCloudSpeedMultiplier;
  }

  return 0.75 * dustCloudSpeedMultiplier;
}

function getDustCloudSpawnY() {
  return random(130, height * 0.42);
}

function scatterDustCloudsInsideCanvas(dustCloudList) {
  let placedClouds = [];

  for (let dustCloud of dustCloudList) {
    let position = getRandomInsideDustCloudPosition(
      dustCloud,
      placedClouds
    );

    dustCloud.x = position.x;
    dustCloud.y = position.y;
    placedClouds.push(dustCloud);
  }
}

function getRandomInsideDustCloudPosition(dustCloud, placedClouds) {
  let position = {
    x: random(0, width - dustCloud.size),
    y: getDustCloudSpawnY()
  };

  for (let attempt = 0; attempt < 30; attempt++) {
    position = {
      x: random(0, width - dustCloud.size),
      y: getDustCloudSpawnY()
    };

    if (!isDustCloudTooClose(position, placedClouds)) {
      break;
    }
  }

  return position;
}

function isDustCloudTooClose(position, placedClouds) {
  for (let placedCloud of placedClouds) {
    if (
      dist(
        position.x,
        position.y,
        placedCloud.x,
        placedCloud.y
      ) < dustCloudMinimumSpacing
    ) {
      return true;
    }
  }

  return false;
}

function drawDustCloudLayer(layer) {
  if (isBaldManAtFinalState()) {
    hoveredDustCloud = null;
  } else {
    hoveredDustCloud = getHoveredDustCloud();
  }

  for (let dustCloud of dustClouds) {
    if (dustCloud.layer === layer) {
      updateDustCloud(dustCloud);
      drawDustCloud(dustCloud);
    }
  }

}

function updateDustCloud(dustCloud) {
  if (dustCloud === draggedDustCloud) {
    return;
  }

  dustCloud.x += dustCloud.speed;

  if (dustCloud.x > width + dustCloud.size) {
    resetDustCloudFromLeft(dustCloud);
  }
}

function drawDustCloud(dustCloud) {
  let dustCloudScale = 1;

  if (
    !isBaldManAtFinalState() &&
    (
      dustCloud === hoveredDustCloud ||
      dustCloud === draggedDustCloud
    )
  ) {
    dustCloudScale = dustCloudHoverScale;
  }

  let dustCloudSize = dustCloud.size * dustCloudScale;
  let dustCloudX =
    dustCloud.x - (dustCloudSize - dustCloud.size) / 2;
  let floatingY =
    getDustCloudFloatingY(dustCloud) -
    (dustCloudSize - dustCloud.size) / 2 +
    getDustCloudVerticalOffsetY(dustCloud);
  let jitter = getGifJitter(dustCloud.layer);
  let jitteredX = dustCloudX + jitter.x;
  let jitteredY = floatingY + jitter.y;
  let clampedPosition = getDustCloudClampedPosition(
    jitteredX,
    jitteredY,
    dustCloudSize
  );

  dustCloud.drawX = clampedPosition.x;
  dustCloud.drawY = clampedPosition.y;
  dustCloud.drawSize = dustCloudSize;

  image(
    getDustCloudImage(dustCloud),
    dustCloud.drawX,
    dustCloud.drawY,
    dustCloudSize,
    dustCloudSize
  );
}

function getDustCloudClampedPosition(
  dustCloudX,
  dustCloudY,
  dustCloudSize
) {
  if (!isBaldManAtGifState()) {
    return {
      x: dustCloudX,
      y: dustCloudY
    };
  }

  return {
    x: dustCloudX,
    y: constrain(dustCloudY, 0, height - dustCloudSize)
  };
}

function getGifJitter(layerIndex) {
  if (!isBaldManAtFinalState()) {
    return { x: 0, y: 0 };
  }

  return getFinalStateJitter(layerIndex + 6);
}

function getDustCloudImage(dustCloud) {
  if (isBaldManAtGifState()) {
    return dustCloud.gif;
  }

  return dustCloud.image;
}

function getDustCloudFloatingY(dustCloud) {
  return (
    dustCloud.y +
    sin(frameCount * 0.015 + dustCloud.waveOffset) *
    dustCloud.waveSize
  );
}

function getDustCloudVerticalOffsetY(dustCloud) {
  if (isBaldManAtGifState()) {
    return dustCloudGifOffsetY;
  }

  return dustCloudPngOffsetY;
}

function getHoveredDustCloud() {
  if (isBaldManAtFinalState()) {
    return null;
  }

  for (let i = dustClouds.length - 1; i >= 0; i--) {
    let dustCloud = dustClouds[i];

    if (isClickingDustCloud(dustCloud)) {
      return dustCloud;
    }
  }

  return null;
}

function isClickingDustCloud(dustCloud) {
  let dustCloudX = dustCloud.drawX;
  let dustCloudY = dustCloud.drawY;
  let dustCloudSize = dustCloud.drawSize;

  if (dustCloudX === undefined) {
    dustCloudX = dustCloud.x;
    dustCloudY = getDustCloudFloatingY(dustCloud);
    dustCloudSize = dustCloud.size;
  }

  return isClickingRectangle(
    dustCloudX - dustCloudHoverPadding,
    dustCloudY - dustCloudHoverPadding,
    dustCloudSize + dustCloudHoverPadding * 2,
    dustCloudSize + dustCloudHoverPadding * 2
  );
}

// SIDE PANEL

function drawRightBox() {
  let rightBoxImage = getRightBoxImage();
  let rightBoxX = width - rightBoxImage.width;

  image(
    rightBoxImage,
    rightBoxX,
    0
  );

  drawBoxOneTwoCopies(rightBoxX, rightBoxImage.width);
  drawBoxThree(rightBoxX, rightBoxImage.width);
  drawBoxFourFive(rightBoxX, rightBoxImage.width);
}

function getRightBoxImage() {
  if (isBaldManAtFinalState()) {
    return rightBoxImages[1];
  }

  return rightBoxImages[0];
}

function drawBoxOneTwoCopies(rightBoxX, rightBoxWidth) {
  let boxWidth = boxOneTwoImage.width * boxOneTwoScale;
  let boxHeight = boxOneTwoImage.height * boxOneTwoScale;
  let totalWidth = boxWidth * 2 + boxOneTwoGap;
  let firstBoxX =
    rightBoxX + rightBoxWidth / 2 - totalWidth / 2;

  image(
    boxOneTwoImage,
    firstBoxX,
    boxOneTwoY,
    boxWidth,
    boxHeight
  );
  drawIconInBoxBottom(
    getSmokeStackImage(),
    firstBoxX,
    boxOneTwoY,
    boxWidth,
    boxHeight,
    smokeStackIconSize,
    0,
    smokeStackOffsetY
  );

  image(
    boxOneTwoImage,
    firstBoxX + boxWidth + boxOneTwoGap,
    boxOneTwoY,
    boxWidth,
    boxHeight
  );
  drawIconInBoxCenter(
    getPollenFlowersImage(),
    firstBoxX + boxWidth + boxOneTwoGap,
    boxOneTwoY,
    boxWidth,
    boxHeight,
    boxIconSize
  );
}

function drawBoxThree(rightBoxX, rightBoxWidth) {
  let boxWidth = boxThreeImage.width * boxThreeScale;
  let boxHeight = boxThreeImage.height * boxThreeScale;
  let boxX =
    rightBoxX + rightBoxWidth / 2 - boxWidth / 2;

  image(
    boxThreeImage,
    boxX,
    boxThreeY,
    boxWidth,
    boxHeight
  );

  drawIconInBoxCenter(
    getHandLikedRootsImage(),
    boxX,
    boxThreeY,
    boxWidth,
    boxHeight,
    boxThreeIconSize
  );
}

function drawBoxFourFive(rightBoxX, rightBoxWidth) {
  let boxWidth = boxFourFiveImage.width * boxFourFiveScale;
  let boxHeight = boxFourFiveImage.height * boxFourFiveScale;
  let boxX =
    rightBoxX + rightBoxWidth / 2 - boxWidth / 2;

  image(
    boxFourFiveImage,
    boxX,
    boxFourFiveY,
    boxWidth,
    boxHeight
  );

  drawIconInBoxCenter(
    getLungsImage(),
    boxX,
    boxFourFiveY,
    boxWidth,
    boxHeight,
    lungsIconSize
  );
}

function getSmokeStackImage() {
  if (isBaldManAtGifState()) {
    return smokeStackGif;
  }

  return smokeStackImage;
}

function getPollenFlowersImage() {
  if (isBaldManAtGifState()) {
    return pollenFlowersGif;
  }

  return pollenFlowersImage;
}

function getHandLikedRootsImage() {
  if (isBaldManAtGifState()) {
    return handLikedRootsGif;
  }

  return handLikedRootsImage;
}

function getLungsImage() {
  if (isBaldManAtGifState()) {
    return lungsGif;
  }

  return lungsImage;
}

function resizeDustCloudAssets() {
  for (let dustCloudImage of dustCloudImages) {
    dustCloudImage.resize(
      dustCloudAssetSize,
      dustCloudAssetSize
    );
  }

  for (let dustCloudGif of dustCloudGifs) {
    dustCloudGif.resize(
      dustCloudAssetSize,
      dustCloudAssetSize
    );
  }
}

function updatePollutedGifPlayback() {
  updateDustCloudSpeeds();

  if (isBaldManAtFinalState()) {
    wasBaldManAtFinalState = true;
    playPollutedGifs();
    return;
  }

  if (wasBaldManAtFinalState) {
    createDustClouds();
    wasBaldManAtFinalState = false;
  }

  pausePollutedGifs();
}

function playPollutedGifs() {
  if (arePollutedGifsPlaying) {
    return;
  }

  setPollutedGifPlayback(true);
  arePollutedGifsPlaying = true;
}

function pausePollutedGifs() {
  if (!arePollutedGifsPlaying) {
    return;
  }

  setPollutedGifPlayback(false);
  arePollutedGifsPlaying = false;
}

function setPollutedGifPlayback(shouldPlay) {
  let pollutedGifs = [
    smokeStackGif,
    pollenFlowersGif,
    handLikedRootsGif,
    lungsGif
  ];

  for (let dustCloudGif of dustCloudGifs) {
    pollutedGifs.push(dustCloudGif);
  }

  for (let pollutedGif of pollutedGifs) {
    if (shouldPlay && pollutedGif.play) {
      pollutedGif.play();
    } else if (!shouldPlay && pollutedGif.pause) {
      pollutedGif.pause();
    }
  }
}

function resizePollutedAssets() {
  smokeStackImage.resize(
    smokeStackIconSize,
    smokeStackIconSize
  );
  smokeStackGif.resize(
    smokeStackIconSize,
    smokeStackIconSize
  );

  pollenFlowersImage.resize(boxIconSize, boxIconSize);
  pollenFlowersGif.resize(boxIconSize, boxIconSize);

  handLikedRootsImage.resize(
    boxThreeIconSize,
    boxThreeIconSize
  );
  handLikedRootsGif.resize(
    boxThreeIconSize,
    boxThreeIconSize
  );

  lungsImage.resize(lungsIconSize, lungsIconSize);
  lungsGif.resize(lungsIconSize, lungsIconSize);
}

function drawIconInBoxCenter(
  iconImage,
  boxX,
  boxY,
  boxWidth,
  boxHeight,
  iconSize
) {
  let jitter = getFinalStateJitter(
    boxX * 0.01 + boxY * 0.02
  );

  image(
    iconImage,
    boxX + boxWidth / 2 - iconSize / 2 + jitter.x,
    boxY + boxHeight / 2 - iconSize / 2 + jitter.y,
    iconSize,
    iconSize
  );
}

function drawIconInBoxBottom(
  iconImage,
  boxX,
  boxY,
  boxWidth,
  boxHeight,
  iconSize,
  bottomMargin,
  offsetY
) {
  let jitter = getFinalStateJitter(
    boxX * 0.01 + boxY * 0.02
  );

  image(
    iconImage,
    boxX + boxWidth / 2 - iconSize / 2 + jitter.x,
    boxY +
      boxHeight -
      iconSize -
      bottomMargin +
      offsetY +
      jitter.y,
    iconSize,
    iconSize
  );
}

function drawInstruction() {
  image(
    instructionImage,
    width / 2 - instructionImage.width / 2,
    height / 2 - instructionImage.height / 2
  );

  image(
    instructionMainImage,
    instructionMainX,
    instructionMainY
  );
}

function drawNavigationButtons() {
  drawHoverImage(
    instructionButtonImage,
    instructionButtonX,
    instructionButtonY
  );

  drawHoverImage(
    backButtonImage,
    backButtonX,
    backButtonY
  );

  drawHoverImage(
    nextButtonImage,
    nextButtonX,
    nextButtonY
  );
}

// VEHICLES

function createVehicles() {
  movingVehicles = [];
  let nextVehicleX = 0;
  let vehicleCount = floor(
    random(minimumVehiclesOnRoad, maximumVehiclesOnRoad + 1)
  );

  for (let i = 0; i < vehicleCount; i++) {
    let vehicle = createVehicle();
    let vehicleSize = getVehicleSize(vehicle);

    vehicle.x = nextVehicleX - vehicleSize.width;
    nextVehicleX = vehicle.x - minimumVehicleGap;

    movingVehicles.push(vehicle);
  }
}

function createVehicle() {
  let vehicleType = random(vehicleTypes);
  let vehicleImage = vehicleImagesByType[vehicleType];

  return {
    image: vehicleImage,
    type: vehicleType,
    isElectric: false,
    hasTriggeredTeeth: false,
    x: -vehicleImage.width,
    y: height * 0.66 + random(-35, 35),
    speed: random(4, 6)
  };
}

function updateVehicles() {
  for (let vehicle of movingVehicles) {
    vehicle.previousX = vehicle.x;

    if (isHoveringNonElectricVehicle(vehicle)) {
      continue;
    }

    vehicle.x += vehicle.speed;
    emitVehicleSmoke(vehicle);
    emitCleanVehicleParticles(vehicle);

    if (vehicle.x > width + getVehicleSize(vehicle).width) {
      resetVehicle(vehicle);
    }
  }

  keepVehiclesSeparated();

  for (let vehicle of movingVehicles) {
    checkVehicleTouchingBaldMan(vehicle);
  }
}

function checkVehicleTouchingBaldMan(vehicle) {
  let vehicleLeftSide = vehicle.x;

  if (
    vehicleLeftSide >= baldManHitX &&
    !vehicle.hasTriggeredTeeth
  ) {
    if (isBaldManAtFinalState()) {
      recordFinalStateVehicle(vehicle);
      vehicle.hasTriggeredTeeth = true;
      return;
    }

    queueTeethBite(vehicle);
    vehicle.hasTriggeredTeeth = true;
  }
}

function resetVehicle(vehicle) {
  let newVehicle = createVehicle();

  removeSmokeParticlesForVehicle(vehicle);

  // Keep the same vehicle object so particles and spacing code can keep their references stable while the visual type changes after it exits the screen.
  vehicle.image = newVehicle.image;
  vehicle.type = newVehicle.type;
  vehicle.isElectric = false;
  vehicle.hasTriggeredTeeth = false;
  vehicle.x = getNextVehicleStartX(vehicle);
  vehicle.y = newVehicle.y;
  vehicle.speed = newVehicle.speed;
}

function getNextVehicleStartX(vehicleToReset) {
  let leftMostX = 0;

  for (let vehicle of movingVehicles) {
    if (
      vehicle !== vehicleToReset &&
      vehicle.x < leftMostX
    ) {
      leftMostX = vehicle.x;
    }
  }

  return (
    leftMostX -
    getVehicleSize(vehicleToReset).width -
    minimumVehicleGap
  );
}

function keepVehiclesSeparated() {
  let vehiclesByPosition = [...movingVehicles];

  vehiclesByPosition.sort(function(vehicleA, vehicleB) {
    return vehicleB.x - vehicleA.x;
  });

  for (let i = 1; i < vehiclesByPosition.length; i++) {
    let frontVehicle = vehiclesByPosition[i - 1];
    let currentVehicle = vehiclesByPosition[i];

    if (
      isHoveringNonElectricVehicle(frontVehicle) ||
      isHoveringNonElectricVehicle(currentVehicle)
    ) {
      // Hovered vehicles intentionally stop, so spacing correction waits until both vehicles are moving again to avoid the "jump backwards" effect.
      continue;
    }

    let currentVehicleSize = getVehicleSize(currentVehicle);
    let furthestAllowedX =
      frontVehicle.x -
      currentVehicleSize.width -
      minimumVehicleGap;

    if (
      currentVehicle.previousX <= furthestAllowedX &&
      currentVehicle.x > furthestAllowedX
    ) {
      currentVehicle.x = furthestAllowedX;
    }
  }
}

function drawVehicles() {
  let sortedVehicles = [...movingVehicles];

  sortedVehicles.sort(function(vehicleA, vehicleB) {
    return vehicleA.y - vehicleB.y;
  });

  for (let vehicle of sortedVehicles) {
    let vehicleSize = getVehicleSize(vehicle);
    let vehicleScale = 1;

    if (isHoveringNonElectricVehicle(vehicle)) {
      vehicleScale = buttonHoverScale;
    }

    let scaledWidth = vehicleSize.width * vehicleScale;
    let scaledHeight = vehicleSize.height * vehicleScale;
    let vehicleX =
      vehicle.x - (scaledWidth - vehicleSize.width) / 2;
    let vehicleY =
      vehicle.y -
      vehicleSize.height -
      (scaledHeight - vehicleSize.height) / 2;
    let jitter = getFinalStateJitter(vehicle.y * 0.01);

    image(
      vehicle.image,
      vehicleX + jitter.x,
      vehicleY + jitter.y,
      scaledWidth,
      scaledHeight
    );
  }
}

function getVehicleSize(vehicle) {
  let vehicleWidth = vehicle.image.width;
  let vehicleHeight = vehicle.image.height;

  if (vehicle.type === "bus") {
    vehicleWidth *= 0.8;
    vehicleHeight *= 0.8;
  }

  return {
    width: vehicleWidth,
    height: vehicleHeight
  };
}

function emitVehicleSmoke(vehicle) {
  if (vehicle.isElectric) {
    return;
  }

  if (
    vehicle.lastSmokeEmitTime &&
    millis() - vehicle.lastSmokeEmitTime < getSmokeEmitInterval()
  ) {
    return;
  }

  vehicle.lastSmokeEmitTime = millis();

  let smokeCount = getSmokeEmitCount();
  let vehicleSize = getVehicleSize(vehicle);
  let smokeX = vehicle.x + vehicleSize.width * 0.08;
  let smokeY =
    vehicle.y - vehicleSize.height * random(0.35, 0.62);

  for (let i = 0; i < smokeCount; i++) {
    let smokeImage = random(khoiImages);

    vehicleSmokeParticles.push({
      vehicle: vehicle,
      image: smokeImage,
      startTime: millis(),
      xOffset: random(-12, 18),
      yOffset: random(-14, 14),
      driftX: random(-28, -10),
      driftY: random(-24, 10),
      baseX: smokeX,
      baseY: smokeY,
      vehicleStartX: vehicle.x,
      size: getSmokeParticleSize(),
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.12, 0.12)
    });
  }
}

function getSmokeEmitInterval() {
  if (isBaldManAtFinalState()) {
    return finalStateSmokeEmitInterval;
  }

  return smokeEmitInterval;
}

function getSmokeEmitCount() {
  if (isBaldManAtFinalState()) {
    return floor(
      random(finalStateSmokeMinCount, finalStateSmokeMaxCount)
    );
  }

  return floor(random(4, 6));
}

function getSmokeParticleSize() {
  if (isBaldManAtFinalState()) {
    return random(
      finalStateSmokeMinSize,
      finalStateSmokeMaxSize
    );
  }

  return random(smokeMinSize, smokeMaxSize);
}

function drawVehicleSmokeParticles() {
  for (let i = vehicleSmokeParticles.length - 1; i >= 0; i--) {
    let smokeParticle = vehicleSmokeParticles[i];
    let age = millis() - smokeParticle.startTime;
    let progress = age / smokeParticleLifetime;

    if (progress >= 1) {
      vehicleSmokeParticles.splice(i, 1);
      continue;
    }

    drawVehicleSmokeParticle(smokeParticle, progress);
  }
}

function drawVehicleSmokeParticle(smokeParticle, progress) {
  let smokeAlpha = lerp(190, 0, progress);
  let smokeSize =
    max(
      smokeParticle.image.width,
      smokeParticle.image.height
    ) *
    smokeParticle.size *
    lerp(0.7, 1.35, progress);
  let vehicleOffset = 0;

  if (smokeParticle.vehicle) {
    vehicleOffset =
      smokeParticle.vehicle.x - smokeParticle.vehicleStartX;
  }

  let smokeX =
    smokeParticle.baseX +
    vehicleOffset +
    smokeParticle.xOffset +
    smokeParticle.driftX * progress;
  let smokeY =
    smokeParticle.baseY +
    smokeParticle.yOffset +
    smokeParticle.driftY * progress;
  let jitter = getFinalStateJitter(smokeY * 0.01);

  push();
  translate(smokeX + jitter.x, smokeY + jitter.y);
  rotate(
    smokeParticle.rotation +
    smokeParticle.rotationSpeed * frameCount
  );
  tint(255, smokeAlpha);
  imageMode(CENTER);
  image(
    smokeParticle.image,
    0,
    0,
    smokeSize,
    smokeSize
  );
  pop();
}

function removeSmokeParticlesForVehicle(vehicle) {
  vehicleSmokeParticles = vehicleSmokeParticles.filter(
    function(smokeParticle) {
      return smokeParticle.vehicle !== vehicle;
    }
  );
}

function emitCleanVehicleParticles(vehicle) {
  if (!vehicle.isElectric) {
    return;
  }

  if (
    vehicle.lastCleanParticleEmitTime &&
    millis() - vehicle.lastCleanParticleEmitTime <
      cleanParticleEmitInterval
  ) {
    return;
  }

  vehicle.lastCleanParticleEmitTime = millis();
  createCleanVehicleParticles(vehicle);
}

function createCleanVehicleParticles(vehicle) {
  let vehicleSize = getVehicleSize(vehicle);
  let particleStartX = vehicleSize.width * 0.08;
  let particleStartY =
    -vehicleSize.height * random(0.35, 0.62);

  for (let i = 0; i < cleanParticleCount; i++) {
    let distance = random(
      cleanParticleTravelDistance * 0.45,
      cleanParticleTravelDistance
    );

    cleanVehicleParticles.push({
      vehicle: vehicle,
      image: random(cleanParticleImages),
      startTime: millis(),
      x: particleStartX + random(-26, 24),
      y: particleStartY + random(-8, 8),
      driftX: -distance,
      driftY: random(-1, 1),
      size: random(cleanParticleMinSize, cleanParticleMaxSize),
      rotation: random(TWO_PI),
      rotationAmount: random(-0.45, 0.45)
    });
  }
}

function drawCleanVehicleParticles() {
  for (let i = cleanVehicleParticles.length - 1; i >= 0; i--) {
    let cleanParticle = cleanVehicleParticles[i];
    let age = millis() - cleanParticle.startTime;
    let progress = age / cleanParticleLifetime;

    if (progress >= 1) {
      cleanVehicleParticles.splice(i, 1);
      continue;
    }

    drawCleanVehicleParticle(cleanParticle, progress);
  }
}

function drawCleanVehicleParticle(cleanParticle, progress) {
  let particleAlpha = lerp(255, 0, progress);
  let vehicleX = 0;
  let vehicleY = 0;

  if (cleanParticle.vehicle) {
    vehicleX = cleanParticle.vehicle.x;
    vehicleY = cleanParticle.vehicle.y;
  }

  let particleX =
    vehicleX +
    cleanParticle.x +
    cleanParticle.driftX *
    easeOutQuad(progress);
  let particleY =
    vehicleY +
    cleanParticle.y +
    cleanParticle.driftY *
    easeOutQuad(progress);
  let particleWidth =
    cleanParticle.image.width *
    cleanParticle.size;
  let particleHeight =
    cleanParticle.image.height *
    cleanParticle.size;
  let jitter = getFinalStateJitter(particleY * 0.01);

  push();
  translate(particleX + jitter.x, particleY + jitter.y);
  rotate(
    cleanParticle.rotation +
    cleanParticle.rotationAmount *
    easeOutQuad(progress)
  );
  tint(255, particleAlpha);
  imageMode(CENTER);
  image(
    cleanParticle.image,
    0,
    0,
    particleWidth,
    particleHeight
  );
  pop();
  noTint();
}

function updateFallingParticles() {
  if (shouldStopFallingParticles()) {
    fallingParticles = [];
    return;
  }

  if (
    millis() - fallingParticleEmitTimer >
      getFallingParticleInterval()
  ) {
    fallingParticleEmitTimer = millis();
    fallingParticles.push(createFallingParticle());
  }

  for (let i = fallingParticles.length - 1; i >= 0; i--) {
    let fallingParticle = fallingParticles[i];
    let layerSpeed = getFallingParticleLayerSpeed(
      fallingParticle.layer
    );

    fallingParticle.x += fallingParticle.driftX * layerSpeed;
    fallingParticle.y += fallingParticle.speedY * layerSpeed;
    fallingParticle.rotation += fallingParticle.rotationSpeed;

    if (fallingParticle.y > height + fallingParticle.size * 2) {
      fallingParticles.splice(i, 1);
    }
  }
}

function getFallingParticleInterval() {
  if (isBaldManAtGifState()) {
    return fallingFlowerLeafGifInterval;
  }

  return fallingFlowerLeafNormalInterval;
}

function shouldStopFallingParticles() {
  return currentBaldManState >= 3;
}

function createFallingParticle() {
  let particleImage = random(cleanParticleImages);
  let particleScale = random(
    fallingFlowerLeafMinSize,
    fallingFlowerLeafMaxSize
  );
  let layer = floor(random(fallingParticleLayerCount));

  return {
    image: particleImage,
    layer: layer,
    x: random(-40, width + 40),
    y: random(-120, -20),
    speedY: random(
      fallingFlowerLeafSpeedMin,
      fallingFlowerLeafSpeedMax
    ),
    driftX: random(
      fallingFlowerLeafDriftMin,
      fallingFlowerLeafDriftMax
    ),
    size: particleScale,
    rotation: random(TWO_PI),
    rotationSpeed: random(-0.012, 0.012)
  };
}

function getFallingParticleLayerSpeed(layer) {
  return 0.45 + layer * 0.35;
}

function drawFallingParticleLayer(layer) {
  for (let fallingParticle of fallingParticles) {
    if (fallingParticle.layer !== layer) {
      continue;
    }

    let particleWidth =
      fallingParticle.image.width *
      fallingParticle.size;
    let particleHeight =
      fallingParticle.image.height *
      fallingParticle.size;

    push();
    translate(fallingParticle.x, fallingParticle.y);
    rotate(fallingParticle.rotation);
    imageMode(CENTER);
    image(
      fallingParticle.image,
      0,
      0,
      particleWidth,
      particleHeight
    );
    pop();
  }
}

// TEETH

function queueTeethBite(vehicle) {
  pendingTeethBites.push({
    type: vehicle.type,
    isElectric: vehicle.isElectric
  });

  startNextPendingTeethBite();
}

function startNextPendingTeethBite() {
  if (isBaldManAtFinalState()) {
    pendingTeethBites = [];
    activeTeethBite = null;
    return;
  }

  if (teethAnimationState !== "open") {
    return;
  }

  if (pendingTeethBites.length === 0) {
    return;
  }

  activeTeethBite = pendingTeethBites.shift();

  teethHoldDuration =
    getTeethHoldDuration(activeTeethBite.type);
  teethAnimationState = "closing";
  teethAnimationStartTime = millis();
}

function recordVehicleSwallowed() {
  if (!activeTeethBite) {
    return;
  }

  if (activeTeethBite.isElectric) {
    recordElectricVehicleSwallowed();
    return;
  }

  pollutedVehiclesSwallowed++;

  // Different states need different numbers of polluted vehicles
  if (pollutedVehiclesSwallowed >= getPollutedVehicleStateThreshold()) {
    setBaldManState(currentBaldManState + 1);

    if (isBaldManAtFinalState()) {
      setBaldManState(baldManImages.length - 1);
      finalStateElectricVehiclesSwallowed = 0;
      pendingTeethBites = [];
      activeTeethBite = null;
      teethAnimationState = "open";
    }
  }
}

function recordFinalStateVehicle(vehicle) {
  if (vehicle.isElectric) {
    recordElectricVehicleSwallowed();
  }
}

function recordElectricVehicleSwallowed() {
  if (isBaldManAtFinalState()) {
    finalStateElectricVehiclesSwallowed++;

    if (
      finalStateElectricVehiclesSwallowed >=
      finalStateElectricVehicleThreshold
    ) {
      setBaldManState(0);
    }

    return;
  }

  electricVehiclesSwallowed++;

  if (
    electricVehiclesSwallowed >= electricVehicleStateThreshold &&
    currentBaldManState > 0
  ) {
    setBaldManState(currentBaldManState - 1);
  }
}

function getPollutedVehicleStateThreshold() {
  return pollutedVehicleStateThresholds[
    constrain(
      currentBaldManState,
      0,
      pollutedVehicleStateThresholds.length - 1
    )
  ];
}

function setBaldManState(nextState) {
  let previousState = currentBaldManState;

  currentBaldManState = constrain(
    nextState,
    0,
    baldManImages.length - 1
  );

  if (currentBaldManState !== previousState) {
    // State changes start a fresh "how many vehicles have been swallowed" count, otherwise old progress would leak into the next visual state.
    pollutedVehiclesSwallowed = 0;
    electricVehiclesSwallowed = 0;

    if (!isBaldManAtFinalState()) {
      finalStateElectricVehiclesSwallowed = 0;
    }
  }

  if (
    currentBaldManState !== previousState &&
    currentBaldManState > previousState
  ) {
    playBaldManStateSound(currentBaldManState);
  }

  updateFinalStateSoundLoops();
  updateNoiseAmbienceVolume();
}

function isBaldManAtFinalState() {
  return currentBaldManState >= baldManImages.length - 1;
}

function isBaldManAtGifState() {
  return currentBaldManState >= 2;
}

function getTeethHoldDuration(vehicleType) {
  if (vehicleType === "bike") {
    return 400;
  }

  if (vehicleType === "bus") {
    return 700;
  }

  return 600;
}

function updateTeethAnimation() {
  if (teethAnimationState === "open") {
    upperTeethY = upperTeethOpenY;
    lowerTeethY = lowerTeethOpenY;
    return;
  }

  if (teethAnimationState === "closing") {
    updateTeethClosing();
    return;
  }

  if (teethAnimationState === "holding") {
    updateTeethHolding();
    return;
  }

  if (teethAnimationState === "opening") {
    updateTeethOpening();
  }
}

function updateTeethClosing() {
  let progress =
    (millis() - teethAnimationStartTime) /
    teethBiteDuration;

  progress = constrain(progress, 0, 1);

  let easedProgress = easeInQuad(progress);

  upperTeethY = lerp(
    upperTeethOpenY,
    upperTeethClosedY,
    easedProgress
  );

  lowerTeethY = lerp(
    lowerTeethOpenY,
    lowerTeethClosedY,
    easedProgress
  );

  if (progress >= 1) {
    recordVehicleSwallowed();

    if (isBaldManAtFinalState()) {
      return;
    }

    teethAnimationState = "holding";
    teethAnimationStartTime = millis();
  }
}

function updateTeethHolding() {
  upperTeethY = upperTeethClosedY;
  lowerTeethY = lowerTeethClosedY;

  if (
    millis() - teethAnimationStartTime >=
    teethHoldDuration
  ) {
    teethAnimationState = "opening";
    teethAnimationStartTime = millis();
  }
}

function updateTeethOpening() {
  let progress =
    (millis() - teethAnimationStartTime) /
    teethOpenDuration;

  progress = constrain(progress, 0, 1);

  upperTeethY = lerp(
    upperTeethClosedY,
    upperTeethOpenY,
    progress
  );

  lowerTeethY = lerp(
    lowerTeethClosedY,
    lowerTeethOpenY,
    progress
  );

  if (progress >= 1) {
    teethAnimationState = "open";
    activeTeethBite = null;
    startNextPendingTeethBite();
  }
}

function easeInQuad(value) {
  return value * value;
}

function easeOutQuad(value) {
  return 1 - (1 - value) * (1 - value);
}

// POPUP

function drawPopUpBox() {
  if (!isPopUpVisible) {
    return;
  }

  image(popUpBoxImage, 0, 0);

  drawSelectedVehiclePopUp();
  drawPopUpInstructionOne();

  push();
  resetMatrix();
  drawChangeSlider();
  drawConfirmButton();
  pop();
}

function drawPopUpInstructionOne() {
  image(
    instructionOneImage,
    popUpInstructionX,
    popUpInstructionY
  );
}

function drawSelectedVehiclePopUp() {
  let gasVehicleImage = getSelectedGasPopUpImage();
  let electricVehicleImage = getSelectedElectricPopUpImage();

  if (!gasVehicleImage || !electricVehicleImage) {
    return;
  }

  let popUpCenterX = width / 2;
  let popUpCenterY =
    height / 2 +
    popUpVehicleOffsetY;
  // The slider is split into two halves: first the polluted vehicle shrinks away, then the electric version grows from the same center point.
  let gasAmount =
    1 - constrain(changeSliderProgress / 0.5, 0, 1);
  let electricAmount =
    constrain((changeSliderProgress - 0.5) / 0.5, 0, 1);

  drawPopUpVehicleTransformImage(
    gasVehicleImage,
    popUpCenterX,
    popUpCenterY,
    gasAmount
  );

  drawPopUpVehicleTransformImage(
    electricVehicleImage,
    popUpCenterX,
    popUpCenterY,
    electricAmount
  );
}

function drawPopUpVehicleTransformImage(
  vehicleImage,
  centerX,
  centerY,
  amount
) {
  if (amount <= 0) {
    return;
  }

  push();
  tint(255, 255 * amount);
  imageMode(CENTER);
  image(
    vehicleImage,
    centerX,
    centerY,
    vehicleImage.width * amount,
    vehicleImage.height * amount
  );
  pop();
  noTint();
}

// REST OF FILE REMAINING UNCHANGED FROM SOURCE SKETCH
function getSelectedGasPopUpImage() {
  return popUpImagesByType[selectedVehicleType] || null;
}

function getSelectedElectricPopUpImage() {
  return electricPopUpImagesByType[selectedVehicleType] || null;
}

function drawChangeSlider() {
  updateChangeSliderMotion();

  let sliderX = getChangeSliderX();
  let sliderY = getChangeSliderY();
  let sliderWidth = getChangeSliderWidth();
  let sliderHeight = getChangeSliderHeight();
  let navWidth = getChangeSliderNavWidth();
  let navHeight = getChangeSliderNavHeight();
  let navCenterX =
    sliderX + sliderWidth * changeSliderProgress;
  let navCenterY =
    sliderY +
    sliderHeight / 2;
  let navRotation =
    changeSliderProgress *
    TWO_PI *
    changeSliderRotationTurns;

  image(slideBarImage, sliderX, sliderY, sliderWidth, sliderHeight);
  drawChangeSliderBacteria(
    sliderX,
    sliderY,
    sliderWidth,
    sliderHeight
  );

  push();
  translate(navCenterX, navCenterY);
  rotate(navRotation);
  imageMode(CENTER);
  image(slideNavImage, 0, 0, navWidth, navHeight);
  pop();

  drawDragThisHint(sliderX, sliderY, sliderWidth, sliderHeight);
}

function drawDragThisHint(
  sliderX,
  sliderY,
  sliderWidth,
  sliderHeight
) {
  let dragThisX =
    sliderX +
    sliderWidth / 2 -
    dragThisImage.width / 2 +
    dragThisOffsetX +
    sin(frameCount * dragThisMoveSpeed) *
    dragThisMoveAmount;
  let dragThisY =
    sliderY +
    sliderHeight +
    dragThisOffsetY;

  image(dragThisImage, dragThisX, dragThisY);
}

function createChangeSliderBacteria() {
  changeSliderBacteria = [];

  for (let i = 0; i < changeSliderBacteriaCount; i++) {
    changeSliderBacteria.push({
      image: random(bacteriaImages),
      progress: random(0.02, 0.98),
      yRatio: random(0.12, 0.88),
      size: random(
        changeSliderBacteriaMinSize,
        changeSliderBacteriaMaxSize
      ),
      phase: random(TWO_PI),
      popSpeed: random(0.06, 0.12),
      rotation: random(-0.4, 0.4)
    });
  }

  changeSliderBacteria.sort(function(bacteriaA, bacteriaB) {
    return bacteriaA.progress - bacteriaB.progress;
  });
}

function drawChangeSliderBacteria(
  sliderX,
  sliderY,
  sliderWidth,
  sliderHeight
) {
  for (let bacteria of changeSliderBacteria) {
    let visibleAmount = constrain(
      map(
        bacteria.progress - changeSliderProgress,
        -0.02,
        0.08,
        0,
        1
      ),
      0,
      1
    );

    if (visibleAmount <= 0) {
      continue;
    }

    let popAmount =
      0.85 +
      sin(frameCount * bacteria.popSpeed + bacteria.phase) * 0.15;
    let bacteriaHeight =
      bacteria.size *
      popAmount *
      visibleAmount;
    let bacteriaWidth =
      bacteriaHeight *
      (bacteria.image.width / bacteria.image.height);
    let bacteriaX =
      sliderX + sliderWidth * bacteria.progress;
    let bacteriaY =
      sliderY + sliderHeight * bacteria.yRatio;

    push();
    translate(bacteriaX, bacteriaY);
    rotate(bacteria.rotation);
    tint(255, 255 * visibleAmount);
    imageMode(CENTER);
    image(
      bacteria.image,
      0,
      0,
      bacteriaWidth,
      bacteriaHeight
    );
    pop();
  }

  noTint();
}

function drawConfirmButton() {
  if (hasVehicleChanged) {
    image(yesButtonImage, noButtonX, noButtonY);
  } else {
    image(noButtonImage, noButtonX, noButtonY);
  }
}

// MOUSE

function mousePressed() {
  startUserAudioContext();

  if (isPopUpVisible) {
    if (startDraggingChangeSlider()) {
      return;
    }

    playRandomClickSound();
    closePopUpIfClickingConfirmButton();
    return;
  }

  playRandomClickSound();

  if (startDraggingDustCloud()) {
    return;
  }

  if (handleNavigationButtonClick()) {
    return;
  }

  if (isInstructionVisible) {
    return;
  }

  openPopUpIfClickingVehicle();
}

function mouseDragged() {
  if (isDraggingChangeSlider) {
    updateChangeSliderFromMouse();
    return;
  }

  if (!draggedDustCloud) {
    return;
  }

  draggedDustCloud.x =
    getCanvasMouseX() - dustCloudDragOffsetX;
  draggedDustCloud.y =
    getCanvasMouseY() -
    dustCloudDragOffsetY -
    sin(frameCount * 0.015 + draggedDustCloud.waveOffset) *
    draggedDustCloud.waveSize;
}

function mouseReleased() {
  if (
    isDraggingChangeSlider &&
    changeSliderTargetProgress >= changeSliderCompleteProgress
  ) {
    changeSliderProgress = 1;
    changeSliderTargetProgress = 1;
    hasVehicleChanged = true;
  }

  isDraggingChangeSlider = false;
  pauseSmokeEmitsSound();
  draggedDustCloud = null;
}

function startDraggingChangeSlider() {
  if (!isClickingChangeSlider()) {
    return false;
  }

  isDraggingChangeSlider = true;
  updateChangeSliderTargetFromMouse();

  return true;
}

function updateChangeSliderFromMouse() {
  updateChangeSliderTargetFromMouse();
}

function updateChangeSliderTargetFromMouse() {
  let sliderX = getChangeSliderX();

  changeSliderTargetProgress = constrain(
    (mouseX - sliderX) / getChangeSliderWidth(),
    0,
    1
  );
}

function updateChangeSliderMotion() {
  if (isDraggingChangeSlider) {
    if (abs(changeSliderTargetProgress - changeSliderProgress) > 0.001) {
      playSmokeEmitsSound();
    } else {
      pauseSmokeEmitsSound();
    }

    changeSliderProgress = lerp(
      changeSliderProgress,
      changeSliderTargetProgress,
      changeSliderDragSpeed
    );
  }

  if (
    changeSliderProgress >= changeSliderCompleteProgress &&
    changeSliderTargetProgress >= changeSliderCompleteProgress
  ) {
    changeSliderProgress = 1;
    changeSliderTargetProgress = 1;
    hasVehicleChanged = true;
  } else if (
    changeSliderTargetProgress < changeSliderCompleteProgress &&
    (!selectedVehicle || !selectedVehicle.isElectric)
  ) {
    hasVehicleChanged = false;
  }
}

function startDraggingDustCloud() {
  if (isBaldManAtFinalState()) {
    return false;
  }

  if (!hoveredDustCloud) {
    return false;
  }

  draggedDustCloud = hoveredDustCloud;
  dustCloudDragOffsetX =
    getCanvasMouseX() - draggedDustCloud.x;
  dustCloudDragOffsetY =
    getCanvasMouseY() -
    getDustCloudFloatingY(draggedDustCloud);

  return true;
}

function handleNavigationButtonClick() {
  if (
    isClickingImage(
      instructionButtonImage,
      instructionButtonX,
      instructionButtonY
    )
  ) {
    isInstructionVisible = !isInstructionVisible;
    updateVehiclePauseState();
    return true;
  }

  if (isInstructionVisible) {
    isInstructionVisible = false;
    updateVehiclePauseState();
    return true;
  }

  if (
    isClickingImage(
      backButtonImage,
      backButtonX,
      backButtonY
    )
  ) {
    redirectToPage("../chik-p5/index.html");
    return true;
  }

  if (
    isClickingImage(
      nextButtonImage,
      nextButtonX,
      nextButtonY
    )
  ) {
    redirectToPage("../ceo-p5/index.html");
    return true;
  }

  return false;
}

function redirectToPage(pagePath) {
  window.location.href = pagePath;
}

function openPopUpIfClickingVehicle() {
  for (let vehicle of movingVehicles) {
    if (isClickingVehicle(vehicle)) {
      isPopUpVisible = true;
      updateVehiclePauseState();
      selectedVehicleType = vehicle.type;
      selectedVehicle = vehicle;
      hasVehicleChanged = vehicle.isElectric;
      changeSliderProgress = vehicle.isElectric ? 1 : 0;
      changeSliderTargetProgress = changeSliderProgress;
      isDraggingChangeSlider = false;
      createChangeSliderBacteria();

      break;
    }
  }
}

function closePopUpIfClickingConfirmButton() {
  let confirmButtonImage = noButtonImage;

  if (hasVehicleChanged) {
    confirmButtonImage = yesButtonImage;
  }

  if (
    isClickingScreenRectangle(
      noButtonX,
      noButtonY,
      confirmButtonImage.width,
      confirmButtonImage.height
    )
  ) {
    if (hasVehicleChanged) {
      playSoundOnce(afterClickYesSound);
    }

    if (
      hasVehicleChanged &&
      selectedVehicle &&
      !selectedVehicle.isElectric
    ) {
      changeVehicleImageToElectric();
    }

    closePopUp();
  }
}

function changeVehicleImageToElectric() {
  removeSmokeParticlesForVehicle(selectedVehicle);
  createCleanVehicleParticles(selectedVehicle);

  selectedVehicle.image =
    electricVehicleImagesByType[selectedVehicle.type];
  selectedVehicle.isElectric = true;
  selectedVehicle.lastCleanParticleEmitTime = 0;
}

// SOUND PROCESSING LOGIC
function playRandomClickSound() {
  playSoundOnce(random(clickSounds));
}

function startNoiseAmbienceAfterIntro(shouldRetry) {
  if (hasNoiseAmbienceStarted && !shouldRetry) {
    return;
  }

  if (!noiseAmbienceSound) {
    return;
  }

  if (!noiseAmbienceSound.isPlaying()) {
    noiseAmbienceSound.loop();
  }

  updateNoiseAmbienceVolume();
  hasNoiseAmbienceStarted = true;
}

function updateNoiseAmbienceVolume() {
  if (!noiseAmbienceSound) {
    return;
  }

  let ambienceVolume = normalAmbienceVolume;

  if (isBaldManAtFinalState()) {
    ambienceVolume = finalStateAmbienceVolume;
  }

  noiseAmbienceSound.setVolume(isMuted ? 0 : ambienceVolume);
}

function updateVehicleHoverSounds() {
  if (isPopUpVisible || isInstructionVisible) {
    lastHoveredHonkVehicle = null;
    return;
  }

  let hoveredVehicle = getHoveredNonElectricVehicle();

  if (
    hoveredVehicle &&
    hoveredVehicle !== lastHoveredHonkVehicle
  ) {
    playVehicleHonkSound(hoveredVehicle.type);
  }

  lastHoveredHonkVehicle = hoveredVehicle;
}

function playVehicleHonkSound(vehicleType) {
  playSoundOnce(honkSoundsByType[vehicleType]);
}

function playBaldManStateSound(stateIndex) {
  playSoundOnce(stateSounds[stateIndex]);
}

function updateFinalStateSoundLoops() {
  if (isBaldManAtFinalState()) {
    if (slimySound && !slimySound.isPlaying()) {
      slimySound.loop();
    }

    if (xrayScanSound && !xrayScanSound.isPlaying()) {
      xrayScanSound.loop();
    }

    return;
  }

  if (slimySound && slimySound.isPlaying()) {
    slimySound.stop();
  }

  if (xrayScanSound && xrayScanSound.isPlaying()) {
    xrayScanSound.stop();
  }
}

function playSmokeEmitsSound() {
  if (!smokeEmitsSound || smokeEmitsSound.isPlaying()) {
    return;
  }

  smokeEmitsSound.play();
}

function pauseSmokeEmitsSound() {
  if (!smokeEmitsSound || !smokeEmitsSound.isPlaying()) {
    return;
  }

  smokeEmitsSound.pause();
}

function playSoundOnce(soundToPlay) {
  if (!soundToPlay) {
    return;
  }

  if (soundToPlay.isPlaying()) {
    soundToPlay.stop();
  }

  soundToPlay.play();
}

function keyPressed() {
  handleMuteKeyPress(key);
}

function handleWindowKeyDown(event) {
  if (event.repeat) {
    return;
  }

  handleMuteKeyPress(event.key);
}

function handleMuteKeyPress(pressedKey) {
  startUserAudioContext();

  if (pressedKey !== "m" && pressedKey !== "M") {
    return;
  }

  if (millis() - lastMuteToggleTime < muteToggleDebounceMs) {
    return;
  }

  lastMuteToggleTime = millis();
  toggleMute();
}

function startUserAudioContext() {
  if (typeof userStartAudio === "function") {
    userStartAudio();
  }

  if (introNameState === "FINISHED") {
    startNoiseAmbienceAfterIntro(true);
  }
}

function toggleMute() {
  isMuted = !isMuted;
  setMasterMute();
}

function setMasterMute() {
  if (typeof masterVolume === "function") {
    masterVolume(isMuted ? 0 : 1);
  }

  updateSoundFileVolumes();
}

function updateSoundFileVolumes() {
  let soundVolume = isMuted ? 0 : 1;
  let soundFiles = [
    ...clickSounds,
    smokeEmitsSound,
    afterClickYesSound,
    slimySound,
    xrayScanSound,
    ...stateSounds,
    ...Object.values(honkSoundsByType)
  ];

  for (let soundFile of soundFiles) {
    if (soundFile && soundFile.setVolume) {
      soundFile.setVolume(soundVolume);
    }
  }

  updateNoiseAmbienceVolume();
}

// HELPERS

function closePopUp() {
  isPopUpVisible = false;
  updateVehiclePauseState();
  pauseSmokeEmitsSound();
  selectedVehicleType = "";
  selectedVehicle = null;
  hasVehicleChanged = false;
  changeSliderProgress = 0;
  changeSliderTargetProgress = 0;
  isDraggingChangeSlider = false;
}

function updateVehiclePauseState() {
  areVehiclesPaused = isPopUpVisible || isInstructionVisible;
}

function isClickingChangeSlider() {
  return isClickingChangeSliderNav();
}

function isClickingChangeSliderNav() {
  let sliderX = getChangeSliderX();
  let sliderY = getChangeSliderY();
  let sliderWidth = getChangeSliderWidth();
  let sliderHeight = getChangeSliderHeight();
  let navWidth = getChangeSliderNavWidth();
  let navHeight = getChangeSliderNavHeight();
  let navCenterX =
    sliderX + sliderWidth * changeSliderProgress;
  let navX = navCenterX - navWidth / 2;
  let navY =
    sliderY +
    sliderHeight / 2 -
    navHeight / 2;

  return isClickingScreenRectangle(
    navX,
    navY,
    navWidth,
    navHeight
  );
}

function getChangeSliderX() {
  return width / 2 - getChangeSliderWidth() / 2 + changeSliderOffsetX;
}

function getChangeSliderY() {
  return changeSliderY;
}

function getChangeSliderWidth() {
  return slideBarImage.width * changeSliderScale;
}

function getChangeSliderHeight() {
  return slideBarImage.height * changeSliderScale;
}

function getChangeSliderNavWidth() {
  return slideNavImage.width * changeSliderScale;
}

function getChangeSliderNavHeight() {
  return slideNavImage.height * changeSliderScale;
}

function isHoveringNonElectricVehicle(vehicle) {
  return vehicle === getHoveredNonElectricVehicle();
}

function getHoveredNonElectricVehicle() {
  let sortedVehicles = [...movingVehicles];

  sortedVehicles.sort(function(vehicleA, vehicleB) {
    return vehicleB.y - vehicleA.y;
  });

  for (let vehicle of sortedVehicles) {
    if (!vehicle.isElectric && isClickingVehicle(vehicle)) {
      return vehicle;
    }
  }

  return null;
}

function drawHoverImage(buttonImage, buttonX, buttonY) {
  let buttonScale = 1;

  if (isClickingImage(buttonImage, buttonX, buttonY)) {
    buttonScale = buttonHoverScale;
  }

  let scaledWidth = buttonImage.width * buttonScale;
  let scaledHeight = buttonImage.height * buttonScale;

  image(
    buttonImage,
    buttonX - (scaledWidth - buttonImage.width) / 2,
    buttonY - (scaledHeight - buttonImage.height) / 2,
    scaledWidth,
    scaledHeight
  );
}

function isClickingImage(buttonImage, buttonX, buttonY) {
  return isClickingScreenRectangle(
    buttonX,
    buttonY,
    buttonImage.width,
    buttonImage.height
  );
}

function isClickingVehicle(vehicle) {
  let vehicleSize = getVehicleSize(vehicle);

  let vehicleX = vehicle.x - vehicleHoverPadding;
  let vehicleY =
    vehicle.y - vehicleSize.height - vehicleHoverPadding;

  return isClickingRectangle(
    vehicleX,
    vehicleY,
    vehicleSize.width + vehicleHoverPadding * 2,
    vehicleSize.height + vehicleHoverPadding * 2
  );
}

function isClickingRectangle(
  rectangleX,
  rectangleY,
  rectangleWidth,
  rectangleHeight
) {
  let canvasMouseX = getCanvasMouseX();
  let canvasMouseY = getCanvasMouseY();

  return (
    canvasMouseX > rectangleX &&
    canvasMouseX < rectangleX + rectangleWidth &&
    canvasMouseY > rectangleY &&
    canvasMouseY < rectangleY + rectangleHeight
  );
}

function isClickingScreenRectangle(
  rectangleX,
  rectangleY,
  rectangleWidth,
  rectangleHeight
) {
  return (
    mouseX > rectangleX &&
    mouseX < rectangleX + rectangleWidth &&
    mouseY > rectangleY &&
    mouseY < rectangleY + rectangleHeight
  );
}

function getCanvasMouseX() {
  return (mouseX - width / 2) / canvasZoom + width / 2;
}

function getCanvasMouseY() {
  return (mouseY - height / 2) / canvasZoom + height / 2;
}


function scaleToWindow() {
  let w = windowWidth;
  let h = windowHeight;
  let aspectRatio = 1920 / 1080;

  let displayW, displayH;

  if (w / h > aspectRatio) {
    displayH = h;
    displayW = h * aspectRatio;
  } else {
    displayW = w;
    displayH = w / aspectRatio;
  }

  mainCanvas.style('width', displayW + 'px');
  mainCanvas.style('height', displayH + 'px');
}

function windowResized() {
  scaleToWindow();
}