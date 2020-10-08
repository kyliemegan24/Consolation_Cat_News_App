$(document).ready(function () {

    var catAPIKey = "26f9bcd9-9356-4551-94c3-38ed60173dbb";
    var nytAPIKey = "7T7QfWEPRm3WkUcmcZFNLR4MYSjg0X1u";
    var catQueryURL = "https://api.thecatapi.com/v1/images/search?api_key=" + catAPIKey;
    var userInput = document.querySelector("#search")
    var searchCount = document.querySelector("#searchCount")
    var pastSearchesEl = $("#pastSearchesDisplay");
    var savedArticles = []
    var savedCatPhotos = []
    var pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];

    function getStoredInputs() {
        /* var pastArticleSearches = JSON.parse(localStorage.getItem("savedArticles"))
         var pastSearchesComplete = pastArticleSearches + JSON.parse(localStorage.getItem("savedCatPhotos"))
         $("#pastSearchesDisplay").text(pastSearchesComplete)*/
        pastSearchesEl.empty();
        for (var i = 0; i < pastSearches.length; i++) {
            pastSearchesEl.append($("<li class='pastSearch'>").text(pastSearches[i]));
        }

    }

    function clearCat(){
        $("#cat-only").attr("src","");
    }

    $(document).on("click", ".pastSearch", function () {
        getArticles($(this).text());
    })


    $("#run-search").on("click", function (event) {
       
        event.preventDefault();

        var inputText = userInput.value.trim();

        pastSearches.push(inputText);
        localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
        getStoredInputs();

        console.log(inputText);

        getArticles(inputText);

    })

    function getArticles(inputText){
        $(".card-container").css("display","block");
        clearCat();
        var nytQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + inputText + "&api-key=" + nytAPIKey;

        $.ajax({
            url: nytQueryURL,
            method: "GET"
        })
            .then(function (reply) {
                console.log(reply)
                // console.log(reply.response.docs[3].headline.main)
                // console.log(reply.response.docs[3].lead_paragraph)
                // console.log(reply.response.docs[3].web_url)
                var counter = 1;

                for (var i = 0; i < reply.response.docs.length; i++) {

                    $("#card-title" + counter).text(reply.response.docs[i].headline.main)
                    $("#lead-para" + counter).text(reply.response.docs[i].lead_paragraph)
                    $("#web-url" + counter).attr("href", reply.response.docs[i].web_url)
                    var responseArticle = reply.response.docs[i].web_url;
                    counter++
                    savedArticles.push({ responseArticle });
                    callCats();
                }
                //localStorage.setItem("responseArticle", JSON.stringify(responseArticle))
            });

        function callCats() {
            var counter2 = 1;
            for (var i = 1; i < 7; i++) {

                $.ajax({
                    url: catQueryURL,
                    method: "GET"
                })
                    .then(function (response) {
                        console.log(response)
                        // console.log(response[0].url)

                        $("#catImg" + counter2).attr("src", response[0].url)
                        var responseCatPhoto = response[0].url
                        counter2++
                        savedCatPhotos.push({ responseCatPhoto });

                        //localStorage.setItem("responseCatPhoto", JSON.stringify(responseCatPhoto))
                    })
            }
        }

    };

    $("#cats-only").on("click", function () {
        $.ajax({
            url: catQueryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response)
                // console.log(response[0].url)

                $("#cat-only").attr("src", response[0].url)
                //.attr("style", "width: 400px")
            })


    });

    $("#clear-all").on("click", function(){
        $(".card-container").css("display","none");
        clearCat();
    })
    getStoredInputs();

});
