function main() {

  // @http://stackoverflow.com/questions/2360655/jquery-event-handlers-always-execute-in-order-they-were-bound-any-way-around-t
  // Force to bind a handler to first
  $.fn.bindFirst = function(name, fn) {
    // bind as you normally would
    this.on(name, fn);

    this.each(function() {
      var handlers = $._data(this, 'events')[name.split('.')[0]];
      // take out the handler we just inserted from the end
      var handler = handlers.pop();
      // move it at the beginning
      handlers.splice(0, 0, handler);
    });
  };

  (function() {
    var RE = /@all\s/gi;
    var chatText = $C("#_chatText");

    var doReplace = function() {
      if (!chatText) return;
      if (RE.test(chatText.val())) {
        var toStr = "";
        var members = RM.getSortedMemberList() || [];

        members.forEach(function(id) {
          toStr += "[To:" + id + "] ";
        });
        chatText.val(chatText.val().replace(RE, toStr));
      }
    };

    // send button click event
    $C("#_sendButton").bindFirst('click', doReplace);

    // chat text keyup event
    $C("#_chatText").bindFirst('keyup', function(e) {
      // using global variables press_key, up_key
      up_key = e.keyCode;
      var isEnterKey = up_key == 13 && press_key == 13;

      // Enter key
      if (isEnterKey) {
        var _ctr = (typeof e.modifiers == "undefined") ? e.ctrlKey : (e.modifiers & Event.CONTROL_MASK);
        var _shift = (typeof e.modifiers == "undefined") ? e.shiftKey : (e.modifiers & Event.SHIFT_MASK);
        var _alt = (typeof e.modifiers == "undefined") ? e.altKey : (e.modifiers & Event.ALT_MASK);
        var _meta = (typeof e.modifiers == "undefined") ? e.metaKey : (e.modifiers & Event.META_MASK);
        var hasModifier = _ctr || _shift || _alt || _meta;

        if (ST.data.enter_action == "send") {
          if (!hasModifier) doReplace();
        } else {
          if (hasModifier) doReplace();
        }
      }

    });
  })();
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);