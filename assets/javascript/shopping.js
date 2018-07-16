$(function(){

    var shoppingQuery = localStorage.getItem("query");

    // var shoppingQueryURL = "http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=DanHomon-s-PRD-98bb06b1d-de4b9aaa&siteid=0&version=967&QueryKeywords=" + shoppingQuery + "&AvailableItemsOnly=true&MaxEntries=5"

    var shoppingQueryURL = "https://cors-anywhere.herokuapp.com/http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=DanHomon-s-PRD-98bb06b1d-de4b9aaa&siteid=0&version=967&QueryKeywords=deadpool&AvailableItemsOnly=true&MaxEntries=3"


    $.ajax({
        url: shoppingQueryURL,
        method: "GET"
    }).then(function(response) {
        var json = JSON.parse(response);
        console.log(json);
        console.log(json.Product[0].DetailsURL);
        console.log(json.Product[0].Title);

    });

});