// ==UserScript==
// @name            Jira Item - Generate link from jira task
// @namespace       http://tampermonkey.net/
// @version         0.3
// @description     Generates a link to the Jira task with the format '[#linkToTask] title of the task'
// @match           https://*.atlassian.net/browse/*
// @copyright       Juan Milla
// @author          juanjomilla
// @updateURL       https://github.com/juanjomilla/tools/raw/master/TamperMonkeyScripts/jira-copy-link-task-clipboard.js
// @downloadURL     https://github.com/juanjomilla/tools/raw/master/TamperMonkeyScripts/jira-copy-link-task-clipboard.js
// @require         http://code.jquery.com/jquery-latest.js
// @grant           GM_setClipboard
// @grant           GM_addStyle
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
        background: #0052cc;
        color: rgb(255,255,255);
        cursor: pointer;
        border: none;
        font: 14px "Arial";
        line-height: 14px;
        border-radius: 3px;
        padding: 0 10px;
        margin-right: 8px;
`);
