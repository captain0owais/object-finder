img = "";
STATUS = "";
objects = [];

function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(350 , 250);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
    thing = document.getElementById("thing").value;
}

function modelLoaded(){
    console.log("cocossd INITIALIZED");
    STATUS = true;
}

function gotResult(error , result){
    if(error){
        console.log(error);
    }else{
        console.log(result);
        objects = result;
    }
}

function draw(){
    image( video , 0 , 0 , canvas.width , canvas.height);

    if(STATUS != ""){
        r = 255;
        g = 255;
        b = 255;

        objectDetector.detect(video , gotResult);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "STATUS : OBJECTS DETECTED";
            document.getElementById("no_objects").innerHTML = "NUMBER OF OBJECTS DETECTED : " + objects.length;
            
            fill(r , g , b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r , g , b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

