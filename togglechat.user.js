// ==UserScript==
// @name         Show/hide chat
// @namespace    http://tampermonkey.net/
// @version      17.5.24
// @description  Show or hide all chat messages
// @match        *://chat.stackexchange.com/rooms/*
// @match        *://chat.stackoverflow.com/rooms/*
// @match        *://chat.meta.stackexchange.com/rooms/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var box = document.getElementById('input');
  var chat = document.getElementById('chat');
  var room = window.location.href.match(/chat[^/]*\/rooms\/\d+/)[0];
  var insertRef = document.getElementById('chat-buttons');
  var showButton = newElem('a', 'show-chat', 'button', 'show chat');
  showButton.title = 'show all chat messages';
  showButton.onclick = function() {toggleChat(1);};
  insertRef.appendChild(showButton);
  var hideButton = newElem('a', 'hide-chat', 'button', 'hide chat');
  hideButton.title = 'remove all chat messages';
  hideButton.onclick = function() {toggleChat(0);};
  insertRef.appendChild(hideButton);


  function toggleChat(show) {
    var mon = document.getElementsByClassName('monologue');
    for (var i = 0; i < mon.length; i++) {
      mon[i].style.display = show ? 'block' : 'none';
    }
    var elems = [document.getElementById('info'), document.getElementById('room-ad'), document.getElementById('starred-posts')];
    for (i = 0; i < elems.length; i++) {
      elems[i].style.display = show ? 'block' : 'none';
    }
  }


  function newElem(eType,eId,eClass,eText) {
    var e = document.createElement(eType);
    if (eId.length>0) {e.id = eId;}
    if (eClass.length>0) {e.classList.add(eClass);}
    if (eText.length>0) {e.textContent = eText;}
    return e;
  }

})();
