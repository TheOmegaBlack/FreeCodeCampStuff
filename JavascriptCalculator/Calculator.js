$(document).ready(function(){
	function execute(){
    if (operator === "+"){
    	result = (parseFloat(oldNumber) + parseFloat(number)).toString();
      	$('.display-up').val(result);
      	$('.display-low').val(allString);
    }
    else if (operator === "-"){
		result = (parseFloat(oldNumber) - parseFloat(number)).toString();
		$('.display-up').val(result);
      	$('.display-low').val(allString);
    }
    else if (operator === "÷"){
		result = (parseFloat(oldNumber) / parseFloat(number)).toString();
      	$('.display-up').val(result);
      	$('.display-low').val(allString);}
    else if (operator === "×"){
      result = (parseFloat(oldNumber) * parseFloat(number)).toString();
      $('.display-up').val(result);
      $('.display-low').val(allString);}
	}
  
	var number = "";
	var oldNumber = "";
	var allString = "";
	var operator = "";
	var result = "";
	var equalized = false;
	var pointCheck = false;
    
    $('.number').click(function (){
		if (equalized){
			$('.display-up').val("0");
			$('.display-low').val("0");
			equalize = false;
		}
      	number += $(this).text();
      	allString += $(this).text();
    	$('.display-up').val(number);
	    $('.display-low').val(allString);
	});
  	$('.operator').click(function (){
   		if (operator !== "" && number !== "")
	 	{
	  		execute();
			pointCheck = false;
			operator = $(this).text();
			if (result !== ""){
				oldNumber = result;
			}
			else
			{
				oldNumber = number;
			}
	  		number = "";
	  		allString += $(this).text();
	 		$('.display-low').val(allString);
	 	}
        else if (operator === "" && number !== "")
        {	
			pointCheck = false;
			operator = $(this).text();         
			oldNumber = number;
			number = "";
			allString += $(this).text();
			$('.display-low').val(allString);
        }
	});
  	$(".clear,.clearall").click(function(){
		allString = allString.substr(0, allString.length - number.length);
		pointCheck = false;
		number = "";
		$('.display-up').val(0); 
		$('.display-low').val(allString);
		result = "";
			if($(this).text() == "CE"){
				allString = "";
				$('.display-low').val(0);
				operator = "";
			}
	});
	$(".equal").click(function(){
		execute();
		pointCheck = false;
		equalized = true;
		number = "";
	  	oldNumber = "";
		allString = "";
		operator = "";
		result = "";
  	});
  	$(".point").click(function(){
		if (!pointCheck && number !== ""){
			number += ".";
			allString += ".";	
			$('.display-up').val(number);
			$('.display-low').val(allString);
		}
		else if (!pointCheck && number === ""){
			number += "0.";
			allString += "0.";
			$('.display-up').val(allString);
			$('.display-low').val(allString);
		}
		pointCheck = true;
	})
});