// ==UserScript==
// @name         Codeforces Ranks+
// @version      1.0.0
// @description  more rank colors
// @author       me
// @match        https://codeforces.com/*
// @match        http://codeforces.com/*
// @resource     rankcolorscss rankcolors.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    function overrideStyleAttribute(elm, prop, value) {
        elm.setAttribute("style", elm.getAttribute("style") + `; ${prop}: ${value} !important; `);
    }

    var rankColorsCSS = GM_getResourceText("rankcolorscss");
    GM_addStyle(rankColorsCSS);

    // check if master
    function isMasterRank(element) {
        // <a> 
        if (element.tagName === 'A' && element.classList.contains('rated-user') && element.classList.contains('user-orange') && element.title.includes("Master") && !element.title.includes("International Master")) {
            return true;
        }

        // <span>
        if (element.tagName === 'SPAN' && element.classList.contains('user-orange')) {
            const textContent = element.textContent.trim().toLowerCase();
            if (textContent.includes('master') && !textContent.includes('international')) {
                return true;
            }
        }

        // <span> with rating
        if (element.classList.contains('user-orange') && !isNaN(parseInt(element.textContent.trim())) && parseInt(element.textContent.trim()) >= 2100 && parseInt(element.textContent.trim()) <= 2299) {
            return true;
        }

        return false;
    }

    // Function to apply class changes based on participant title
    function applyClassChanges() {
        const participantLinks = document.querySelectorAll('.user-orange');
        participantLinks.forEach(link => {
            if (isMasterRank(link)) {
                link.classList.remove('user-orange');
                link.classList.add('user-yellow');
            }
        });
    }

    applyClassChanges();
})();