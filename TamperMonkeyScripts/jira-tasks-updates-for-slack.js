// ==UserScript==
// @name       Jira Item - Copy updates message for Slack thread
// @namespace  http://tampermonkey.net/
// @version    0.1
// @description  Create Updates message for slack
// @match      https://southworks.atlassian.net/browse/*
// @copyright  Juan Milla
// @author     juanjomilla
// @require http://code.jquery.com/jquery-latest.js
// @grant        GM_setClipboard
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var highPriorityLevels = ["high", "urgent", "hotfix", "next", "highest"];

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
            .append('<button id="slackButton">Copy For Slack</button>');

        $('#slackButton').click(function () {
            // Get the priority level
            // TODO: get element that contains the item priority
            // var itemPriorityLevel = $('span.sc-jqIZGH.faHkSh');
            // var itemPriorityLevelValue = itemPriorityLevel[0].innerText;

            // Build the slack message
            var priorityIcon = ':thinkingpepe:';

            // if (highPriorityLevels.includes(itemPriorityLevelValue.toLowerCase()))
            // {
            //     priorityIcon = ':fire:'
            // }

            GM_setClipboard(priorityIcon + " *[Updates]* `" + document.title + "`\n" + window.location , 'text');
        });
    }, 2000);
})();

GM_addStyle ( `
    #slackButton {
        background: rgb(0, 120, 212);
        color: rgb(255,255,255);
        cursor: pointer;
        border: none;
        font: 12px "Segoe UI";
        line-height: 26px;
`);
