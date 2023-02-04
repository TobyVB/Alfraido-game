
// Alfraido
// The haunted house game

var monster = { // Start of Monster Oject
    slider: 0,
    scarefactor : 50, // creepscare value
    scare: function() { //SCARE function
        if(timerActive === false && pause === false && startMenuActive === false && delay === false) {

            if(slidermargin < 4) {
                person.bravery -= this.scarefactor*multi;
                missmulti = 1;
                multi += 1;
                document.getElementById("infoBox").classList.remove("healedInfoBox");
                document.getElementById("infoBox").classList.remove("missInfoBox");
                document.getElementById("infoBox").classList.add("scaredInfoBox");
                document.getElementById("sliderTarget1").classList.remove("regular");
                document.getElementById("sliderTarget1").classList.add("bigger");
                document.getElementById("infoBox").innerHTML = "SCARED 'EM!";
                grow = true;
                roarSound.play();
            }
            if(slidermargin > 46 && (delay === false)) {
                clock += 500;
                person.anticipation -= 5*multi;
                missmulti = 1;
                multi += 1;
                document.getElementById("infoBox").classList.remove("missInfoBox");
                document.getElementById("infoBox").classList.remove("scaredInfoBox");
                document.getElementById("infoBox").classList.add("healedInfoBox");
                document.getElementById("sliderTarget2").classList.remove("regular");
                document.getElementById("sliderTarget2").classList.add("bigger");
                document.getElementById("infoBox").innerHTML = "RECOVERED!";
                lightup = true;
                recoverSound.play();
            }
            if(slidermargin < 47 && slidermargin > 3) {
                clock -= (clock/(missmulti+1))+250;
                person.anticipation += 5*missmulti*level;
                missmulti += 1;
                multi = 1;
                document.getElementById("infoBox").classList.add("missInfoBox");
                document.getElementById("infoBox").classList.remove("healedInfoBox");
                document.getElementById("infoBox").classList.remove("scaredInfoBox");
                document.getElementById("infoBox").innerHTML = "NOPE!";
                startMiss = true;
                missSound.play();
            }
            clickEffect();
            changestats();
            timerActive = true;
            setTimeout(function(){
                timerActive = false;
            },500)
        }
    }
}
// End of Monster Object
//******************************************************************************* */
document.getElementById("submit").addEventListener("click", getInputFromTextBox)
document.getElementById("saveScore").addEventListener("click", showSaveScoreForm);
document.getElementById("exitSaveScore").addEventListener("click", hideNiceTry);
document.getElementById("exitNiceTryFail").addEventListener("click", hideNiceTryFail);
document.getElementById("restart").addEventListener("click", triggerReset);
document.getElementById("resume").addEventListener("click", resume);
document.getElementById("start").addEventListener("click", runAlfraido);

var spacePressed = false;
var pPressed = false;
var timerActive = false 
var multi = 1;
var missmulti = 1;
var monsterBody = document.getElementById("monster");
var monsterHeight = 75;
var monsterWidth = 100;
var monstermarginHorizontal = 50;
var monstermarginVertical = 40;
var musicSound = new Audio('/sound/alfraidoMusic.wav');
musicSound.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
var roarSound = new Audio('/sound/roar3.wav');
var recoverSound = new Audio('/sound/recover.ogg');
var missSound = new Audio('/sound/miss.wav');
var winSound = new Audio('/sound/win.wav');
var person = {bravery: 100, anticipation : 0}
var clock = 5025;
var visibleClock = clock/50;
var pause = false; // PAUSE
var level = 1;
var startMenuActive = true;

var slider = document.getElementById("slider");
var slidertarget1 = document.getElementById("sliderTarget1");
var slidertarget2 = document.getElementById("sliderTarget2");
var braverybar = document.getElementById("braveryBar");
var anticipationBar = document.getElementById("anticipationBar");
var monsterBody = document.getElementById("monster");
var personBody = document.getElementById("person");

var input = document.getElementById("name").value;
var initials = localStorage.getItem("initials");
var highscore = localStorage.getItem("highscore");
document.getElementById("highscore").innerHTML = "highscore: "+highscore;
document.getElementById("initials").innerHTML = "player: "+initials;

var menu = document.getElementById("menu");
var startMenu = document.getElementById("startMenu");

var slidermargin = 50;
var slideRight = true;

var iterateIncrease = 0;
var iterateDecrease = 0;
var grow = false;
var shrink = false;
var monsterOpacity = 100;

var iterateIncrease2 = 0;
var iterateDecrease2 = 0;
var lightup = false;
var lightdown = false;

var iterateIncrease3 = 0;
var iterateDecrease3 = 0;
var startMiss = false;
var endMiss = false;
var continueMiss = false;
var rotation = 0;
var rotateRight = true;
var anticipate = person.anticipation;

var delay = true;

showStartMenu(); // #################### STEP 1 ####################
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
function gameOver(){
    if((highscore > level - 1) || highscore <= 0 && level === 1){
        reset();
        showNiceTryFail();
    }
    if(highscore < level - 1){
        showNiceTry();
        updateScore();
    }  
    delay = true;
}
function youWin(){
    delay = true;
    level += 1;
    roarSound.pause();
    roarSound.currentTime = 0;
    winSound.play();
    reset();
    delayStart();
}
function reset(){
    clock = 5025;
    person.bravery = 100;
    person.anticipation = 0;
    multi = 1;
    missmulti = 1;
    slidermargin = 50;
    monstermarginHorizontal = 80;
    monstermarginVertical = 40;
    monsterHeight = 75;
    monsterWidth = 100;
    monsterOpacity = 100;
    pause = false;
    highscore = localStorage.getItem("highscore");
    initials = localStorage.getItem("initials");
}
function startOver(){
    delay = true;
    delayStart();
    reset();
    level = 1;
    document.getElementById("highscore").style.color = "white";
}
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
function triggerReset() {
    removeStartMenu();
    hidePause();
    startOver();
}
function resume() {
    pause = false;
}
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
function updateScore(){
    if(highscore !== null){
        if (level < highscore) {  
            document.getElementById("highscore").style.color = "red";    
        }
        if (level-1 > highscore) {
            getInputFromTextBox();
            document.getElementById("highscore").style.color = "yellow";    
        }
    }
    else{
        localStorage.setItem("highscore", "0");
        console.log(highscore);
    }
}
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
function getInputFromTextBox() {
    localStorage.setItem("highscore", (level-1));
    input = document.getElementById("name").value;
    localStorage.setItem("initials", input);
    hideSaveScoreForm();
    document.getElementById("scoreForm").classList.remove("menuVisible");
    document.getElementById("scoreForm").classList.add("menuInvisible");
}
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
function resetScore(){
    localStorage.setItem("highscore", (0));
}
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
function delayStart(){ // #################### STEP 3 ####################
    if(delay === true && pause === false && startMenuActive === false){
        document.getElementById("countdown").innerHTML = "3";
        resetMonster();
        setTimeout(function(){
            document.getElementById("countdown").innerHTML = "2";
            setTimeout(function(){
                document.getElementById("countdown").innerHTML = "1";
                setTimeout(function(){
                    document.getElementById("countdown").innerHTML = "";
                    delay = false; 
                },1000)
            },1000)
        },1000)
    }
}
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
function removeStartMenu(){ // #################### STEP 2 ####################
    document.getElementById("startMenu").classList.add("menuInvisible");
    document.getElementById("startMenu").classList.remove("menuVisible");
    startMenuActive = false;
    delayStart();
} 
function showStartMenu(){
    document.getElementById("startMenu").classList.add("menuVisible");
    document.getElementById("startMenu").classList.remove("menuInvisible");
}
// *******************************************************************************
function showPause(){
    document.getElementById("menu").classList.add("menuVisible");
    document.getElementById("menu").classList.remove("menuInvisible");
    pause = true;
}
function hidePause(){
    document.getElementById("menu").classList.add("menuInvisible");
    document.getElementById("menu").classList.remove("menuVisible");
    pause = false;
}
// *******************************************************************************
function showNiceTry(){
    document.getElementById("niceTry").classList.add("menuVisible");
    document.getElementById("niceTry").classList.remove("menuInvisible");
    reset();
}
function hideNiceTryForForm(){
    document.getElementById("niceTry").classList.add("menuInvisible");
    document.getElementById("niceTry").classList.remove("menuVisible");
    startMenuActive = true;
}
function hideNiceTry(){
    document.getElementById("niceTry").classList.add("menuInvisible");
    document.getElementById("niceTry").classList.remove("menuVisible");
    startMenuActive = true; // LOOK HERE
    showStartMenu();
}
// *******************************************************************************
function showNiceTryFail(){
    document.getElementById("niceTryFail").classList.remove("menuInvisible");
    document.getElementById("niceTryFail").classList.add("menuVisible");
    showStartMenu();
}
function hideNiceTryFail(){
    document.getElementById("niceTryFail").classList.add("menuInvisible");
    document.getElementById("niceTryFail").classList.remove("menuVisible");
    showStartMenu();
}
// *******************************************************************************
function showSaveScoreForm(){
    hideNiceTryForForm();
    document.getElementById("scoreForm").classList.remove("menuInvisible");
    document.getElementById("scoreForm").classList.add("menuVisible");
}

function hideSaveScoreForm(){
    document.getElementById("scoreForm").classList.add("menuInvisible");
    document.getElementById("scoreForm").classList.remove("menuVisible");
    showStartMenu();
}
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
function resetMonster(){
    slider.style.marginLeft =  "50%";
    monstermarginHorizontal = 80;
    monstermarginVertical = 40;
    monsterHeight = 75;
    monsterWidth = 100;
    monsterOpacity = 100;
    monsterBody.style.width = monsterWidth + "px";
    monsterBody.style.height = monsterHeight + "px";
    monsterBody.style.opacity = monsterOpacity + "%";
    monsterBody.style.marginLeft = monstermarginHorizontal + "%";
    monsterBody.style.bottom = monstermarginVertical + "%";
    document.getElementById("clock").innerHTML = "100";
}
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
function changestats() {
    if (multi < 2) {
        document.getElementById("multi").style.opacity = "0%";
    } else {
        document.getElementById("multi").style.opacity = "100%";
        document.getElementById("multi").innerHTML = "Combo: x"+(multi-1);
    }
    if (missmulti < 2) {
        document.getElementById("missmulti").style.opacity = "0%";
    } else {
        document.getElementById("missmulti").style.opacity = "100%";
        document.getElementById("missmulti").innerHTML = "Fails: x"+(missmulti-1);
    }

    document.getElementById("braveryStat").innerHTML = "Bravery: "+Math.round(person.bravery);
    document.getElementById("anticipation").innerHTML = "anticipation: "+person.anticipation;
    document.getElementById("clock").innerHTML = Math.floor(visibleClock);
}
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
function removeClickEffect() {
    document.getElementById("infoBox").classList.remove("infoBox");
    document.getElementById("infoBox").classList.add("infoBox2");
    document.getElementById("sliderTarget1").classList.remove("bigger");
    document.getElementById("sliderTarget2").classList.remove("bigger");
    document.getElementById("sliderTarget1").classList.add("regular");
    document.getElementById("sliderTarget2").classList.add("regular");
}
function clickEffect() {
    document.getElementById("infoBox").classList.remove("infoBox2");
    document.getElementById("infoBox").classList.add("infoBox");
    setTimeout(function(){
        removeClickEffect();
    },200);
}
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
function shakeTimer() {
    anticipate = person.anticipation;
    if (pause === false && startMenuActive === false && delay === false){
        if (rotation < 2 && rotateRight ===true) {
            personBody.style.transform = "rotate(3deg)";
            rotation +=1;
        }
        if (rotation === 2) {
            rotateRight = false;
        }
        if (rotateRight === false){
            personBody.style.transform = "rotate(357deg)";
            rotation -=1;
        }
        if (rotation === 0) {
            rotateRight = true; 
        }
    }      
    setTimeout(shakeTimer, anticipate+20);
}
setTimeout(shakeTimer, anticipate);
// (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))

    
    // THIS IS WHERE THE HIGHSCORE MENU WILL BE CAUSED TO BE DISPLAYED
    // document.getElementById("viewScores").addEventListener("click", viewHighScores);
    // function viewHighScores(){
    //     getElementById("highscoreList").classList.add(){

    //     }
    // }


























function runAlfraido(){ // #################### STEP 2 ####################
    
    removeStartMenu(); // #################### STEP 2 ####################

    delayStart(); // #################### STEP 3 ####################

    musicSound.play(); // #################### STEP 4 ####################

    document.getElementById("start").removeEventListener("click", runAlfraido);
    document.getElementById("start").addEventListener("click", triggerReset);

    //<---Essentially, this is the gamespeed.
    setInterval(function(){ // #################### STEP 5 ####################
        document.getElementById("highscore").innerHTML = "highscore: "+highscore;
        document.getElementById("initials").innerHTML = "player: "+initials;
        checker(); /*CHECKER HERE */
        if (pause === false){
            hidePause();
        }
        if (pause === true){
            showPause();
        }
        if (delay === true) {
            visibleClock = 100;
        }
    },20)
    /**********************************************************   CHECKER   *****************************************************************/
    /**********************************************************   CHECKER   *****************************************************************/
    /**********************************************************   CHECKER   *****************************************************************/
    function checker() { /* THIS IS THE CHECKER!!!!!!!!!!!!!!!! */
        
        if (pause === false && delay === false && startMenuActive === false)  { // Conditions for Checker
            
            /* START OF WHAT'S SPECIFIC TO THE SLIDER */
            if(slidermargin < 50 && slideRight === true) {
                slider.style .marginLeft = slidermargin + "%";
                slidermargin += 1;
                monsterOpacity += 1;
                monstermarginHorizontal += 1;
                monstermarginVertical += .5;
                monsterHeight -= 2.25;
                monsterWidth -= 3;
                monsterBody.style.opacity = monsterOpacity + "%";
                monsterBody.style.marginLeft = monstermarginHorizontal + "%";
                monsterBody.style.bottom = monstermarginVertical + "%";
            }  
            if(slidermargin === 50) {
                slideRight = false;
            }
            if(slideRight === false) {
                slider.style.marginLeft = slidermargin  + "%";
                slidermargin -= 1;
                monsterOpacity -= 1;
                monstermarginHorizontal -=1;
                monstermarginVertical -= .5;
                monsterHeight += 2.25;
                monsterWidth += 3;
                monsterBody.style.opacity = monsterOpacity + "%";
                monsterBody.style.marginLeft = monstermarginHorizontal + "%";
                monsterBody.style.bottom = monstermarginVertical + "%";
            } 
            if(slidermargin === 0) {
                slideRight = true;
            }
            // (((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))
            if(person.bravery < 1) {
                    changestats();
                    youWin();
                }   
            if(visibleClock < 1) {
                    changestats();
                    gameOver();
                }
            // (((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))
            braverybar.style.width = person.bravery*4+"px";
            // *******************************************************************************
            if (person.anticipation < 400) {
                anticipationBar.style.width = person.anticipation+"px";
            } else {
                anticipationBar.style.width = "400px";
            }
            // (((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))
            if(clock > 5025){
                clock = 5025;
            }
            clock -= 1;//iterates game clock.
            document.getElementById("clock").innerHTML = clock;//updates game clock.
            visibleClock = clock/50;//gives visual clock a value that is a fraction of the game clock
            document.getElementById("clock").innerHTML = Math.floor(visibleClock);//Rounds visible clock down.
            // *******************************************************************************
            document.getElementById("level").innerHTML = "lvl: "+level;
            // (((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))
            if(person.bravery < 100) {
                person.bravery += person.anticipation/2500*level;//This sets how quickly bravery recovers.
            }// refills bravery

            if(person.anticipation < 0) {
                person.anticipation = 0;
            }// Prevents anticipation from going below 0;
            // (((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))
            monsterBody.style.width = monsterWidth + "px";
            monsterBody.style.height = monsterHeight + "px";
            // (((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))
            if((grow === true) && (iterateIncrease < 10)){
                monsterHeight += (15*(multi-1));
                monsterWidth += (20*(multi-1));
                monstermarginHorizontal -= (1.5*(multi-1));
                iterateIncrease += 1;
                monsterOpacity += 10;
            }
            if(iterateIncrease === 10){
                shrink = true;
                grow = false;
                iterateIncrease = false;
            }
            // *******************************************************************************
            if((shrink === true) && (iterateDecrease < 10)) {
                monsterHeight -= (15*(multi-1));
                monsterWidth -= (20*(multi-1));
                monstermarginHorizontal += (1.5*(multi-1));
                iterateDecrease += 1;
                monsterOpacity -= 10;
            }
            if(iterateDecrease === 10){
                shrink = false;
                iterateDecrease = 0;
            } 
            // *******************************************************************************
            if((lightup === true) && (iterateIncrease2 < 10)){
                iterateIncrease2 += 1;
                monstermarginVertical +=1;
            }
            if(iterateIncrease2 === 9 && lightdown === false && lightup === true){
                monsterBody.classList.add("monster");
            }
            if(iterateIncrease2 === 10){
                lightdown = true;
                lightup = false;
                iterateIncrease2 = false;
            }
            // *******************************************************************************
            if((lightdown === true) && (iterateDecrease2 < 10)) {
                iterateDecrease2 += 1;
                monstermarginVertical -=1;
            }
            if(iterateDecrease2 === 9 && lightdown === true && lightup === false){
                monsterBody.classList.remove("monster");
            }
            if(iterateDecrease2 === 10){
                lightdown = false;
                iterateDecrease2 = 0;
            }
            // *******************************************************************************
            if((startMiss === true) && (iterateIncrease3 < 10 && continueMiss === false)){
                monsterHeight -= (.75*(missmulti-1));
                monsterWidth -= (1*(missmulti-1));
                monsterBody.style.transform = "rotate("+iterateIncrease3*6+"deg)"; 
                iterateIncrease3 += 1;
                monsterOpacity += 10;
            }
            if(iterateIncrease3 === 10){
                endMiss = true;
                startMiss = false;
                iterateIncrease3 = 9;
                continueMiss = true;
            }
            // *******************************************************************************
            if((endMiss === true) && (iterateDecrease3 < 10)) {
                iterateIncrease3 -= 1;
                monsterHeight += (.75*(missmulti-1));
                monsterWidth += (1*(missmulti-1));
                monsterBody.style.transform = "rotate("+iterateIncrease3*6+"deg)"; 
                iterateDecrease3 += 1;
                monsterOpacity -= 10;
            }
            if(iterateDecrease3 === 10){
                endMiss = false;
                iterateDecrease3 = 0;
                iterateIncrease3 = 0;
                continueMiss = false;
            }
            // (((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))
            changestats();
        }
    }
    //*****************************************************    END OF CHECKER   ******************************************************** */
    /*********************************************************************************************** */
    window.addEventListener('keydown', function(e){
        if (e.code === 'Space') spacePressed = true;
        if (e.code === 'KeyP') {
            pPressed = true;
        }
    })
    window.addEventListener('keyup', function(e){
        if (e.code === 'Space') {
            spacePressed = false;
            monster.scare();
        }
        if (pause === false) {
            if (e.code === 'KeyP') {
                pPressed = false;
                if (delay === false){
                    showPause();
                }
            }
        } else {
            if (e.code === 'KeyP') {
                pPressed = false;
                hidePause();
            }
        }
    })
  
} ///END*****************************************************************************************************






// THIS IS THE FINAL COMMENT TO DELETE

// THIS IS FOR YOUR PROTECTION SAVE POINT
// EVERYTHING IS WORKING AT THIS POINT
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// THIS IS FOR YOUR PROTECTION SAVE POINT
// EVERYTHING IS WORKING AT THIS POINT
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// THIS IS FOR YOUR PROTECTION SAVE POINT
// EVERYTHING IS WORKING AT THIS POINT
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// THIS IS FOR YOUR PROTECTION SAVE POINT
// EVERYTHING IS WORKING AT THIS POINT
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// THIS IS FOR YOUR PROTECTION SAVE POINT
// EVERYTHING IS WORKING AT THIS POINT
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// THIS IS FOR YOUR PROTECTION SAVE POINT
// EVERYTHING IS WORKING AT THIS POINT
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// THIS IS FOR YOUR PROTECTION SAVE POINT
// EVERYTHING IS WORKING AT THIS POINT
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// THIS IS FOR YOUR PROTECTION SAVE POINT
// EVERYTHING IS WORKING AT THIS POINT
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// THIS IS FOR YOUR PROTECTION SAVE POINT
// EVERYTHING IS WORKING AT THIS POINT
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// THIS IS FOR YOUR PROTECTION SAVE POINT
// EVERYTHING IS WORKING AT THIS POINT
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
// STOP PRESSING CMD-Z
