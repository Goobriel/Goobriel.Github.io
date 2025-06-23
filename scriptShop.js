

$(function(){

    $(".btn-buy-now").click(function(){

        const id = $(this).data("product-id");

        alert("Purchase successful! Item number " + id + " has been ordered!")
    });

/***** Subscribe to Newsletter ********/

document.getElementById('btn-subscribe').addEventListener('click', function() {
    let sub = document.getElementById('subscription').value.trim();
    let check = sub.includes("@");
    if (sub.length === 0 || check != true) {
        alert("Please use a valid email");
    } else {
        alert("Subscribed to InsperShirt NewsLetter!");
    }
});


let cartclicked = 0;

$( "#cart-icon" ).on( "click", function() {
    cartclicked = cartclicked + 1;
    console.log("amount of clicks" + cartclicked);
    if (cartclicked%2 == 1){
        $("#close").show( "slow");
    }
    else if (cartclicked%2 == 0){
        $("#close").hide( "slow");
    }
}); 

/* Maybe try this instead so it isnt lagging behind the clicks
var flip = 0;
$( "button" ).on( "click", function() {
  $( "p" ).toggle( flip++ % 2 === 0 );
});
*/

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

/////////////////////////////////////////////////////// 
/*
$(function (){
let list = 0;

easy FOR LOOP:
for (let el of ARRAY){
    list = list + el;
}
})
*/
///////////////////////////////////////////////////////

});
