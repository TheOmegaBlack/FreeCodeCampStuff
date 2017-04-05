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
    var playerTurn;
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
    var wrongSound = new Audio("Audio/wrong.mp3");
    var sounds = [greenSound, redSound, yellowSound, blueSound];
    var stringInterval;

    function animationStarsOff() {
        displayText.text("")
        starsCount++
        if (starsCount < 3) {
            setTimeout(animationStars, 200);
        }
        else {
            if (onAnim) {
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

    function scroll(index, interval, size) {
        var currentString = scrollingString.substr(index, size);
        displayText.text(currentString);
        if (index > scrollingString.length - size) {
            setTimeout(function () {
                displayText.text("");
            }, 500);
            clearInterval(interval);
            onButton.prop("disabled", false);
        }
    }

    function scrolling() {
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
        stringInterval = setInterval(function () {
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
        setTimeout(function () { displayText.text("") }, 1000)
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
        }, 400);
        if (count == turn) {
            clearInterval(interval);
            isPlayerTurn = true;
            onButton.prop("disabled", false);
            colorButton.prop("disabled", false);
        }
    }

    function playOne() {
        var count = 0;
        var index = gameArray[count];
        buttons[index].removeClass(inactiveColors[index]);
        buttons[index].addClass(activeColors[index]);
        sounds[index].play();
        setTimeout(function () {
            buttons[index].removeClass(activeColors[index]);
            buttons[index].addClass(inactiveColors[index]);
        }, 400);
        count++
        if (count < turn) {
            var pinterval = setInterval(function () {
                index = gameArray[count];
                count++;
                play(pinterval, count, index);
            }, 1000);
        }
        else {
            isPlayerTurn = true;
            onButton.prop("disabled", false);
            colorButton.prop("disabled", false);
        }
    }

    function blinkOff(blinker, count) {
        if (count == 2) {
            playOne();
        }
        else {
            displayText.text("");
            count++;
            setTimeout(function () {
                blinkOn(blinker, count);
            }, 200);
        }
    }

    function blinkOn(blinker, count) {
        displayText.text(blinker);
        setTimeout(function () {
            blinkOff(blinker, count);
        }, 200);
    }

    function blinkTurn() {
        var blinker;
        if (turn < 10) {
            blinker = "0" + turn;
        }
        else {
            blinker = turn;
        }
        count = 0;
        displayText.text(blinker);
        setTimeout(function () {
            blinkOn(blinker, count);
        }, 200)
    }

    function newTurn() {
        turn++;
        blinkTurn();
        playerTurn = 1;
        isPlayerTurn = true;
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

    function winOff(count) {
        displayText.text("");
        if (count < 5) {
            setTimeout(function () {
                winAnimation(count)
            }, 300)
        }
        else
        {
            setTimeout(pressStart, 1000);
        }
    }

    function winAnimation(count) {
        count++
        displayText.text("YOU WIN");
        setTimeout(function () {
            winOff(count);
        }, 300);
    }

    colorButton.on("mousedown", function () {
        if (isPlayerTurn) {
            var color = $(this).prop("id");
            var curr = gameArray[playerTurn - 1];
            if (color == buttons[curr].prop("id")) {
                colorButton.prop("disabled", true);
                if (color == "greenButton") {
                    greenSound.pause();
                    greenSound.play();
                }
                else if (color == "redButton") {
                    redSound.pause();
                    redSound.play();
                }
                else if (color == "yellowButton") {
                    yellowSound.pause();
                    yellowSound.play();
                }
                else if (color == "blueButton") {
                    blueSound.pause();
                    blueSound.play();
                }
                if (playerTurn == turn) {
                    if (turn == 20) {
                        var count = 0;
                        winAnimation(count);
                    }
                    else {
                        isPlayerTurn = false;
                        colorButton.prop("disabled", true);
                        setTimeout(newTurn, 1000);
                    }
                }
                else {
                    playerTurn++;
                    setTimeout(function () {
                        colorButton.prop("disabled", false);
                    }, 100)
                }
            }
            else {
                wrongSound.play();
                colorButton.prop("disabled", true);
                isPlayerTurn = false;
                var count = 0;
                var interval = setInterval(function () {
                    var index = gameArray[count];
                    count++;
                    play(interval, count, index);                  
                }, 1000);
                playerTurn = 1;
            }
        }
    })
})