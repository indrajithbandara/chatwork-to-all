function main () {
  (function() {
    document.getElementById('_chatText').addEventListener('blur', function(e){
      if (/@all/.test(e.target.value)) {
        var toStr = "";
        var members = RM.getSortedMemberList();
        members.forEach(function(id) {
          toStr += "[To:" + id + "] ";
        });
        e.target.value = e.target.value.replace(/@all/, toStr);
      }
    });
  })();
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);