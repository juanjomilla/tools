// ==UserScript==
// @name        Jira Item - Open preview For EOD
// @namespace   http://tampermonkey.net/
// @version     0.1
// @description Open preview For EOD
// @match       https://southworks.atlassian.net/browse/*
// @copyright   Juan Milla
// @author      juanjomilla
// @require     http://code.jquery.com/jquery-latest.js
// @grant       GM_setClipboard
// @grant       GM_addStyle
// ==/UserScript==

(function(){
    'use strict';

    setTimeout(function(){
        var segments = window.location.pathname.split("/");
        var id = segments[segments.length-1].toLowerCase();
        
        var principalUrl = "";
        var preset = "";

        var linkIssueButton = $('span').filter( function (i) {
            return $(this).html().toLowerCase() === 'link issue'
        });

        linkIssueButton
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .append('<button id="foreodButton">Open For EOD</button>');

            $('#foreodButton')
                .click(function (){
                    window.open(principalUrl + id + "?preset=" + preset);
                });
        
    }, 2000);
}())

GM_addStyle ( `
    #foreodButton {
        background: rgb(255, 0, 0);
        color: rgb(255,255,255);
        cursor: pointer;
        border: none;
        font: 12px "Segoe UI";
        line-height: 26px;
`);
