var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var keyPressCount = 0;

var buttonClicks = 0;

function nextSequence(){

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    //console.log(gamePattern);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour); 
    level++;
    $("h1").html("Level "+ level);

    userClickedPattern =[];
    buttonClicks = 0;
}


$(document).keypress(function(){
    keyPressCount++;
    if(keyPressCount === 1){
    nextSequence();
}
});



$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour); 
    checkPattern(userChosenColour);
});

function playSound(name){

    if( name === "blue"){
        var blue = new Audio('./sounds/blue.mp3');
        blue.play();
    }
    else if(name === "red"){
        var red = new Audio('./sounds/red.mp3');
        red.play();
    }
    else if(name === "green") {
        var green = new Audio('./sounds/green.mp3');
        green.play();
    }
    else if(name === "yellow"){
        var yellow = new Audio('./sounds/yellow.mp3');
        yellow.play();
    }
}

function animatePress(currentColour){
   var activeButton = $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        activeButton.removeClass("pressed");
    }, 100);
}


function checkPattern(answer){
     if(answer === gamePattern[buttonClicks]){
        if(gamePattern.length ===  userClickedPattern.length){
            setTimeout(function(){
                nextSequence();  
            }, 800);
        }
        else if(gamePattern.length > userClickedPattern.length){
            alert("Click next button");
            buttonClicks++;
        }
     }
     else{
        $("h1").html("Game over, Press any key to restart the game");
        wrongButton();
        startOver(); 
     }
} 

function wrongButton(){
    var wrong = new Audio('./sounds/wrong.mp3');
        wrong.play();
    var wrongOver = $("body").addClass("game-over");

        setTimeout(function(){
            wrongOver.removeClass("game-over");
        }, 200);
}

function startOver(){    
    gamePattern = [];

    userClickedPattern = [];

    level = 0;

    keyPressCount = 0;

    buttonClicks = 0;
}