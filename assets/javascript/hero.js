$(function(){

    var hero = {
        name : "",
        deck : "",
        realName : "",
        origin : "",
        imageUrl : "",
        aliases: "",
        gender: "",
        birth: "",
        firstAppearance: "",
        publisher: "",
        issueCount: ""
    }
    

    var query = localStorage.getItem("query");
    //console.log(query);
    
    var key = "390f1045415ee2e2bbb6b090a5a6cc8457d2f4f0";
    //var test = "https://cors-anywhere.herokuapp.com/https://comicvine.gamespot.com/api/characters/?api_key="+ key +"&filter=name%3Adeadpool&format=JSON";
    var queryURL = "https://cors-anywhere.herokuapp.com/https://comicvine.gamespot.com/api/search/?api_key=" + key + "&query=" + query + "&limit=1&format=JSON";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        //console.log(response.results[0].deck);
        
        //basic info
        hero.name = response.results[0].name;
        hero.realName = response.results[0].real_name;
        if (response.results[0].birth === null) {
            hero.birth = "Unknown";
        } else {
            hero.birth = response.results[0].birth;
        };
        hero.origin = response.results[0].origin.name;
        if (response.results[0].gender === 1) {
            hero.gender = "Male";
        } else if (response.results[0].gender === 2) {
        hero.gender = "Female";
        } else {
            hero.gender = "Other";
        };
        
        hero.aliasesraw = response.results[0].aliases;

        hero.aliases =  hero.aliasesraw.replace(/\n/ig, ', ');
                // story
        hero.deck = response.results[0].deck;
        hero.imageUrl = response.results[0].image.original_url;
        
        //publication facts
        hero.firstAppearance = response.results[0].first_appeared_in_issue.issue_number + " - " + response.results[0].first_appeared_in_issue.name;
        hero.publisher = response.results[0].publisher.name;
        hero.issueCount = response.results[0].count_of_issue_appearances;

        $(".heroName").text(hero.name);
        $(".realName").append(" " + hero.realName);
        $(".dateOfBirth").append(" " + hero.birth);
        $(".heroRace").append(" " + hero.origin);
        $(".heroGender").append(" " + hero.gender);
        $(".aliases").append(" "+ hero.aliases);
        $(".story").text(hero.deck);
        $(".mainImage").attr("src", hero.imageUrl);
        $(".firstAppearance").append(hero.firstAppearance);       
        $(".publisher").append(hero.publisher);    
        $(".issueCount").append(hero.issueCount);    
    });
    
});


