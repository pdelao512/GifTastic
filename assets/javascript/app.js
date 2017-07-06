// Create an array for Random topics
$(document).ready(function(){
    var topics = ["Russian Dashcams", "Fail", "Reverse", "Prank", "Wasted", "Infomercial", "Googly Eye", "Real Life Doodles"];

    // ========================================================

  //  create buttons
    function buttonCategory(){
        // Delete topics before adding new categories so there's no repeat buttons 
        $("#buttonsView").empty();
         // loop through the array
        for ( var i=0; i < topics.length; i++) {
           // make buttons for every topic in array
            var a = $("<button>");
            a.addClass("category"); // add class
            a.attr("data-name", topics[i]); // add data-attribute
            a.text(topics[i]); // make button text
            $("#buttonsView").append(a); // append button to button view div
        }
    }    
    buttonCategory();
   

// add new category button event
  $(document).on("click", ".category", function() {

    var category = $(this).html(); 
    console.log(category);
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=745c9eca842f40cab3c3f719f22a55e4&limit=10";
        // console.log(queryURL);
        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            // grabs the data
            var results = response.data;
            // console.log(results);
            //empties the div before adding more gifs
            $("#categoryView").empty();
                //loops through the data
                for ( var j=0; j < results.length; j++) {
                    var imageDiv = $("<div>");
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  
                    var categoryImage = $("<img>").attr("src", still).attr("data-animate", imageView).attr("data-still", still);
                    categoryImage.attr("data-state", "still");
                    $("#categoryView").prepend(categoryImage);
                    categoryImage.on("click", playGif);
                    
                    // pulling the rating
                        var rating = results[j].rating;
                            // console.log(rating);
                        var displayRated= $("<p>").text("Rating: " + rating);
                        $("#categoryView").prepend(displayRated);
            
                } //for loop
        }); // done response

        function playGif() { 
                    var state = $(this).attr("data-state");
                    console.log(state);
                 if ( state == "still"){
                     $(this).attr("src", $(this).data("animate"));
                      $(this).attr("data-state", "animate");
                 } else{
                     $(this).attr("src", $(this).data("still"));
                     $(this).attr("data-state", "still");
                    }

                } //on click express
                
    }) // document on click

       


//adding new button
$(document).on("click", "#addCategory", function(){
    if ($("#category-input").val().trim() == ""){
      alert("Input can not be left blank");
   }
   else {
    var category = $("#catagory-input").val().trim();
    topics.push(category);
    $("#category-input").val("");
    buttonCategory();
    return false;

    }

});



});  //document ready