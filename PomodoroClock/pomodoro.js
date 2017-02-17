$(document).ready(function(){
    $("#workMinus a").click(function(){
        if (parseInt($("#work > p").text()) > 1){
            number = parseInt($("#work> p").text()) - 1;
            $("#work > p").text(number);
        }
    });
    $("#workPlus a").click(function(){
        if (parseInt($("#work > p").text()) < 60){
            number = parseInt($("#work> p").text()) + 1;
            $("#work > p").text(number);
        }
    });
    $("#breakMinus").click(function(){
            if (parseInt($("#break > p").text()) > 1){
            number = parseInt($("#break> p").text()) - 1;
            $("#break > p").text(number);
        }
    });
    $("#breakPlus").click(function(){
        if (parseInt($("#break> p").text()) < 60){
            number = parseInt($("#break> p").text()) + 1;
            $("#break > p").text(number);
        }
    });
    
    function pomodoroTime(workTime){
        var t = (Date.parse(time) + workTime) - Date.parse(new Date());
        var seconds = Math.floor ( (t/1000) % 60);
        var minutes = Math.floor ( (t/1000/60) % 60);
        return {
            'minutes': minutes,
            'seconds': seconds
        };
    }
    
    
    function update(date){
        var minutes = date.minutes.toString();
        var seconds = date.seconds.toString();
        if (minutes == "0"){
            $("#clock").text(seconds); 
        }
        else{
            if (minutes.length < 2){
                minutes = "0" + minutes;
            }
            if (seconds.length < 2){
                seconds = "0" + seconds;
            }
            $("#clock").text(minutes + ":" + seconds);
        }
    }

    function updateWork()
    {
        var date = pomodoroTime(workTime);
        if (date.minutes === 0 && date.seconds === 0){
            isWork = false;
            isBreak = true;
            time = new Date();
            $("#clock").text("00:00");
            $("#clock").css("color", "green");
            updateBreak();
        }
        else {
            update(date);
            }
    }
    
    function updateBreak()
    {
        var date = pomodoroTime(breakTime);
        if (date.minutes === 0 && date.seconds === 0){
            isWork = true;
            isBreak = false;
            time = new Date();
            $("#clock").text("00:00");
            $("#clock").css("color", "red");
            updateBreak();
        }
        else {
            update(date);
        }
    }
    
    function startUpdate(){
        if(isWork){
            updateWork();           
        }
        else if (isBreak){
            updateBreak();
        }
    }
    
    var isWork = true;
    var isBreak = false;
    var workTime;
    var breakTime;
    var time;
    var timeInterval;
    
    $("#start").click(function(){
    $("#start").text("Reset!");
    $("#clock").text("");
    $("#clock").css("color", "red");
    $("#clock").css("font-size", "80px");
    $("#clock").css("padding-top","10px");
    workTime = parseInt($("#work > p").text()) * 60000;
    breakTime = parseInt($("#break > p").text()) * 60000;
    time = new Date();
        startUpdate();
        timeInterval = setInterval(startUpdate,1000);
        });

    $("#stop").click(function(){
        $("#start").text("Start!");
        clearInterval(timeInterval);
        $("#clock").css("color", "white");
        $("#clock").css("font-size", "35px");
        $("#clock").css("padding-top","0");
        $("#clock").text("Set the time and press start!");
    });   
});