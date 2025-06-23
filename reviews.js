
function loadReviews() {
    

    $(".list").empty();

    $.get("/api/reviews", function (response) {

        for (const reviews of response) {
            $(".list").append("<li>" + reviews.reviewname + " from " + reviews.locate + " says: " + "<p>" + reviews.response + "</p>" + "</li>")
        }
    });

}


$(document).ready(function () {

    
    // Call this function when the open is opened
    loadReviews();
    $("form").submit(function () {

        const data = {
            reviewname: $("#reviewname").val(),
            locate: $("#locate").val(),
            response: $("#response").val()        }

        $.post("/api/reviews/create", data, function (response) {
            loadReviews();
            console.log("Done");
        });

        return false;
    })

});
