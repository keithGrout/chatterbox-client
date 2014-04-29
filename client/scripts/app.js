// YOUR CODE HERE:

var app = {
  init : function(){return true;},
  send : function(message){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        //console.log(data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
        //console.log(data);
      }
    });
  },
  fetch : function(){
    $.ajax(app.server, {
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        var results = data.results;
        //console.log(data);
        for(var i = 0; i < results.length; i++){
          var message = "<div class='message'></div>";

          $('#main').append(message);
          $('.message:last').text(results[i]['username']+": "+ results[i]["text"]);
        }
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  server : 'https://api.parse.com/1/classes/chatterbox'


};
$(document).ready(function (){

  app.fetch(); // On page load, retrieve messages
  $(".refresh").on("click", function(){
    $(".message").remove();
    app.fetch();
  });

});


































