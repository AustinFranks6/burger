$(function() {
    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newburger").val().trim(),devoured: 0
        };
    

        $.ajax("/api/burgers", {
            type: "POST",
            data: NewBurger
        }).then(function() {
            console.log("Added new burger");
            location.reload();
        });
    });
    $(".eatburger").on("click", function(event){
        var devouredState = {
            devoured: 1
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(function() {
            console.log("Burger devoured");
            locations.reload();
        });
    });
    $(".trashburger").on("clcik", function(event) {
        event.preventDefault();

        var id = $(this).data("id");

        $.ajax({
            type: "DELETE",
            url: "/api/burgers/" + id
        }).then(location.reload());
    });

});