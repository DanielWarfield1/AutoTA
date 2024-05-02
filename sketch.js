let router
let gemAPIKey

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(1000, 600);
  router = new Router()
}

function draw() {
  router.draw()
}

function mouseWheel(event) { 
  router.currentPage.handleMouseWheel(event)
} 

function windowResized() {
  router.currentPage.unmount()
  resizeCanvas(windowWidth, windowHeight);
  router.currentPage.mount()
}