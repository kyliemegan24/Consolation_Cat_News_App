$(document).ready(function () {

    var catAPIKey = "26f9bcd9-9356-4551-94c3-38ed60173dbb";
    var nytAPIKey = "7T7QfWEPRm3WkUcmcZFNLR4MYSjg0X1u";
    var catQueryURL = "https://api.thecatapi.com/v1/images/search?api_key=" + catAPIKey;
    var userInput = document.querySelector("#search")
    var searchCount = document.querySelector("#searchCount")
    var pastSearches = document.querySelector("#pastSearchesDisplay")
    var savedArticles = []
    var savedCatPhotos = []

    function getStoredInputs() {
        var pastArticleSearches = JSON.parse(localStorage.getItem("savedArticles"))
        var pastSearchesComplete = pastArticleSearches + JSON.parse(localStorage.getItem("savedCatPhotos"))
        $("#pastSearchesDisplay").text(pastSearchesComplete)
    }

    $("#run-search").on("click", function (event) {
        event.preventDefault();

        var inputText = userInput.value.trim();
        console.log(inputText);
        
      
        var nytQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + inputText + "&api-key=" + nytAPIKey;

        $.ajax({
        url: nytQueryURL,
        method: "GET"
        })
        .then(function (reply) {
            // console.log(reply)
            // console.log(reply.response.docs[3].headline.main)
            // console.log(reply.response.docs[3].lead_paragraph)
            // console.log(reply.response.docs[3].web_url)

            $("#card-title").text(reply.response.docs[3].headline.main)
            $("#lead-para").text(reply.response.docs[3].lead_paragraph)
            $("#web-url").attr("href", + reply.response.docs[3].web_url)
            var responseArticle = reply.response.docs[3].web_url
            
            savedArticles.push({responseArticle});
            localStorage.setItem("responseArticle", JSON.stringify(responseArticle))
        });

        $.ajax({
        url: catQueryURL,
        method: "GET"
        })
        .then(function (response) {
            // console.log(response)
            // console.log(response[0].url)

            $("#catImg").attr("src", response[0].url)
            var responseCatPhoto = response[0].url
            
            savedCatPhotos.push({responseCatPhoto});
            localStorage.setItem("responseCatPhoto", JSON.stringify(responseCatPhoto))
        })
        
    });
    getStoredInputs();
});