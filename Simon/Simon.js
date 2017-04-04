$(document).ready(function () {
    var greenButton = $("#greenButton");
    var redButton = $("#redButton");
    var yellowButton = $("#yellowButton");
    var blueButton = $("#blueButton");
    var displayText = $("#displayText");
    var startButton = $("#startButton");
    var onButton = $("#onButton");
    var strictButton = $("#strictButton");
    var colorButton = $("color-button");
    var turn = 0;
    var itsOn = false;
    var isPlayerTurn = false;
    var onAnim = false;
    var buttons = [greenButton, redButton, yellowButton, blueButton];
    var gameArray = [];
    var starsCount;
    var scrollingString = "*******Simon freecodecamp by Sacha Morgese*******"
    
    

    function animationStarsOff() {
        displayText.text("")
        starsCount++
        if (starsCount < 3) {
            setTimeout(animationStars, 200);
        }
        else{
            if(onAnim){
                onAnim = false;
                scrolling();   
            }
        }
    }

    function animationStars() {
        displayText.text("***");
        setTimeout(animationStarsOff, 200);
    }
    
    function scroll(index, interval, size){
        var currentString = scrollingString.substr(index, size);
        displayText.text(currentString);
        if(index > scrollingString.length - size){
            setTimeout(function(){
                displayText.text("");
            }, 500);
            clearInterval(interval);
        }
    }
    
    function scrolling(){
        var index = 0;
        var substrSize;
        var mediaType = window.innerWidth;
        var size;
        if (mediaType > 400){
            size = 12;
        }
        else{
            size = 9;
        }
        var interval = setInterval(function(){
            scroll(index, interval, size);
            index++;
        }, 100);
    }

    function onAnimation() {
        onAnim = true;
        starsCount = 0;
        setTimeout(animationStars, 200);
        startButton.prop("disabled", false);
        strictButton.prop("disabled", false);
        
    }

    function offAnimation() {
        startButton.prop("disabled", true);
        strictButton.prop("disabled", true);
        colorButton
    }

    function makeArray() {
        gameArray = [];
        for (var i = 0; i < 20; i++) {
            var rndm = Math.floor(Math.random() * 4);
            gameArray.push(buttons[rndm]);
        }
    }
    
    function newTurn(){
        
    }

    function pressStart() {
        makeArray();
        starsCount = 1;
        setTimeout(animationStars, 300);
        turn = 0;
        newTurn();
    }

    onButton.click(function () {
        if (!itsOn) {
            onAnimation();
            itsOn = true;
        }
        else {
            offAnimation();
            itsOn = false;
        }
    })

    startButton.click(function () {
        pressStart();
    })
})