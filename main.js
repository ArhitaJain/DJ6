song = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload()
{
 song = loadSound("raatan.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video ,modelLoaded);
    poseNet.on("pose" ,gotPoses);
}

function gotPoses(results)
{
 if(results.length > 0)
 {
     //console.log(results);
     scoreLeftWrist = results[0].pose.keypoints[9].score;
     scoreRightWrist = results[0].pose.keypoints[10].score;
     console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
 } 

 leftWristX = results[0].pose.leftWrist.x;
 leftWristY = results[0].pose.leftWrist.y;
 console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY)

 rightWristX = results[0].pose.rightWrist.x;
 rightWristY = results[0].pose.rightWrist.y;
 console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY)
}

function draw()
{
    image(video ,0 ,0 ,600 ,500);

    fill("red")
    stroke("black")
    //circle(rightWristX ,rightWristY ,20)
    if(scoreLeftWrist > 0.2){
    circle(leftWristX ,leftWristY ,20)

    num_left_wY = Number(leftWristY);
    remove_deci = floor(num_left_wY);
    volume = remove_deci/500;

    document.getElementById("vol").innerHTML = "Volume = " + volume;
    song.setVolume(volume)
    }
    if(scorerRightWrist > 0.2){
        circle(RightWristX ,RightWristY ,20)

    if(rightWristY >0 && rightWristY <= 100){
        document.getElementById("sp").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    if(rightWristY >100 && rightWristY <= 200){
        document.getElementById("sp").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    if(rightWristY >200 && rightWristY <= 300){
        document.getElementById("sp").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    if(rightWristY >300 && rightWristY <= 400){
        document.getElementById("sp").innerHTML = "Speed = 2x";
        song.rate(2);
    }

    if(rightWristY >400 && rightWristY <= 500){
        document.getElementById("sp").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}
}

function music()
{
 song.play();
 song.setVolume(1);
 song.rate(1);
}

function modelLoaded()
{
    console.log("model is Loaded !")
}