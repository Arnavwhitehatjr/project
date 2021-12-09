status="";
objects=[];
function preload(){
    img = loadImage('at.jpg');
  }
  
  function setup() {
    canvas = createCanvas(620, 480);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects ";
  }
  function modelLoaded(){
    console.log("model loaded");
    status=true;
  }
  function gotResult(error,results){
    if(error){
      console.log(error);
    }
    console.log(results);
    objects=results;
  }
  function draw(){
    image(img,0,0,620,480);
      if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(img,gotResult);
        for(i = 0; i < objects.length;i++){
          document.getElementById("status").innerHTML= "Status: Detecting Objects ";
          document.getElementById("number_object").innerHTML= "Number Of Objects Detected Are :"+objects.length;       
          fill(r,g,b);
          percent=floor(objects[i].confidence*100);
          text(objects[i].label+" "+percent+"%",objects[i].x + 15,objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);   
        }
      }
  }