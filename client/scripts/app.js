// YOUR CODE HERE:

var app = {
  init : function(){
    $(document).ready(function (){
      console.log(window.location.search);

      app.fetch(); // On page load, retrieve messages
      $(".refresh").on("click", function(){
        $(".message").remove();
        app.fetch();
      });
      $('.sendSomeStuff').on('click', function(){
        var newMessage = {};
        newMessage['text'] = $('input').val();
        newMessage['username'] = window.location.search.slice(10);
        newMessage['roomName'] = 'lobby';
        //console.log(window.location.search);
        console.log(newMessage);
        app.sendSomeStuff(newMessage);
        return false;
      });
    });
  },

  sendSomeStuff : function(message){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to sendSomeStuff message');
        //console.log(data);
      }
    });
  },
  fetch : function(room){
    var parameters = encodeURI('order=-createdAt');
    var filter = encodeURI('where={"roomname":"'+ room +'"}');
    if(room !== undefined){
      var parameters = parameters + "&" + filter;
    }
    $.ajax(app.server, {
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: parameters,
      contentType: 'application/json',
      success: function (data) {
        var results = data.results;
        //console.log(data);
        for(var i = 0; i < results.length; i++){
          var message = "<div class='message chat'></div>";

          $('#main').append(message);
          $('.message:last').text(results[i]['username']+": "+ results[i]["text"]);
        }
      },
      error: function (data) {
        console.error('chatterbox: Failed to sendSomeStuff message');
      }
    });
  },

  server : 'https://api.parse.com/1/classes/chatterbox'


};







app.init();






















