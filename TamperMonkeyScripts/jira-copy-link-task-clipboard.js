// ==UserScript==
// @name       Jira Item - Generate link from jira task
// @namespace  http://tampermonkey.net/
// @version    0.1
// @description  Generates a link to the Jira task with the format '[#linkToTask] title of the task'
// @match      https://*.atlassian.net/browse/*
// @copyright  Juan Milla
// @author     juanjomilla
// @require http://code.jquery.com/jquery-latest.js
// @grant        GM_setClipboard
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {

        var linkIssueButton = $('span').filter( function (i) {
            return $(this).html().toLowerCase() === 'link issue'
        });

        linkIssueButton
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .append('<button id="sodButton">Copy For SOD</button>');

        $('#sodButton').click(function () {
            var jiraTaskNumberLink = window.location.toString();
            var jiraTaskNumber = jiraTaskNumberLink.replace("https://southworks.atlassian.net/browse/", "");
            var documentTitle = document.title.toString().replace("[" + jiraTaskNumber + "]", "").replace(" - Jira", "");

            GM_setClipboard("[<a href='" + jiraTaskNumberLink +"'>" + jiraTaskNumber +"</a>]" + documentTitle, 'html');
        });
    }, 2000);
})();

GM_addStyle ( `
    #sodButton {
        background: rgb(0, 120, 212);
        color: rgb(255,255,255);
        cursor: pointer;
        border: none;
        font: 12px "Segoe UI";
        line-height: 26px;
`);
