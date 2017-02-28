$(document).ready(function(){
    class squarePrototype{
		constructor(){
        this[9] = "";
        this[8] = "";
        this[7] = "";
        this[6] = "";
        this[5] = "";
        this[4] = "";
        this[3] = "";
        this[2] = "";
        this[1] = "";
		}
    }
    
    //winning patterns
    const winPat = [
		[1,2,3],
		[1,4,7],
		[1,5,9],
		[2,5,8],
		[3,5,7],
		[3,6,9],
		[4,5,6],
		[7,8,9]
	];
	
	function winner(winner){
		
	}
    
    function checkWin(currentPlayer){
		for(var i = 0; i < 8; i++){
			var check = true;
            for(var j = 0; j < 3; j++){
                var square = winPat[i][j];
                if(squares[square] != currentPlayer)
                {
                    check = false;
					break;
                }
            }
			if (!check){
				continue;
			}
			else
			{
				return true;
			}
        }
        return false;
	}
    
    function chooseSign(){}
	
	function isCPUTurn(){}
    
    function isPlayerTurn(){
		turn++;
		if (isCircle){
   			$(".square").click(function(){
				var number = $(this).data("number");
                if(squares[number] === "")
                {
					$(this).html('<svg width="100%" height="100%" class="svg-content"><circle cx="50%" cy="50%" r="30%" stroke="green" stroke-width="10" fill-opacity="0"/></svg>');
					squares[number] = "player";
					if (turn >  checkWin("player")){
						winner("player");
					}
				}
            });
		}
		else if (isCross){
			$(".square").click(function(){
				var number = $(this).data("number");
                if(squares[number] === "")
                {
				    $(this).html('<svg height="100%" width="100%"><line x1="20%" y1="20%" x2="80%" y2="80%" class="cross" stroke="black" stroke-width="10"/><line x1="80%" y1="20%" x2="20%" y2="80%" class="cross" stroke="black" stroke-width="10"/></svg>');
                    squares[number] = "player";
					if (checkWin("player")){
						console.log("WINNER")
					}
                }
			});	
		}
    }
	
    var isCross= true;
    var isCircle= false;
    var squares = new squarePrototype;
    var turn = 0;
    isPlayerTurn();

});