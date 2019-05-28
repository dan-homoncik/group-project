$(document).ready(function() {

    var query = localStorage.getItem("query");



        var key = "8cba4aa547c28425aa27e55b217f2ca9541d38ce";
        var queryURL = "https://comicvine.gamespot.com/api/search/?api_key=" + key + "&query=" + query + "&resources=issue&limit=10&format=JSONP";

        $.ajax({
     
            url: queryURL,
            method: "GET",
            dataType: "jsonp",
            crossDomain:true,
            jsonp:"json_callback"

        }).then(function(response) {
            console.log(response);

            for (var i = 0; i < response.results.length; i++){

                var image = response.results[i].image.thumb_url;
                var issue_name = response.results[i].name;
                var issue_number = response.results[i].issue_number;
                var publish_date = response.results[i].cover_date;
                
                var comicsDiv = $("<div>");
                comicsDiv.addClass("comics-container");

                var bookCover = $("<img>");
                bookCover.addClass("col s2 coverImage");
                bookCover.attr("src", image);
                comicsDiv.append(bookCover);

                var comicsText = $("<div>");
                comicsText.addClass("col s10");


                var nameDiv = $("<div>");
                nameDiv.addClass("comicText");
                nameDiv.text(issue_name);
                comicsText.append(nameDiv);

                var issueDiv = $("<div>");
                issueDiv.addClass("comicText");
                issueDiv.text("Issue Number: " + issue_number);
                comicsText.append(issueDiv);

                var publishDiv = $("<div>");
                publishDiv.addClass("comicText");
                publishDiv.text("Date published: " + publish_date);
                comicsText.append(publishDiv);

                $(comicsDiv).append(comicsText);
                $(".comicsRows").append(comicsDiv);


            };
        });


});

 