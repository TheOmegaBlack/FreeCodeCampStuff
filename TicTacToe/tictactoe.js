$(document).ready(function() {
  class squarePrototype {
    constructor() {
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
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9]
  ];

  function winner(winner) {
    writing.text(winner + " WIN");
    isPlayerTurn = false;
  }

  function randomSet(set) {
    var rndm = Math.floor(Math.random() * set.length);
    return set[rndm];
  }

  function checkRisk() {
    for (var i = 0; i < 8; i++) {
      var free = 0;
      var check = 0;
      for (var j = 0; j < 3; j++) {
        var square = winPat[i][j];
        if (squares[square] == "player") {
          check++;
        } else if (squares[square] != "CPU") {
          free = square;
        }
        if (check == 2 && free != 0) {
          return [true, free];
        }
      }
    }
    return [false, 0];
  }
    
  function specificThreat(){
      var situation = [];
      checkPlayer(situation);
      var first, second;
      if (situation[0] > situation[1]) {
          first = situation[1];
          second = situation[0];
      }
      else {
          first = situation[0];
          second = situation[1];
      }
      switch (first) {
          case 1:
              if (second == 6) {
                  return [true, randomSet([2, 3])];
              }
              else if (second == 8) {
                  return [true, randomSet([4, 7])]
              }
              else if (second == 9) {
                  return [true, randomSet([2, 4, 6, 8])]
              }
          case 2:
              if (second == 7) {
                  return [true, randomSet([1, 4])]
              }
              else if (second == 9) {
                  return [true, randomSet([3, 6])]
              }
          case 3:
              if (second == 4) {
                  return [true, randomSet([1, 2])]
              }
              else if (second == 7) {
                  return [true, randomSet([2, 4, 6, 8])]
              }
              if (second == 8) {
                  return [true, randomSet([6, 9])]
              }
          case 4:
              if (second == 9) {
                  return [true, randomSet([7, 8])]
              }
          case 5:
              if (second == 1 && squares[9] == "CPU") {
                  return [true, randomSet([7, 3])]
              }
              else if (second == 3 && squares[7] == "CPU") {
                  return [true, randomSet([1, 9])]
              }
              else if (second == 7 && squares[3] == "CPU") {
                  return [true, randomSet([1, 9])]
              }
              else if (second == 9 && squares[1] == "CPU") {
                  return [true, randomSet([3, 7])]
              }
          case 6:
              if (second == 7) {
                  return [true, randomSet([8, 9])]
              }
          default:
              return [false, 0];
      }
      
  }

  function checkChance(turn) {
    for (var i = 0; i < 8; i++) {
        var free = 0;
        var freeCheck = [];
        var check = 0;
        for (var j = 0; j < 3; j++) {
            var square = winPat[i][j];
            if (squares[square] == "CPU") {
                check++;
            } else if (squares[square] == "") {
                freeCheck.push(square);
                free = square;
            }  
            if (check == 2 && free != 0) {
            return [true, free];
            }
            if (turn == 3 || turn == 4){
                if (check == 1 && freeCheck.length == 2){
                    return [true, randomSet(freeCheck)];
                }
            }
        }
    }
    return [false, 0];
  }

    function checkPlayer(situation) {
    for (var i = 1; i < 10; i++) {
      if (squares[i] == "player") {
        situation.push(i);
      }
    }
    return true;
  }

  function checkSit(situation) {
    for (var i = 1; i < 10; i++) {
      if (squares[i] == "") {
        situation.push(i);
      }
    }
    return true;
  }

  function circle(currentPlayer, square, number) {
    square.html('<svg width="100%" height="100%" class="svg-content"><circle cx="50%" cy="50%" r="30%" stroke="green" stroke-width="10" fill-opacity="0"/></svg>');
    squares[number] = currentPlayer;
  }

  function cross(currentyPlayer, square, number) {
    square.html('<svg height="100%" width="100%"><line x1="20%" y1="20%" x2="80%" y2="80%" class="cross" stroke="black" stroke-width="10"/><line x1="80%" y1="20%" x2="20%" y2="80%" class="cross" stroke="black" stroke-width="10"/></svg>');
    squares[number] = currentyPlayer;
  }

  function checkWin(currentPlayer) {
    for (var i = 0; i < 8; i++) {
      var check = true;
      for (var j = 0; j < 3; j++) {
        var square = winPat[i][j];
        if (squares[square] != currentPlayer) {
          check = false;
          break;
        }
      }
      if (!check) {
        continue;
      } else {
        for (var j = 0; j < 3; j++) {
          var n = winPat[i][j];
          var square = "#square" + n;
          $(square).css("background-color", "blue");
        }
        return true;
      }
    }
    return false;
  }

  function whoStarts() {
    var starts = randomSet(["player", "CPU"]);
    if (starts == "player") {
      isPlayerTurn = true;
      writing.text("Player starts!")

    } else if (starts == "CPU") {
      writing.text("CPU starts!")
      isCPUTurn = true;
    }
    if (isCPUTurn) {
      setTimeout(CPUTurn, 1000);
    }
  }

  function CPUTurn() {
    turn++;
    switch (turn) {
        case 2:
            if (squares[5] == "") {
                if (isCircle) {
                    cross("CPU", $("#square5"), 5);
                } else if (isCross) {
                    circle("CPU", $("#square5"), 5);
                }
            } else {
                var i = randomSet([1, 3, 7, 9]);
                var square = "#square" + i;
                if (isCircle) {
                    cross("CPU", $(square), i);
                } else if (isCross) {
                    circle("CPU", $(square), i);
                }
            }
            break;
        case 4:
            var chance = checkChance(turn);
            var risk = checkRisk();
            var solution = specificThreat();
            if (solution[0]) {
                var i = solution[1];
                var square = "#square" + i;
                if (isCircle) {
                    cross("CPU", $(square), i);
                } else if (isCross) {
                    circle("CPU", $(square), i);
                }
            }
            else if (risk[0]) {
                var i = risk[1];
                var square = "#square" + i;
                if (isCircle) {
                    cross("CPU", $(square), i);
                } else if (isCross) {
                    circle("CPU", $(square), i);
                }
            }
            else if (chance[0]) {
                var i = chance[1];
                var square = "#square" + i;
                if (isCircle) {
                    cross("CPU", $(square), i);
                } else if (isCross) {
                    circle("CPU", $(square), i);
                }
            } else {
                var situation = [];
                checkSit(situation);
                var i = randomSet(situation);
                var square = "#square" + i;
                if (isCircle) {
                    cross("CPU", $(square), i);
                } else if (isCross) {
                    circle("CPU", $(square), i);
                }
            }
            break;
        case 6:
        case 8:
        var chance = checkChance(turn);
        var risk = checkRisk();
        var noChance = checkChance(4);
        if (chance[0]) 
        {
          var i = chance[1];
          var square = "#square" + i;
          if (isCircle) {
            cross("CPU", $(square), i);
          } else if (isCross) {
            circle("CPU", $(square), i);
          }
        } 
        else if (risk[0]) {
            var i = risk[1];
            var square = "#square" + i;
            if (isCircle) {
            cross("CPU", $(square), i);
          } else if (isCross) {
            circle("CPU", $(square), i);
          }
        }
        else if (noChance[0]) {
            var i = noChance[1];
            var square = "#square" + i;
            if (isCircle) {
                cross("CPU", $(square), i);
            } else if (isCross) {
                circle("CPU", $(square), i);
            }
        }
        else {
          var situation = [];
          checkSit(situation);
          var i = randomSet(situation);
          var square = "#square" + i;
          if (isCircle) {
            cross("CPU", $(square), i);
          } else if (isCross) {
            circle("CPU", $(square), i);
          }
        }
        break;
      case 1:
        var i = randomSet([1, 3, 5, 7, 9]);
        var square = "#square" + i;
        if (isCircle) {
          cross("CPU", $(square), i);
        } else if (isCross) {
          circle("CPU", $(square), i);
        }
        break;
      case 3:
          if (squares[5] == "") {
              if (isCircle) {
                  cross("CPU", $("#square5"), 5);
              } else if (isCross) {
                  circle("CPU", $("#square5"), 5);
              }
              break;
          }
      case 5:
      case 7:
      case 9:
        var chance = checkChance(turn);
        var risk = checkRisk();
        var noChance = checkChance(4);
        if (chance[0]) {
            var i = chance[1];
            var square = "#square" + i;
            if (isCircle) {
                cross("CPU", $(square), i);
            } else if (isCross) {
                circle("CPU", $(square), i);
            }
        } else if (risk[0]) {
            var i = risk[1];
            var square = "#square" + i;
            if (isCircle) {
                cross("CPU", $(square), i);
            } else if (isCross) {
                circle("CPU", $(square), i);
            }
        } else if (noChance[0]) {
            var i = noChance[1];
            var square = "#square" + i;
            if (isCircle) {
                cross("CPU", $(square), i);
            } else if (isCross) {
                circle("CPU", $(square), i);
            }
        }
           else{
          var situation = [];
          checkSit(situation);
          var i = randomSet(situation);
          var square = "#square" + i;
          if (isCircle) {
            cross("CPU", $(square), i);
          } else if (isCross) {
            circle("CPU", $(square), i);
          }
        }
        break;
    }
    if (turn > 4 && checkWin("CPU")) {
      winner("CPU");
      setTimeout(startAgain, 2000);
    } else if (turn == 9) {
      writing.text("DRAW!")
      setTimeout(startAgain, 1000);
    } else {
      writing.text("Player turn!")
      isCPUTurn = false;
      isPlayerTurn = true;
    }
  }

  function startAgain() {
    isPlayerTurn = false;
    isCPUTurn = false;
    turn = 0;
    squares = new squarePrototype;
    for (var i = 1; i < 10; i++) {
      var square = "#square" + i;
      $(square).html("");
      $(square).css("background-color", "");
    }
    writing.text("Deciding who starts...")
    setTimeout(whoStarts, 1000);
  }

  var isPlayerTurn = false;
  var isCPUTurn = false;
  var isCross = false;
  var isCircle = false;
  var turn = 0;
  var squares = new squarePrototype;
  var writing = $("#info-box");

  $(".selection-grid").click(function() {
    console.log($(this).attr("id"));
    if ($(this).attr("id") == "circle") {
      isCircle = true;
    } else {
      isCross = true;
    }
    $(".selection-screen").fadeOut(1000, function() {
      $(".grid").css('visibility', 'visible').hide().fadeIn('slow');
    });
    writing.text("Deciding who starts...")
    setTimeout(whoStarts, 1000);
  })

  $(".square").click(function() {
    if (isPlayerTurn) {
      var number = $(this).data("number");
      if (squares[number] === "" && isCircle) {
        circle("player", $(this), number)
        turn++
        if (turn > 4) {
          if (checkWin("player")) {
            winner("player");
            setTimeout(startAgain, 3000);
          } else if (turn == 9) {
            writing.text("DRAW!");
            setTimeout(startAgain, 3000);
          } else {
            writing.text("CPU turn!")
            setTimeout(CPUTurn, 1000);
          }
        } else {
          writing.text("CPU turn!")
          setTimeout(CPUTurn, 1000);
        }
      } else if (squares[number] === "" && isCross) {
        cross("player", $(this), number)

        turn++
        if (turn > 4) {
          if (checkWin("player")) {
            winner("player");
            setTimeout(startAgain, 3000);
          } else if (turn == 9) {
            writing.text("DRAW!");
            setTimeout(startAgain, 3000);
          } else {
            writing.text("CPU turn!")
            setTimeout(CPUTurn, 1000);
          }
        } else {
          writing.text("CPU turn!")
          setTimeout(CPUTurn, 1000);
        }
      }
    }
  });
})