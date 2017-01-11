// ==UserScript==
// @name         SmokeDetector notifications
// @namespace    Smokey
// @version      16.6.1
// @description  Beep when Smokey talks
// @description  Based on Chrome extension https://chrome.google.com/webstore/detail/fight-spam-on-se-sites/pkpdgmdicibddkgkikdfnaggkdobhmgk
// @author       Normal Human
// @match        *://chat.stackexchange.com/rooms/*
// @match        *://chat.stackoverflow.com/rooms/*
// @match        *://chat.meta.stackexchange.com/rooms/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var box = document.getElementById('input');
var chat = document.getElementById('chat');
var room = window.location.href.match(/chat[^/]*\/rooms\/\d+/)[0];

if (box && chat && room) {
  var metabeep = new Audio('//cdn-chat.sstatic.net/chat/meta2.mp3');
  var observer = new MutationObserver(checkForSpam);
  observer.observe(chat, {childList: true, subtree: true});
}

function checkForSpam() {
  var messageList = document.getElementsByClassName('message');
  var message = messageList[messageList.length-1];
  if (message && !message.classList.contains('checkedForSpam')) {
    message.classList.add('checkedForSpam');
    if (message.children[1] && !message.parentNode.parentNode.classList.contains('mine') && !message.querySelector('.onebox')) {
      processChatMessage(message);
    }
  }
}


function processChatMessage(message) {
  var smoke = /\[ SmokeDetector \]/;
  var content = message.children[1].textContent;
  var i, msg = {}, parts, ch, path, hash, site = '', qId = '', sq;
  if (smoke.test(content)) {
    ch = message.children[1].children;
    for (i=ch.length-1; i>=0; i--) {
      if (ch[i].tagName == 'A') {
        hash = ch[i].href.split('#');
        path = ch[i].href.split('/');
        if (path[3] == 'questions' && hash.length>1) {
          site = path[2];
          qId = hash[1];
        }
        else if (/^[qa]/.test(path[3])) {
          site = path[2];
          qId = path[4];
        }
      }
    }
    if (site && qId) {
      metabeep.play();
    }
  }
}
