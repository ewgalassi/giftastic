$(document).ready(function() {
    var topics = ["doge", "but that's none of my business", "y u no", "futurama fry", "all the things"];

    function renderButtons() {
        $("#buttons-view").empty();
        for (item in topics) {
            var btn = $("<button>");
            btn.addClass("meme");
            btn.attr("data-name", topics[item]);
            btn.text(topics[item]);
            $("#buttons-view").append(btn);
        }
    };

    function displayGifs() {
        $("#memes-view").empty();
        var subject = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=JaYZ7DBSrMFf0TxZxFLnXRhOQ8x12zyW&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            for (item in results) {
                var gifDiv = $("<div>");
                var rating = results[item].rating;
                var p = $("<p>").text("rating: " + rating);
                var memeImage = $("<img>");
                memeImage.attr("data-state", "still");
                memeImage.attr("class", "gif");
                memeImage.attr("src", results[item].images.fixed_height_still.url);
                memeImage.attr("data-still", results[item].images.fixed_height_still.url);
                memeImage.attr("data-animate", results[item].images.fixed_height.url);
                gifDiv.prepend(p);
                gifDiv.prepend(memeImage);
                $("#memes-view").prepend(gifDiv);
            }
        });
    };

    $("#add-meme").on("click", function(event) {
        event.preventDefault();
        var meme = $("#meme-input").val().trim();
        topics.push(meme);
        renderButtons();
    });

    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $(document).on("click", ".meme", displayGifs);

    renderButtons();
})