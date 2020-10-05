var catAPIKey = "";
var nytAPIKey = "";
var catQueryURL = "";
var nytQueryURL = "";
            
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
            .then(function(response) {
                console.log(response)
            })