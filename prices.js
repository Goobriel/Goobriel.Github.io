$(function(){
    $.get("/prices", function (response){

        $("#price1").text(response.newShirts);
        $("#price2").text(response.newShirts);
        $("#price3").text(response.newShirts);
        $("#price4").text(response.newShirts);
        $("#price5").text(response.BestSellers);
        $("#price6").text(response.BestSellers);
        $("#price7").text(response.BestSellers);
        $("#price8").text(response.BestSellers);
        
        console.log(response);
    });
});