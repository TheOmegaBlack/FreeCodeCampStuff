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
    var inactiveColors = ["green", "red", "yellow", "blue"];
    var activeColors = ["greenact", "redact", "yellowact", "blueact"];
    var gameArray;
    var starsCount;
    var scrollingString = "*******Simon freecodecamp by Sacha Morgese*******"
    var greenSound = new Audio("Audio/simonSound1.mp3");
    var redSound = new Audio("Audio/simonSound2.mp3");
    var yellowSound = new Audio("Audio/simonSound3.mp3");
    var blueSound = new Audio("Audio/simonSound4.mp3");
    var sounds = [greenSound, redSound, yellowSound, blueSound];
    var stringInterval;

    function animationStarsOff() {
        displayText.text("")
        starsCount++
        if (starsCount < 3) {
            setTimeout(animationStars, 200);
        }
        else{
            if(onAnim){
                onAnim = false;
                startButton.prop("disabled", false);
                strictButton.prop("disabled", false);  
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
            onButton.prop("disabled", false);
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
        stringInterval = setInterval(function(){
            scroll(index, stringInterval, size);
            index++;
        }, 100);
    }

    function onAnimation() {
        onAnim = true;
        starsCount = 0;
        setTimeout(animationStars, 200);     
    }

    function offAnimation() {
        displayText.text("Goodbye");
        setTimeout(function(){displayText.text("")}, 1000)
        startButton.prop("disabled", true);
        strictButton.prop("disabled", true);
        colorButton.prop("disabled", true);
    }

    function makeArray() {
        gameArray = [];
        for (var i = 0; i < 20; i++) {
            var rndm = Math.floor(Math.random() * 4);
            gameArray.push(rndm);
        }
    }

    function play(interval, count, index) {
        buttons[index].removeClass(inactiveColors[index]);
        buttons[index].addClass(activeColors[index]);
        sounds[index].play();
        setTimeout(function () {
            buttons[index].removeClass(activeColors[index]);
            buttons[index].addClass(inactiveColors[index]);
        }, 500);
        count++;
        if (count == turn) {
            clearInterval(interval);
        }
    }

    function blinkOff(interval, count, blinker) {
        displayText.text("");
        setTimeout(function () {
            displayText.text(blinker);
        }, 200)
        if (count > 3) {
            clearInterval(interval);
        }
    }

    function blinkTurn() {
        var blinker
        var count = 0;
        if (turn < 10) {
            blinker = "0" + turn;
        }
        else {
            blinker = turn;
        }
        displayText.text(blinker);
        var interval = setInterval(function () {
            count++;
            blinkOff(interval, count, blinker);
        }, 200)
    }

    function newTurn(){
        turn++;
        blinkTurn();
        if (turn < 10) {
            displayText.text("0" + turn);
        }
        else {
            displayText.text(turn);
        }
        var count = 0;
        var interval = setInterval(function () {
            var index = gameArray[count];
            play(interval, count, index);
        }, 500);
        playerTurn = 0;
        isPlayerTurn = true;
        colorButton.prop("disabled", false);
    }

    function pressStart() {
        clearInterval(stringInterval);
        makeArray();
        turn = 0;
        newTurn();
    }

    onButton.click(function () {
        if (!itsOn) {
            onButton.prop("disabled", true);
            onAnimation();
            itsOn = true;
        }
        else {
            onButton.prop("disabled", true);
            offAnimation();
            itsOn = false;
            onButton.prop("disabled", false);
        }
    })

    startButton.click(function () {
        pressStart();
    })

    colorButton.on("mousedown", function () {
        if (isPlayerTurn) {
            var color = $(this).prop("id");
            var curr = gameArray[playerTurn];
            if (color == buttons[curr].prop("id")) {
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
                if (playerTurn = turn) {
                    isPlayerTurn = false;
                    colorButton.prop("disabled", true);
                    newTurn()
                }
                else {
                    playerTurn++;
                }
            }
        }
    })
})