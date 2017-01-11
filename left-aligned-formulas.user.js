// ==UserScript==
// @name         Left-align display formulas
// @namespace    https://github.com/normalhuman
// @version      16.2.1
// @description  Render display formulas left-aligned on Stack Exchange sites
// @author       Normal Human
// @match        *://*.mathoverflow.net/*
// @match        *://*.stackexchange.com/*
// @grant        none
// ==/UserScript==

if (MathJax) {
  MathJax.Hub.Config({displayAlign: "left"});
  MathJax.Hub.Rerender();
}
