$(document).ready(function(){

    var catAPIKey = "26f9bcd9-9356-4551-94c3-38ed60173dbb";
    var nytAPIKey = "7T7QfWEPRm3WkUcmcZFNLR4MYSjg0X1u";
    var catQueryURL = "https://api.thecatapi.com/v1/images/search?api_key=" + catAPIKey;
    var userInput = $("search").textcontent

    var nytQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userInput + "&api-key=" + nytAPIKey;

            $.ajax({
            url: nytQueryURL,
            method: "GET"
            })
            .then(function(response) {
                console.log(response)
            })

    $.ajax({
        url: catQueryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
        });
});