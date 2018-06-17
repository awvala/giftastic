// Global variables
topics = ["Metal Gear", "Final Fantasy", "Nier: Automata", "Destiny 2", "Dragon Ball FighterZ", "Stardew Valley", "The Witcher", "Dark Souls"];

//Add new gif button
$("#search").on("click", function(event) {
    event.preventDefault();

    var newSeries = $("#addSeries").val().trim();
    var newButton = $("<button type='button'>");
    newButton.addClass("btn btn-primary gifButton");
    newButton.attr("gameSeries",newSeries);
    newButton.attr("type", "button");
    newButton.append(newSeries);
    $("#buttonBar").append(newButton);
    $("#addSeries").val("");
    giphyAPI(newSeries);
});

//When user clicks a .gifButton call giphy API
$(document.body).on("click", ".gifButton", function() {
    var gameSer = $(this).attr("gameSeries");
    giphyAPI(gameSer);
});

//toggle gif animated state
$(document.body).on("click", ".card-img-top", function() {
    var gifState= $(this).attr("state");
    var gifStill= $(this).attr("still-link");
    var gifAnimated= $(this).attr("animated-link");

    if (gifState === "animated") {
        $(this).attr("src", gifStill);
        $(this).attr("state", "still");
    } else {
        $(this).attr("src", gifAnimated);
        $(this).attr("state", "animated");
    }  
});


//Query giphy API
function giphyAPI (series) {

var gameSer = series;
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gameSer + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
        var card = $("<div>", {class: 'card'});
        var gifimage = $("<img>", {class: 'card-img-top img-fluid'});
        gifimage.attr("src", results[i].images.fixed_width_still.url);
        gifimage.attr({'animated-link': results[i].images.fixed_width.url});
        gifimage.attr({'still-link': results[i].images.fixed_width_still.url});
        gifimage.attr({'state': "still"});
        var cardBody = $("<div>", {class: 'card-body'});
        var cardtitle = $("<h4>", {class: 'card-title'});
        cardtitle.text(results[i].title);
        var rating = results[i].rating;
        var cardRating = $("<p>").text("Rating: " + rating);

        //Build masonry card
        cardBody.append(cardtitle);
        cardBody.append(cardRating);
        card.append(gifimage);
        card.append(cardBody);
    
        //Add card to Masonry grid
        $(".card-columns").prepend(card);
    }
  })
};