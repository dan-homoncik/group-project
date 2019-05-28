$(document).ready(function() {

    
    
    $(".searchBtn").on("click", function(event){
        event.preventDefault();
        var getInput = $(".searchTerm").val();
        //console.log(getInput);
        localStorage.setItem("query",getInput);
        window.location= "./hero.html";
    });
        //localStorage.setItem("query",getInput);
    

})