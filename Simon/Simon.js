$(document).ready(function () {
    var greenButton = $("#greenButton");
    var redButton = $("#redButton");
    var yellowButton = $("#yellowButton");
    var blueButton = $("#blueButton");
    var displayText = $("#displayText");
    var startButton = $("#startButton");
    var onButton = $("#onButton");
    var strictButton = $("#strictButton");
    var colorButton = $(".color-button");
    var turn = 0;
    var playerTurn = 0;
    var itsOn = false;
    var isPlayerTurn = false;
    var onAnim = false;
    var buttons = [greenButton, redButton, yellowButton, blueButton];
    var gameArray = [];
    var starsCount;
    var scrollingString = "*******Simon freecodecamp by Sacha Morgese*******"
    var greenSound = new Audio("Audio/simonSound1.mp3");
    var redSound = new Audio("Audio/simonSound2.mp3");
    var yellowSound = new Audio("Audio/simonSound3.mp3");
    var blueSound = new Audio("Audio/simonSound4.mp3");
    var sounds = [greenSound, redSound, yellowSound, blueSound];

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
        if (mediaType > 400 && mediaType < 768 || mediaType > 1200) {
            size = 12;
        }
        else if (mediaType >= 768 && mediaType <= 800 || mediaType >= 992 && mediaType <= 1199) {
            size = 8;
        }
        else {
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
        colorButton.prop("disabled", false);
       
    }

    function offAnimation() {
        startButton.prop("disabled", true);
        strictButton.prop("disabled", true);
    }

    function makeArray() {
        gameArray = [];
        for (var i = 0; i < 20; i++) {
            var rndm = Math.floor(Math.random() * 4);
            gameArray.push(buttons[rndm]);
        }
    }

    function play(interval, count) {

    }
    
    function newTurn(){
        turn++;
        if (turn < 10) {
            displayText.text("0" + turn);
        }
        else {
            displayText.text(turn);
        }
        var count = 0;
        var interval = setInterval(function () {
            play(interval, count);
        }, 1000)
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

    colorButton.on("mousedown", function () {
        var color = $(this).prop("id");
        if (color == "greenButton") {
            greenSound.play();
        }
        else if (color == "redButton") {
            redSound.play();
        }
        else if (color == "yellowButton") {
            yellowSound.play();
        }
        else if (color == "blueButton") {
            blueSound.play();
        }
    })
})