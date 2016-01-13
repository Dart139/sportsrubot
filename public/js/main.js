document.onload = (function(){
    var underscore = _;

    fetch('/message.json')
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            console.log('parsed json', JSON.parse(json).data);
            var data = JSON.parse(json).data,
                html = '',
                templateText = _.template("<div class='comment'><div class='text'><%= text %></div><div class='rating'><div class='plus'><%= plus %></div><div class='minus'><%= minus %></div></div></div>");

            underscore.each(data.comments, function(comment) {
                html += templateText({ text : comment.text, plus: comment.rating.plus, minus: comment.rating.minus })
            });

            document.body.innerHTML = html;

        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
})();