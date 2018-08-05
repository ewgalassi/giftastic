$(document).ready(function() {
    var topics = ["doge", "not my concern", "y u no", "not sure if", "all the"];

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
        var subject = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=JaYZ7DBSrMFf0TxZxFLnXRhOQ8x12zyW&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var results = response.data;
            for (item in results) {
                var gifDiv = $("<div data-motion='still'>");
                var rating = results[item].rating;
                var p = $("<p>").text("rating: " + rating);
                var memeImage = $("<img>");
                memeImage.attr("src", results[item].images.fixed_height_still.url)
                memeImage.attr("animated", results[item].images.fixed_height.url);
                gifDiv.prepend(p);
                gifDiv.prepend(memeImage);
                $("#memes-view").prepend(gifDiv);
            }
        });
    };

    $("#add-meme").click(function(event) {
        event.preventDefault();
        var meme = $("#meme-input").val().trim();
        topics.push(meme);
        renderButtons();
    });

    $(document).on("click", ".meme", displayGifs);

    renderButtons();
})