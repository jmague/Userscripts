// ==UserScript==
// @name        Reputation filter for SE search
// @namespace   https://github.com/normalhuman/
// @description With queries such as is:q intags:mine is:20, hides the questions where OP's reputation is under 20.
// @description Include some search parameter that requires questions, like is:q does above (closed:0 is a good choice).
// @match       *://*.askubuntu.com/search*
// @match       *://*.mathoverflow.net/search*
// @match       *://*.serverfault.com/search*
// @match       *://*.stackapps.com/search*
// @match       *://*.stackexchange.com/search*
// @match       *://*.stackoverflow.com/search*
// @match       *://*.superuser.com/search*
// @grant       none
// @run-at      document-end
// @version     17.7.1
// ==/UserScript==

(function() {
  'use strict';

  var minRep = document.location.href.match(/is%3A(\d+)/i);
  if (!minRep) {
	return;
  }
  minRep = parseInt(minRep[1], 10);
  var site = document.location.hostname.split(".")[0];
  var links = document.querySelectorAll(".result-link a");
  var postIds = Array.from(links).map(function (a) {
	return a.href.split("/")[4];
  });
  var apiKey = "SHlJ4RSv6D2U2*uPaAFCww((";
  var filter = "!w-(NS0vUDHvs3-bCGM";
  var request = "https://api.stackexchange.com/2.2/questions/" + postIds.join(";") + "?pagesize=50&site=" + site + "&filter=" + filter + "&key=" + apiKey;
  $.getJSON(request, function(data) {
    if (data.items) {
      for (var i = 0; i < data.items.length; i++) {
	    var q = data.items[i];
	    if (q.owner && (q.owner.reputation < minRep)) {
	  	  var resultToHide = document.getElementById("question-summary-" + q.question_id);
		  if (resultToHide) {
		    resultToHide.remove();
		  }
		}
	  }
	}
  });

})();
