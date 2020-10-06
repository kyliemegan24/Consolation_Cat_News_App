$(document).ready(function () {

    var catAPIKey = "26f9bcd9-9356-4551-94c3-38ed60173dbb";
    var nytAPIKey = "7T7QfWEPRm3WkUcmcZFNLR4MYSjg0X1u";
    var catQueryURL = "https://api.thecatapi.com/v1/images/search?api_key=" + catAPIKey;
    var userInput = document.querySelector("#search")
    var searchCount = document.querySelector("#searchCount")
    var pastSearches = document.querySelector("#pastSearchesDisplay")
    
    console.log(inputText);
    


    function getStoredInputs() {
        var pastSearches = JSON.parse(localStorage.getItem("pastSearches"))
        $("#pastSearchesDisplay").text(pastSearches)
    }


    // 
    $("#run-search").on("click", function (event) {

        var inputText = userInput.value.trim();
        // if input field blank - return
        if (inputText === "") {
            return;
        } else {
            localStorage.setItem("pastSearches", JSON.stringify(inputText))
        }
        getResponse();
        // add the search to our aray of searches)
    };

    function getResponse() {
    var nytQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userInput + "&api-key=" + nytAPIKey;

    $.ajax({
        url: nytQueryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
        })

    $.ajax({
        url: catQueryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            console.log(response[0].url)

            $("#catImg").attr("src", response[0].url)
        })
    }
    getStoredInputs();
});