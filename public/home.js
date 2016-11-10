$(document).ready(function() {

    var socket = io();
    var input = $('#typeMessage');
    var messages = $('#messages');
    var disconnectButton = $('#disconnectButton');
    var user = 'dude';

    var connectButton = $('#connectButton');

    var disconnectMessenger = function() {
        $('.signin').show();
        $('.messenger').hide();
    };

  var connectMessenger= function() {

        var nickname = $('input').val();
        socket.emit('MessengerSetUp', nickname);

    };

socket.on('messengerOn', function(){

  $('.signin').hide();
  $('.messenger').show();

});


    connectButton.click(connectMessenger);

    var updateCount = function(count) {

        if (count==1){
            $('#updateCount p').text( 'you are the only one online');
        } else {   $('#updateCount p').text( count + ' online'); }
        // here , make one h1 vriable = to 'there are currently 'count+' people online '

        // socket.emit('onlineCount', count);
    };

    var typing = function(user) {

        console.log('YEY');
        console.log(user + ' is typing');

        // how to reset the set TIme out if it begins
        //How to stop the previous function every time this function runs??

        $('#isTyping p').text(user + ' is typing');

        setTimeout(function() {
            $('#isTyping p').text('nothing');
        }, 5000);

    };

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };



    input.on('keydown', function() {

        console.log(input.val());
        if (input.val.length === 0) {
            return;
        }
        socket.emit('isTyping');

    });

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        socket.emit('message', message);

        addMessage(message);

        input.val('');
    });

    socket.on('closeConnection', disconnectMessenger);
    socket.on('message', addMessage);
    socket.on('onlineCount', updateCount);

    socket.on('setNickname', addMessage);
    socket.on('typing', typing);


});