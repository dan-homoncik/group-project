$(function(){

    var shoppingQuery = localStorage.getItem("query");
    var productCat = $(".heroName").attr("data-item");
    //console.log(productCat);
    // var shoppingQueryURL = "http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=DanHomon-s-PRD-98bb06b1d-de4b9aaa&siteid=0&version=967&QueryKeywords=" + shoppingQuery + "&AvailableItemsOnly=true&MaxEntries=5"

    shoppingQueryURL = "https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=DanHomon-s-PRD-98bb06b1d-de4b9aaa&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" 
    + shoppingQuery
    + "&itemFilter.name=TopRatedSellerOnly&itemFilter.value=true" ;

    $.ajax({
        url: shoppingQueryURL,
        method: "GET"
    }).then(function(response) {
        var json = JSON.parse(response);
        /*console.log(json);
        console.log(json.Product[0].DetailsURL);
        console.log(json.Product[0].Title);*/



        for(var i = 0; i < 6; i++) {
            var newDiv = $("<a>");
            newDiv.addClass("shoppingLinks");
            newDiv.attr("href", json.findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL[0]);
            newDiv.text(json.findItemsByKeywordsResponse[0].searchResult[0].item[i].title[0]);
            $(".ebayLinks").append(newDiv);
            $(".ebayLinks").append("<br><br>");

        }

    });

    function toyAjax(item){
        //var shoppingQuery = localStorage.getItem("query");

        // var shoppingQueryURL = "http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=DanHomon-s-PRD-98bb06b1d-de4b9aaa&siteid=0&version=967&QueryKeywords=" + shoppingQuery + "&AvailableItemsOnly=true&MaxEntries=5"

        var findingURL = "https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=DanHomon-s-PRD-98bb06b1d-de4b9aaa&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" 
        + shoppingQuery + "%20" + item 
        + "&itemFilter.name=TopRatedSellerOnly&itemFilter.value=true" ;


        $.ajax({
            url: findingURL,
            method: "GET"
        }).then(function(response) {
            var json = JSON.parse(response);
            //$("." + item + "Col").empty();
            
            for(var i = 0; i < json.findItemsByKeywordsResponse[0].searchResult[0].item.length; i++) {
                //json.findItemsByKeywordsResponse[0].searchResult[0].item.length
                var newRow = $("<a>").addClass("row productRow");
                newRow.attr("href", json.findItemsByKeywordsResponse[0].searchResult[0].item[i].viewItemURL[0])

                var imgCol = $("<div>").addClass("col s4 imgCol");
                var imgTag = $("<img>").attr("src", json.findItemsByKeywordsResponse[0].searchResult[0].item[i].galleryURL[0]);
                imgCol.append(imgTag);
                
                var productCol = $("<div>").addClass("col s8 productCol");
                var productName = $("<h4>").addClass("productName");
                productName.text(json.findItemsByKeywordsResponse[0].searchResult[0].item[i].title[0]);
                productCol.append(productName);

                newRow.append(imgCol);
                newRow.append(productCol);
                
                $("." + item + "Col").append(newRow);
            }

        });
    }

    toyAjax(productCat);
});