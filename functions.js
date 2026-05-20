//RANDOM INTEGER------------------------------------------------------------------------------------------------------
//This function is created as the result of me following Renick Bell's lesson week 5
//Bell R (n.d.) p5js week 05, Renick Bell website, accessed 24 March 2026. https://renickbell.net/doku.php?id=p5js-week-05
function randomInteger(min, max) {
  return Math.floor(min + (max - min + 1) * Math.random());
}

//BUILD ARRAY FUNCTION------------------------------------------------------------------------------------------------------
//This function is also created as the result of me following Renick Bell's lesson week 5
function buildArray(n, fillFunction) {
  let outputArray = [];
  for (let i = 0; i < n; i++) {
    outputArray.push(fillFunction(i));
  }
  return outputArray;
}




//dragging
function mousePressed() {
  scatteredImages.forEach(img => img.pressed());
}

//releasing
function mouseReleased() {
  scatteredImages.forEach(img => img.released());
}
