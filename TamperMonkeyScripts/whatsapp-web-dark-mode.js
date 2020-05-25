// ==UserScript==
// @name         WhatsApp Web Dark Mode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  sets dark mode on whatsapp
// @author       juanjomilla
// @copyright    Juan Milla
// @match        https://web.whatsapp.com/
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function(){
        var body = $("body");

        body.removeClass("web").addClass("web dark");
    }, 2000);
})();