$(document).ready(function() {

    var query = localStorage.getItem("query");
    var heroID = "";


        var key = "8cba4aa547c28425aa27e55b217f2ca9541d38ce";
        var queryURL = "https://comicvine.gamespot.com/api/characters/?api_key=" + key + "&filter=name%3A" + query + "&limit=1&format=JSONP";

        $.ajax({
     
            url: queryURL,
            method: "GET",
            dataType: "jsonp",
            crossDomain:true,
            jsonp:"json_callback"

        }).then(function(response) {
            console.log(response);
            heroID = response.results[0].id;  
            console.log(heroID);
    
        });   
        
        function displayMovie(){
        var queryURL2 = "https://comicvine.gamespot.com/api/movies/?_=1531805789833&api_key=8cba4aa547c28425aa27e55b217f2ca9541d38ce&filter=name%3A" + query +"&format=JSONP&json_callback=jQuery331025566422322834037_1531805789832&limit=10";
        $.ajax({
            url: queryURL2,
            method: "GET",
            dataType: "jsonp",
            crossDomain:true,
            jsonp:"json_callback"
        }).then(function(response) {
            console.log(queryURL2);
            var movies = response.results
            console.log(movies);

            for(var i=0; i < movies.length; i++){

               var movieDiv = $("<div class = movie-container col>");
               movieDiv.addClass("yo");

               var image = movies[i].image.small_url; 
               movieDiv.append("<img class = 'movie-holder' src='" + image  + "'>");

               var name = movies[i].name;
               movieDiv.append("<div class = title>" + name + "</div>");

               var rating = movies[i].rating;
               movieDiv.append("<div>" +  rating + "</div>")

               var info = movies[i].deck;
               movieDiv.append("<div class = deck >" + info + "</div>");

               $(".movie-box").append(movieDiv);

                console.log(movies[i].name);
            }
        
        });
    }

    // function hello(){
    //     $(".movie-box").append(query);
    //    //alert(query);
    // }

    $(document).on("click",".heroSubmit", function(event) {
        event.preventDefault();
        var getInput = $(".heroSearch").val();
        localStorage.setItem("query", getInput);
        query = localStorage.getItem("query");
        $(".heroSearch").empty();
        $(".movie-box").empty();
         displayMovie();
    //    hello();
    })

//    hello();
    displayMovie();
    
});
