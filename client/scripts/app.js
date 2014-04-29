// YOUR CODE HERE:

var app = {
  init : function(){
    $(document).ready(function (){

      var roomName;

      $('body').on('submit', function(e){
        e.preventDefault();

      });

      app.fetch(roomName); // On page load, retrieve messages
      $(".refresh").on("click", function(){
        $(".message").remove();
        app.fetch(roomName);
      });
      $(".room").on("click", function(){
        roomName = prompt("Which room would you like to enter?");
        $(".message").remove();
        app.fetch(roomName);
        $('.roomName').text(roomName);

      });

      $('.sendSomeStuff').on('click', function(e){
        var newMessage = {};
        e.preventDefault();
        newMessage['text'] = $('input').val();
        newMessage['username'] = window.location.search.slice(10);
        newMessage['roomname'] = roomName;
        app.sendSomeStuff(newMessage);
        $('input').val('');
        $(".message").remove();
        app.fetch(roomName);
        return false;
      });

      $("body").on("click", '.user', function(){
          $(this).css('font-weight', 'bold');
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

      },
      error: function (data) {
        console.error('chatterbox: Failed to sendSomeStuff message');
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
          var time = "<div class='time'></div>";
          var user = "<div class='user'></div>";
          $('.message:last').text(results[i]["text"] + " " + moment(results[i]['createdAt']).fromNow());
          $('.message:last').prepend(user);
          $(".user:last").text(results[i]["username"]);
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






















