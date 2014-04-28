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
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch : function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      //data: JSON.stringify(),
      contentType: 'application/json',
      success: function (data) {
        return data;
      },
      error: function (data) {

        console.error('chatterbox: Failed to send message');
      }
    });
  }
};


// $.ajax( { } );
