//https://editor.p5js.org/willianxz/sketches/fQH6KJ71u

class TranscriptUploadPage{
  constructor(router){
    this.router = router
    this.ff = new FlowField(height/100)
    this.iter = 0
    this.div = null
    this.highlightTxt = false 
    this.highlightTxtIter = 0
    this.transcript = null
    this.noTranButton = null
  }
  
  mount(){
    background(255,255,255)
    this.ff = new FlowField(height/3)
    this.div = createDiv();
    this.div.size(width*0.4, height*0.9);
    this.div.position(width/4-width*0.2, height/2-height*0.45);
    this.div.drop((file) => this.gotFile(file));
    
    //button
    this.noTranButton = createButton("No Transcript?");
    this.noTranButton.mouseClicked(() => this.noTranscript());
    this.noTranButton.size(200,30);
    this.noTranButton.position(width/4*3-100, height/2 + height*0.3);
    this.noTranButton.style("font-family", "Courier New");
  }
  
  unmount(){
    this.div.remove()
    this.noTranButton.remove()
  }
  
  draw() {
    
    this.iter +=1
    //flow field
    background(255,255,255,255-this.iter)
    this.ff.draw()
    
     //Defining Text
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
    strokeWeight(5)
    textSize(32);
    textFont('Courier New');
    stroke(0,0,0,this.iter*2)

    //Upload Region
    textSize(25);
    fill(255, 255, 255, this.iter*2);
    drawingContext.setLineDash([5,10]);
    rect(width/4, height/2, width*0.4, height*0.9, width*0.1);
    drawingContext.setLineDash([0,0]);
    fill(255, 255, 255)
    text('Drag and Drop\nTranscript', width/4, height/2);
    
    //info
    fill(0, 0, 0,this.iter*2);
    rect(width/4*3, height/2, width*0.4, height*0.5);
    
    //info
    let des = "Auto TA uses a transcript from a lecture to construct an agent which is designed to guide you through the material. Auto TA can answer conceptual questions, quizz you on relevent topics, and more!\n\nDrag and drop a .txt file consisting of a transcript of a lecture into the square on the left. This might be the transcript from a Google Meets meeting, for instance."
    textSize(16);
    fill(255, 255, 255);
    text(des, width/4*3, height/2, width*0.4-10, height*0.5);
    
    //highlighting text.
    if (this.highlightTxt){
      
      let p1x = width/4*3-60
      let p1y = height/2+40
      let p2x = p1x-55*cos(this.highlightTxtIter/60)+55
      let p2y = p1y
      
      stroke(255,255,255)
      strokeWeight(3)
      line(p1x, p1y, p2x, p2y);
      
      this.highlightTxtIter += 1
      if (this.highlightTxtIter > 380){
        this.highlightTxtIter = 0
        this.highlightTxt = false
      }
    }
  }
  
  gotFile(file){
    console.log(file)
    if (file.type == 'text'){
      this.transcript = file.data
      let args = {'userContext': file.data, 'isTranscript':true}
      this.router.navTo("agentPage", args = args)
    }else{
      this.highlightTxt = true
    }
  }
  
  noTranscript(){
    this.router.navTo("noTranscriptPage")
  }
  handleMouseWheel(event){
  }
}