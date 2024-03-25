/*

version 0.2 fixing potential problem number one: 
// 1-game can be broken by the user misusing clicks 
*/


//1. create a new function and store outcomes in an array 

// create an empty array to store colours 
var buttonColours=["red","blue","green","yellow"]; 

var gamePattern=[];
var userClickedPattern = [];


var level = 0;
var started = false;
var lives = 3;  
var clickCount= 0; 
var displayPattern = false;


start(); // start the game 

function start(){
    $(document).keypress(function(){
        if(!started){
            alert("the gameeee is about to begin, you Ready?");
            $("h1").text("level " + level);
            btnclick(); // activate function allow users to click buttons 
            nextSequence(); //call nextsequence and activate the game once a key is pressed 
            started= true; 
            lives = 3; 
        }  
    });
}





//check answer function to compare that what the user has chosen matches what the has been shown to the user. this happens after each time the user click a button 
function checkAnswer(currentLevel){
    displayPattern = true;
    console.log("userClickedPattern ...", userClickedPattern)

    if (gamePattern [currentLevel]  === userClickedPattern [currentLevel]){
         console.log("success");
         displayPattern=false; 
        // console.log("userClickedPattern: " + userClickedPattern);
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
            level++;
            clickCount=0; //reset click count to get the right clicks 
            $("h1").text("Up to level " + level ); // update the level 
        },1000);
        }
} 

else {
        //reducing lives 
        lives--;
        //adding css style to page 
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        // playing sound to alert the user 
        playSound("wrong");
        // pass the number of lives left to countlives function and run the function 
        countLives(lives);
    }
}



// variable to store the random chosen colour 
function nextSequence() {
    displayPattern = true; // Set displayingPattern to true when displaying the pattern
   
    userClickedPattern=[]; // set userClickedPattern to empty 

    var num = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[num];
    gamePattern.push(randomChosenColour);
    console.log("game pattern: " + gamePattern );
   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    setTimeout(function(){
        displayPattern = false;
    },500*gamePattern.length); // assuming each step in the pattern takes 500miliseconds 
}


    
function btnclick(){
        
            $(".btn").on("click",function(){
                if (displayPattern){
                    return;
                }
                
                //display count to check 
                console.log("click count is: "+ clickCount);

                //get the color of the clicked button 
                var chosenColour= $(this).attr("id");

                //Add the color to the userClickedPattern array
                userClickedPattern.push(chosenColour);
               
                // Play sound and animate button press
                playSound(chosenColour);
                animatePress(chosenColour);
                checkAnswer(userClickedPattern.length-1); //check the previous

            });
    }
 
    
function countLives(n){
    if (n > 0){
    $("h1").text("OH OH you have "+ n +" hearts, the pattern will show again");
    userClickedPattern=[]; // reset user clicked pattern so it can work with the algorithm
    setTimeout(function(){
        repeatPattern();
        started=false; 
    },2000);
    }else{
        setTimeout(function () {
            $("h1").text("OH No! Game Over, Press Any Key to Restart");
            $(".btn").off("click");
            startOver();
            },100);
        }
}

// the for loop has already finished by the time the timeout function are executed. 
// therefore use immediately evoke function expression
function repeatPattern() {
    displayPattern = true; //disable button click function

    for (var i = 0; i < gamePattern.length; i++) {
        // IIFE starts here
        (function(index) {
            setTimeout(function() {
                // Here, 'index' refers to the value of 'i' for this iteration
                $("#" + gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(gamePattern[index]);
                console.log(gamePattern[index]);
            }, 1000*index);
        })(i); // Pass the current value of 'i' to the IIFE
        // IIFE ends here
    }
    setTimeout(function(){
        displayPattern = false; // reset to false so click button function can be enabled 
    },1000*gamePattern.length); // Assuming each step in the pattern takes 1000 milliseconds
}




// auxilary functions 
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(colour){
    var clicked= $("#"+ colour);
    clicked.addClass("pressed");
    setTimeout(function(){
        clicked.removeClass("pressed");
    }, 100);
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    start(); 
    // listen event to the buttons to capture each click on each button and record the crossponding color of each button clicked in a variable called userclickedpattern
    // Play a sound, animate and then check if that clicked button matches what is stored in the game pattern or not. 

}

