// ==UserScript==
// @name         Codeforces Ranks+
// @version      1.0.0
// @description  a handful of rank colors
// @author       temporary1
// @match        https://codeforces.com/*
// @match        http://codeforces.com/*
// @resource     rankcolorscss rankcolors.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @run-at       document-start
// ==/UserScript==

// !!!!! colors are picked to work with https://github.com/GaurangTandon/codeforces-darktheme. change them yourself if you want

(function () {
    "use strict";

    var rankColorsCSS = GM_getResourceText("rankcolorscss");
    GM_addStyle(rankColorsCSS);

    const msPerFrameLGM = 80; // miliseconds per frame for lgm animation
    const msPerFrame4000 = 20; // miliseconds per frame for 4000 animation

    function overrideStyleAttribute(elm, prop, value) {
        // elm.setAttribute("style", elm.getAttribute("style") + `; ${prop}: ${value} !important; `);
        let style = elm.getAttribute("style") || "";

        let styleObj = style.split(';').reduce((acc, styleProp) => {
            let [key, val] = styleProp.split(':').map(item => item.trim());
            if (key) {
                acc[key] = val;
            }
            return acc;
        }, {});

        styleObj[prop] = `${value} !important`;

        let newStyle = Object.entries(styleObj).map(([key, val]) => `${key}: ${val}`).join('; ');

        elm.setAttribute("style", newStyle);
    }

    // check if master
    function isMasterRank(element) {

        if (element.hasAttribute('title')) {
            if (element.title.toLowerCase().includes("master") && !element.title.toLowerCase().includes("international")) {
                return true;
            } else {
                return false;
            }
        }
        const textContent = element.textContent.trim().toLowerCase();
        if (textContent.includes('master') && !textContent.includes('international')) {
            return true;
        }
        if (textContent.trim() === 'm') {
            return true;
        }
        // rating
        if (!isNaN(parseInt(element.textContent.trim())) && parseInt(element.textContent.trim()) >= 2100 && parseInt(element.textContent.trim()) <= 2299) {
            return true;
        }

        return false;
    }

    // check if igm
    function isIGMRank(element) {

        if (element.hasAttribute('title')) {
            if (element.title.toLowerCase().includes("grandmaster") && element.title.toLowerCase().includes("international")) {
                return true;
            } else {
                return false;
            }
        }
        const textContent = element.textContent.trim().toLowerCase();
        if (textContent.includes('grandmaster') && textContent.includes('international')) {
            return true;
        }
        if (textContent.trim() === "igm") {
            return true;
        }
        // rating
        if (!isNaN(parseInt(element.textContent.trim())) && parseInt(element.textContent.trim()) >= 2600 && parseInt(element.textContent.trim()) <= 2999) {
            return true;
        }

        return false;
    }

    function changeOrange(elm) {
        if (isMasterRank(elm)) {
            elm.classList.remove('user-orange');
            elm.classList.add('user-yellow');
        }
    }

    function changeRed(elm) {
        if (isIGMRank(elm)) {
            elm.classList.remove('user-red');
            elm.classList.add('user-pink');
        }
    }

    function processNewElements(nodes) {
        nodes.forEach(node => {
            if (node.nodeType === 1) {
                if (node.matches('.user-orange')) {
                    changeOrange(node);
                    // setTimeout(() => changeOrange(node),0);
                }
                if (node.matches('.user-red')) {
                    changeRed(node);
                    // setTimeout(() => changeRed(node),0);
                }
                node.querySelectorAll('.user-orange').forEach(childNode => {
                    changeOrange(childNode);
                    // setTimeout(() => changeOrange(childNode), 0);
                });
                node.querySelectorAll('.user-red').forEach(childNode => {
                    changeRed(childNode);
                    // setTimeout(() => changeRed(childNode), 0);
                });
            }
        });
    }

    function animateGradient() {
        let position = 0;
        let id = null;

        function frame() {
            position += 1;
            if (position > 100) position = 0;
            document.querySelectorAll('.user-legendary').forEach(elm => {
                overrideStyleAttribute(elm, "background-position", `${position}% 50%`);
            });
        }

        clearInterval(id);
        id = setInterval(frame, msPerFrameLGM);
    }

    function animateGradient4000() {
        let position = 0;
        let id = null;

        function frame() {
            position += 1;
            if (position > 100) position = 0;
            document.querySelectorAll('.user-4000').forEach(elm => {
                overrideStyleAttribute(elm, "background-position", `${position}% 50%`);
            });
        }

        clearInterval(id);
        id = setInterval(frame, msPerFrame4000);
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    var observer = new MutationObserver(function (mutationsList) {
        mutationsList.forEach(function (mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('user-orange')) {
                    changeOrange(mutation.target);
                    // setTimeout(() => changeOrange(mutation.target), 0);
                }
                if (mutation.target.classList.contains('user-red')) {
                    changeRed(mutation.target);
                    // setTimeout(() => changeRed(mutation.target), 0);
                }
            }
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                processNewElements(mutation.addedNodes);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', async function() {
        document.querySelectorAll('.user-orange').forEach(function (elm) {
            changeOrange(elm);
            // setTimeout(() => applyClassChanges(elm), 0);
        });
        document.querySelectorAll('.user-red').forEach(function (elm) {
            changeRed(elm);
            // setTimeout(() => applyClassChanges(elm), 0);
        });

        observer.observe(document.body, { attributes: true, childList: true, subtree: true });

        animateGradient();
        animateGradient4000();
    });
})();