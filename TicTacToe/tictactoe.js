$(document).ready(function(){
    var squares = {
        9 : [{isFree : true}],
        8 : [{isFree : true}],
        7 : [{isFree : true}],
        6 : [{isFree : true}],
        5 : [{isFree : true}],
        4 : [{isFree : true}],
        3 : [{isFree : true}],
        2 : [{isFree : true}],
        1 : [{isFree : true}]
    }
    
   $(".square").click(function(){
      $(this).html('<svg width="100%" height="100%" class="svg-content"><circle cx="50%" cy="50%" r="40%" stroke="green" stroke-width="10" fill-opacity="0"/></svg>')
   });
});