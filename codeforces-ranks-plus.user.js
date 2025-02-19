// ==UserScript==
// @name         Codeforces Ranks+
// @version      1.0.0
// @description  a handful of rank colors
// @author       temporary1
// @match        https://codeforces.com/*
// @match        http://codeforces.com/*
// @updateURL    https://github.com/temporary77/codeforces-ranks-plus/raw/main/codeforces-ranks-plus.user.js
// @downloadURL  https://github.com/temporary77/codeforces-ranks-plus/raw/main/codeforces-ranks-plus.user.js
// @resource     rankcolorsdark https://raw.githubusercontent.com/temporary77/codeforces-ranks-plus/refs/heads/main/rankcolorsdark.css
// @resource     rankcolorslight https://raw.githubusercontent.com/temporary77/codeforces-ranks-plus/refs/heads/main/rankcolorslight.css
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @run-at       document-start
// ==/UserScript==

/* globals $, GM_config */

// !!!!! colors are picked to work with https://github.com/GaurangTandon/codeforces-darktheme. change them yourself if you want

(function () {
    "use strict";

    let msPerFrameLGM = GM_getValue('msPerFrameLGM',80); // miliseconds per frame for lgm animation
    let msPerFrame4000 = GM_getValue('msPerFrame4000',20); // miliseconds per frame for 4000 animation

    let gmc = new GM_config(
        {
            'id': 'rankscfg',
            'title': 'Codeforces Ranks+ Config',
            'fields':
            {
                'msPerFrameLGM': { label: 'msPerFrameLGM', section: ['Configurable Options'], type: 'int', default: 80 },
                'msPerFrame4000': { label: 'msPerFrame4000', type: 'int', default: 20 },
            },
            'events':
            {
                'open': function () {
                    let iframe = document.querySelector("#rankscfg");
                    if (!iframe) {
                        console.log("couldnt find iframe");
                        return;
                    }
                    let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    function modiframe(selector, callback) {
                        let element = iframeDoc.querySelector(selector);
                        callback(element);
                    }
                    modiframe("#rankscfg_header", (elm) => {
                        let descdiv = document.createElement("div");
                        descdiv.innerText = `a handful of rank colors`;
                        descdiv.style.cssText = "font-size: 14px; color: gray; margin-top: 5px; text-align: center";
                        elm.insertAdjacentElement("afterend", descdiv);
                    });
                    function addDesc(selector, desc) {
                        modiframe(`#rankscfg_${selector}_var`, (elm) => {
                            let descdiv = document.createElement("div");
                            descdiv.innerText = desc;
                            descdiv.style.cssText = "font-size: 12px; color: gray; margin-top: 5px;";
                            elm.appendChild(descdiv);
                        });
                    }
                    function chain(selector) {
                        modiframe(`#rankscfg_${selector}_var`, (elm) => {
                            elm.style.display = "inline-block";
                            elm.style.marginRight = "15px";
                        });
                    }
                    addDesc("msPerFrameLGM",`miliseconds per frame for lgm animation`);
                    addDesc("msPerFrame4000",`miliseconds per frame for 4000 animation`);
                },
                'save': function () {
                    function updateConfig(configName) {
                        const val = gmc.get(configName);
                        GM_setValue(configName,val)
                    }
                    updateConfig('msPerFrameLGM');updateConfig('msPerFrame4000');
                    location.reload();
                }
            }
        });
    GM_registerMenuCommand("Open Config", () => gmc.open());

    function isDarkMode() {
        const bgColor = window.getComputedStyle(document.body).backgroundColor;
        let lum = parseInt(bgColor.match(/\d+/)[0], 10);
        if (lum < 128) {
            return 1;
        } else {
            return 0;
        }
    } // sentience

    var rankColorsCSS = GM_getResourceText(isDarkMode() ? "rankcolorsdark" : "rankcolorslight");
    GM_addStyle(rankColorsCSS);

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

    function isMasterText(name) {
        name = name.toLowerCase();
        if (name.includes("master") && !name.includes("international"))return true;
        if (name.includes("мастер") && !name.includes("международный"))return true;
        return false;
    }
    // check if master
    function isMasterRank(element) {

        if (element.hasAttribute('title')) {
            if (isMasterText(element.title)) {
                return true;
            } else {
                return false;
            }
        }
        const textContent = element.textContent.trim().toLowerCase();
        if (isMasterText(textContent)) {
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

    function isIGMText(name) {
        name = name.toLowerCase();
        if (name.includes("grandmaster") && name.includes("international"))return true;
        if (name.includes("гроссмейстер") && name.includes("международный"))return true;
        return false;
    }
    // check if igm
    function isIGMRank(element) {

        if (element.hasAttribute('title')) {
            if (isIGMText(element.title)) {
                return true;
            } else {
                return false;
            }
        }
        const textContent = element.textContent.trim().toLowerCase();
        if (isIGMText(textContent)) {
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

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(() => {
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
        }, 0);
    }
})();