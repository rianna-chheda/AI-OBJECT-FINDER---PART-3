status = "";
text_input = "";
objects = [];

function preload(){
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    text_input = document.getElementById("input").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i <= objects.length; i++ ){
            document.getElementById("status").innerHTML = "Status : Object Detecting";
            fill("green");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ percent + "%", objects[i].x + 10, objects[i].y + 10);
            noFill();
            stroke("green");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == input_text){
            video.stop();
            object_detector.detect(gotResults);
            document.getElementById("object_found").innerHTML = text_input+"Is Found";
            var synth = window.speedSynthesis;
            var utterThis = new SpeechSythesisUttarance(text_input+"Is Found");
            synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = text_input+"Is Not Found"
            }

            }
            
        }
}

