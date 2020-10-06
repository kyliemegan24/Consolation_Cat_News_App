$(document).ready(function () {

    var catAPIKey = "26f9bcd9-9356-4551-94c3-38ed60173dbb";
    var nytAPIKey = "7T7QfWEPRm3WkUcmcZFNLR4MYSjg0X1u";
    var catQueryURL = "https://api.thecatapi.com/v1/images/search?api_key=" + catAPIKey;
    var userInput = document.querySelector("#search")
    var searchCount = document.querySelector("#searchCount")
    var pastSearches = document.querySelector("#pastSearchesDisplay")
    
    


    function getStoredInputs() {
        var pastSearches = JSON.parse(localStorage.getItem("pastSearches"))
        $("#pastSearchesDisplay").text(pastSearches)
    }


    // 
    $("#run-search").on("click", function (event) {
        event.preventDefault();

        var inputText = userInput.value.trim();
        console.log(inputText);
        // if input field blank - return
        if (inputText === "") {
            return;
        } else {
            localStorage.setItem("pastSearches", JSON.stringify(inputText))
        }
        // getResponse();
        // add the search to our aray of searches)
    

        // function getResponse() {
        var nytQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + inputText + "&api-key=" + nytAPIKey;

        $.ajax({
        url: nytQueryURL,
        method: "GET"
        })
        .then(function (reply) {
            console.log(reply)
            console.log(reply.response.docs[3].headline.main)
            console.log(reply.response.docs[3].lead_paragraph)
            console.log(reply.response.docs[3].web_url)

            $("#card-title").text(reply.response.docs[3].headline.main)
            $("#lead-para").text(reply.response.docs[3].lead_paragraph)
            $("#web-url").attr("href", + reply.response.docs[3].web_url)
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
    });
    getStoredInputs();
});