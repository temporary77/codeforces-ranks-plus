// ==UserScript==
// @name         Codeforces Ranks+
// @version      1.0.0
// @description  more rank colors
// @author       temporary1
// @match        https://codeforces.com/*
// @match        http://codeforces.com/*
// @resource     rankcolorscss rankcolors.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @run-at       document-start
// ==/UserScript==

(function () {
    "use strict";

    var rankColorsCSS = GM_getResourceText("rankcolorscss");
    GM_addStyle(rankColorsCSS);

    function overrideStyleAttribute(elm, prop, value) {
        elm.setAttribute("style", elm.getAttribute("style") + `; ${prop}: ${value} !important; `);
    }

    // check if master
    function isMasterRank(element) {
        // <a>
        if (element.tagName === 'A' && element.title.toLowerCase().includes("master") && !element.title.toLowerCase().includes("international")) {
            return true;
        }

        // <span>
        if (element.tagName === 'SPAN') {
            if (element.hasAttribute('title') && element.title.toLowerCase().includes("master") && !element.title.toLowerCase().includes("international")) {
                return true;
            }
            const textContent = element.textContent.trim().toLowerCase();
            if (textContent.includes('master') && !textContent.includes('international')) {
                return true;
            }
        }

        // <span> with rating
        if (!isNaN(parseInt(element.textContent.trim())) && parseInt(element.textContent.trim()) >= 2100 && parseInt(element.textContent.trim()) <= 2299) {
            return true;
        }

        return false;
    }

    function applyClassChanges(elm) {
        if (isMasterRank(elm)) {
            elm.classList.remove('user-orange');
            elm.classList.add('user-yellow');
        }
    }

    function processNewElements(nodes) {
        nodes.forEach(node => {
            if (node.nodeType === 1) {
                if (node.matches('.user-orange')) {
                    applyClassChanges(node);
                }
                node.querySelectorAll('.user-orange').forEach(applyClassChanges);
            }
        });
    }

    var observer = new MutationObserver(function (mutationsList) {
        mutationsList.forEach(function (mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('user-orange')) {
                    applyClassChanges(mutation.target);
                }
            }
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                processNewElements(mutation.addedNodes);
            }
        });
    });

    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.user-orange').forEach(function (elm) {
            applyClassChanges(elm);
        });
    });
})();