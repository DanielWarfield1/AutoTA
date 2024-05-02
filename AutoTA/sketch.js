let router
let gemAPIKey

function setup() {
  createCanvas(1000, 600);
  router = new Router()
}

function draw() {
  router.draw()
}

function mouseWheel(event) { 
  router.currentPage.handleMouseWheel(event)
} 