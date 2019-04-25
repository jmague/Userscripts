// ==UserScript==
// @name         ISO date format in Gmail
// @namespace    https://github.com/normalhuman/
// @version      16.2.1
// @description  Change Gmail date format to ISO 8601, per http://webapps.stackexchange.com/q/89499
// @author       Normal Human
// @match        https://mail.google.com/mail/u/0/
// @grant        none
// @run-at       document-idle
// ==/UserScript==
/* jshint -W097 */
'use strict';

window.setInterval(toISO, 500);

function toISO() {
  var rows = document.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {
    var rowElements = rows[i].children;
    if (rowElements.length == 10) {
      var timestamp = rowElements[8].firstElementChild;
      if (!/:/.test(timestamp.textContent)) {
        var parts = timestamp.title.split(/, | | at /);
        if (parts.length == 7) {
          var month = 1 + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(parts[1]);
          timestamp.textContent = parts[3] + '-' + ('0' + month).slice(-2) + '-' + ('0' + parts[2]).slice(-2);
        }
      }
    }
  }
}
