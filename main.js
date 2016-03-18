function main () {
  (function() {
    var RE = /@all\s/;
    document.getElementById('_chatText').addEventListener('blur', function(e){
      if (RE.test(e.target.value)) {
        var toStr = "";
        var members = RM.getSortedMemberList();
        members.forEach(function(id) {
          toStr += "[To:" + id + "] ";
        });
        e.target.value = e.target.value.replace(RE, toStr);
      }
    });
  })();
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);