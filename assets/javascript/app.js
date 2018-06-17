// Global variables
var topics = ["Metal Gear", "Final Fantasy", "Nier", "Destiny", "Dragon Ball Z", "Stardew Valley", "The Witcher", "Dark Souls", "The Legend of Zelda","Halo", "God Of War"];
var gifReturn = 10;

$(document).ready (function buildButton() {
    buildButton();    

// Build buttonBar
function buildButton() {
    $("#buttonBar").html("");
    for (i=0; i < topics.length; i++) {
        var newSeries = topics[i];
        var newButton = $("<button type='button'>");
        newButton.addClass("btn btn-primary gifButton");
        newButton.attr("gameSeries",newSeries);
        newButton.attr("type", "button");
        newButton.append(newSeries);
        $("#buttonBar").append(newButton);
        }
}
        
// Add new gif button
$("#search").on("click", function(event) {
    event.preventDefault();

    var newSeries = $("#addSeries").val().trim();
    topics.push(newSeries);
    $("#addSeries").val("");
    buildButton();
});

// Change limit parameter of Giphy API Query
$("#inputNumGif").on("change", function() {
    gifReturn = $("#inputNumGif").val();
    //console.log(gifReturn);
});

// When user clicks a .gifButton call giphy API
$(document.body).on("click", ".gifButton", function() {
    var gameSer = $(this).attr("gameSeries");
    giphyAPI(gameSer);
});

// When user clicks a gif, toggle gif state
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

// Query Giphy API
function giphyAPI (series) {
var gameSer = series;
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gameSer + "&api_key=dc6zaTOxFJmzC&limit="+ gifReturn;

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
        var cardTitle = $("<h4>", {class: 'card-title'});
        cardTitle.text(results[i].title);
        var rating = results[i].rating;
        var cardRating = $("<p>").text("Rating: " + rating);
        //var cardDownloadBtn = $("<a href='" + results[i].images.original.mp4 + "'download>Download Gif</a>");
        //cardDownloadBtn.addClass("btn btn-secondary btn-sm");
        //cardDownloadBtn.attr({'tabindex':'-1', 'role': 'button', 'aria-disabled': 'true'});

        // Build masonry card
        cardBody.append(cardTitle);
        cardBody.append(cardRating);
        //cardBody.append(cardDownloadBtn);
        card.append(gifimage);
        card.append(cardBody);
    
        // Add card to masonry grid
        $(".card-columns").prepend(card);
        }
    })
    };
});