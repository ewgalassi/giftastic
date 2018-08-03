$(document).ready(function() {
    var topics = ["doge", "not my concern", "y u no", "not sure if", "all the"]

    function renderButtons() {
        for (item in topics) {
            var btn = $("<button>");
            btn.attr("data-name", topics[item]);
            btn.text(topics[item]);
            $("#buttons-view").append(btn);
        }
    };

    function displayGifs() {
        var subject = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=YOUR_API_KEY&limit=5"
    };

    $("#add-meme").click(function(event) {
        event.preventDefault();
        var meme = $("#meme-input").val().trim();
        topics.push(meme);
        renderButtons();
    });
})