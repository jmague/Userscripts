// ==UserScript==
// @name         Show/hide chat
// @namespace    http://tampermonkey.net/
// @version      17.2.1
// @description  Show or hide all chat messages
// @match        *://chat.stackexchange.com/rooms/*
// @match        *://chat.stackoverflow.com/rooms/*
// @match        *://chat.meta.stackexchange.com/rooms/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var shown = true;
  var box = document.getElementById('input');
  var chat = document.getElementById('chat');
  var room = window.location.href.match(/chat[^/]*\/rooms\/\d+/)[0];
  var toggle = newElem('a', 'togglechat', 'button', 'toggle chat');
  toggle.title = 'remove all chat messages';
  toggle.onclick = toggleChat;
  var insertRef = document.getElementById('chat-buttons');
  insertRef.appendChild(toggle, insertRef);


  function toggleChat() {
    var mon = document.getElementsByClassName('monologue');
    for (var i = 0; i < mon.length; i++) {
      mon[i].style.display = shown ? 'none': 'block';
    }
    shown = !shown;
  }


  function newElem(eType,eId,eClass,eText) {
    var e = document.createElement(eType);
    if (eId.length>0) {e.id = eId;}
    if (eClass.length>0) {e.classList.add(eClass);}
    if (eText.length>0) {e.textContent = eText;}
    return e;
  }

})();
