function chatBot() {

    this.input;
    
    this.respondTo = function (input) {
  
      this.input = input.toLowerCase();
  
      if (this.match('(እፎ አደርከ|ሰላም)'))
      return "እግዛብሃር ይሰባሆ (እግዛሃር ይመስገን)";
  
      if (this.match('(መኑ ይትበሃል ስምኪ)'))
         return " ስምየ ይትበሃል ስላም (ስም ሰላም ይባላል) ";
  
         if (this.match('(መኑ ውእቱ ገበረኪ )'))
         return "ነብዩ ገበረኒ (ነብዩ ነው የሰራው)";
  
         if (this.match('(ምን ውእቱ ግብረ ትገብሪ)'))
         return "ግእዝ-አማርፍ ትርጉም (https://t.me/tnsaegeez)";
  
      return input + ", ምን?";
    };
  
    
    this.match = function (regex) {
  
      return new RegExp(regex).test(this.input);
    };
  }
  
  
  $(function () {
   
   
    var you = 'ቀሲስ';
    var robot = 'ሰላም';
  
   
    var delayStart = 400;
    var delayEnd = 800;
  
    
    var bot = new chatBot();
    var chat = $('.chat');
    var waiting = 0;
    $('.busy').text(robot + ' is typing...');
  
   
    var submitChat = function () {
  
      var input = $('.input input').val();
      if (input == '') return;
  
      $('.input input').val('');
      updateChat(you, input);
  
      var reply = bot.respondTo(input);
      if (reply == null) return;
  
      var latency = Math.floor(Math.random() * (delayEnd - delayStart) + delayStart);
      $('.busy').css('display', 'block');
      waiting++;
      setTimeout(function () {
        if (typeof reply === 'string') {
          updateChat(robot, reply);
        } else {
          for (var r in reply) {
            updateChat(robot, reply[r]);
          }
        }
        if (--waiting == 0) $('.busy').css('display', 'none');
      }, latency);
    };
  
    var updateChat = function (party, text) {
  
      var style = 'you';
      if (party != you) {
        style = 'other';
      }
  
      var line = $('<div><span class="party"></span> <span class="text"></span></div>');
      line.find('.party').addClass(style).text(party + ':');
      line.find('.text').text(text);
  
      chat.append(line);
  
      chat.stop().animate({ scrollTop: chat.prop("scrollHeight") });
  
    };
  
  
    $('.input').bind('keydown', function (e) {
      if (e.keyCode == 13) {
        submitChat();
      }
    });
    $('.input a').bind('click', submitChat);
  
  
    updateChat(robot, 'ሰላም');
  
  });