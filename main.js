music = "";

function preload() {
    music = loadSound("music.mp3");
}

leftWrist_x = 0;
leftWrist_y = 0;

rightWrist_x = 0;
rightWrist_y = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;


function setup() {
    canvas = createCanvas(600, 400);
    canvas.position(375, 150);
    
    video = createCapture(VIDEO);
    video.hide();

 poseNet = ml5.poseNet(video, modelLoaded);
 poseNet.on('pose', gotPoses);
}   

function draw() {
    image(video, 0, 0, 600, 400);

    fill("#ff0000");
    stroke("#ff0000");

    if (scoreLeftWrist > 0.2) {
        circle(leftWrist_x, leftWrist_y, 20);
        numberLeftWrist = Number(leftWrist_y);
        roundedLeftWrist = floor(numberLeftWrist);
        volume = (roundedLeftWrist/400)
        console.log("Volume of the song is" + volume);
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        music.setVolume(volume);
    }
}

function play() {
    music.play();

    music.rate(1);
    music.setVolume(1);
}


function modelLoaded() {
console.log('Model has been loaded');
}

function gotPoses(results) {
    if (results.length > 0) {
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(results);
        console.log("Left wrist X = " + leftWrist_x + "and Right wrist X = " + rightWrist_x);
        console.log("Left wrist Y = " + leftWrist_y + "and Right wrist Y = " + rightWrist_y);
        console.log("Left wrist score = " +  scoreLeftWrist);
    }
    }
    