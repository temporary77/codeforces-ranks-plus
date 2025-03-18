// ==UserScript==
// @name         Codeforces Ranks+
// @version      1.1.0
// @description  a handful of rank colors
// @author       temporary1
// @match        https://codeforces.com/*
// @match        http://codeforces.com/*
// @match        https://mirror.codeforces.com/*
// @match        http://mirror.codeforces.com/*
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

// light time colors are picked to work with default,
// dark theme colors are picked to work with https://github.com/GaurangTandon/codeforces-darktheme

/* globals $, GM_config */

(function () {
    "use strict";
    let theme = GM_getValue("theme",1);
    let configs = GM_getValue("configs", {
        "user-black": { type: "none" },
        "user-gray": { type: "none" },
        "user-green": { type: "none" },
        "user-cyan": { type: "none" },
        "user-blue": { type: "none" },
        "user-violet": { type: "none" },
        "user-yellow": { type: "default" },
        "user-trueorange": { type: "none" },
        "user-truered": { type: "none" },
        "user-pink": { type: "default" },
        "user-legendary": { type: "default" },
        "legendary-user-first-letter": { type: "hide" },
        "user-4000": { type: "none" },
        "user-admin": { type: "none" },
    });
    // console.log(configs);
    const classlist = ["user-black","user-gray","user-green","user-cyan","user-blue","user-violet","user-yellow","user-trueorange",
                       "user-truered","user-pink","user-legendary","legendary-user-first-letter","user-4000","user-admin"];

    let defaultDark = {
        "user-yellow": { type: "static", color: "#ffbc42" },
        "user-pink": { type: "static", color: "#ffb2c0" },
        "user-legendary": { type: "static", color: "#b2d8ff" },
    };
    let defaultLight = {
        "user-yellow": { type: "static", color: "#f7b100" },
        "user-pink": { type: "static", color: "#ff7f96" },
        "user-legendary": { type: "static", color: "#72b8ff" },
    };

    const gradientlist = ["Rainbow","Gold","Silver","Bronze"];
    const defaultSpeeds = { "rainbow": 80, "gold": 20, "silver": 20, "bronze": 20 };

    let gradientsDark = {
        "rainbow": { "background": `linear-gradient(
        to right,
        #4dffff, #4dff88, #88ff4d, #ffff4d, #ff884d, #ff4d88, #ff4dff, #884dff, #4d88ff,
        #4dffff, #4dff88, #88ff4d, #ffff4d, #ff884d, #ff4d88, #ff4dff
    )`, "background-size": "250% 100%", "text-shadow": "0px 0px 4px rgba(255, 255, 255, 0.4)" },
        "gold": { "background": `linear-gradient(
        to right,
        #ffffff, #ffffff, #ffffff, #fffea0, #fffea0, #fff18a, #fff18a, #ffe57c, #ffe57c, #ffd76a, #ffd165, #ffd466,
        #ffd165, #ffd76a, #ffe57c, #ffe57c, #fff18a, #fff18a, #fffea0, #fffea0, #ffffff, #ffffff,
        #ffffff, #ffffff, #ffffff, #fffea0, #fffea0, #fff18a, #fff18a, #ffe57c, #ffe57c, #ffd76a, #ffd165, #ffd466,
        #ffd165, #ffd76a, #ffe57c, #ffe57c, #fff18a, #fff18a, #fffea0, #fffea0, #ffffff, #ffffff,
        #ffffff, #ffffff, #ffffff, #fffea0, #fffea0, #fff18a, #fff18a, #ffe57c, #ffe57c, #ffd76a, #ffd165, #ffd466,
        #ffd165, #ffd76a, #ffe57c, #ffe57c, #fff18a, #fff18a, #fffea0, #fffea0, #ffffff, #ffffff,
        #ffffff
    )`, "background-size": "150% 100%", "text-shadow": "0px 0px 4px rgba(255, 206, 102, 0.6)" },
        "silver": { "background": `linear-gradient(
        to right,
        #ffffff, #ffffff, #ffffff, #f3f3f3, #f3f3f3, #e9e9e9, #e9e9e9, #e0e0e0, #e0e0e0, #d6d6d6, #d2d2d2, #d4d4d4,
        #d2d2d2, #d6d6d6, #e0e0e0, #e0e0e0, #e9e9e9, #e9e9e9, #f3f3f3, #f3f3f3, #ffffff, #ffffff,
        #ffffff, #ffffff, #ffffff, #f3f3f3, #f3f3f3, #e9e9e9, #e9e9e9, #e0e0e0, #e0e0e0, #d6d6d6, #d2d2d2, #d4d4d4,
        #d2d2d2, #d6d6d6, #e0e0e0, #e0e0e0, #e9e9e9, #e9e9e9, #f3f3f3, #f3f3f3, #ffffff, #ffffff,
        #ffffff, #ffffff, #ffffff, #f3f3f3, #f3f3f3, #e9e9e9, #e9e9e9, #e0e0e0, #e0e0e0, #d6d6d6, #d2d2d2, #d4d4d4,
        #d2d2d2, #d6d6d6, #e0e0e0, #e0e0e0, #e9e9e9, #e9e9e9, #f3f3f3, #f3f3f3, #ffffff, #ffffff,
        #ffffff
    )`, "background-size": "150% 100%", "text-shadow": "0px 0px 4px rgba(208, 208, 208, 0.6)" },
        "bronze": { "background": `linear-gradient(
        to right,
        #ffe5d8, #ffe5d8, #ffe5d8, #ffd1ba, #ffd1ba, #ffc3a5, #ffc3a5, #ffb996, #ffb996, #ffad84, #ffaa7f, #ffaa7f,
        #ffaa7f, #ffad84, #ffb996, #ffb996, #ffc3a5, #ffc3a5, #ffd1ba, #ffd1ba, #ffe5d8, #ffe5d8,
        #ffe5d8, #ffe5d8, #ffe5d8, #ffd1ba, #ffd1ba, #ffc3a5, #ffc3a5, #ffb996, #ffb996, #ffad84, #ffaa7f, #ffaa7f,
        #ffaa7f, #ffad84, #ffb996, #ffb996, #ffc3a5, #ffc3a5, #ffd1ba, #ffd1ba, #ffe5d8, #ffe5d8,
        #ffe5d8, #ffe5d8, #ffe5d8, #ffd1ba, #ffd1ba, #ffc3a5, #ffc3a5, #ffb996, #ffb996, #ffad84, #ffaa7f, #ffaa7f,
        #ffaa7f, #ffad84, #ffb996, #ffb996, #ffc3a5, #ffc3a5, #ffd1ba, #ffd1ba, #ffe5d8, #ffe5d8,
        #ffe5d8
    )`, "background-size": "150% 100%", "text-shadow": "0px 0px 4px rgba(255, 161, 114, 0.6)" }
    };

    let gradientsLight = {
        "rainbow": { "background": `linear-gradient(
        to right,
        #00f9f9, #00f953, #53f900, #f9f900, #f95300, #f90053, #f900f9, #5300f9, #0053f9,
        #00f9f9, #00f953, #53f900, #f9f900, #f95300, #f90053, #f900f9
    )`, "background-size": "250% 100%", "text-shadow": "0px 0px 4px rgba(175, 175, 175, 0.4)" },
        "gold": { "background": `linear-gradient(
        to right,
        #f4d950, #f4d950, #f4d950, #f2ce3e, #f2ce3e, #edc131, #edc131, #eab927, #eab927, #e0ad14, #dba70d, #d8a90f,
        #dba70d, #e0ad14, #eab927, #eab927, #edc131, #edc131, #f2ce3e, #f2ce3e, #f4d950, #f4d950,
        #f4d950, #f4d950, #f4d950, #f2ce3e, #f2ce3e, #edc131, #edc131, #eab927, #eab927, #e0ad14, #dba70d, #d8a90f,
        #dba70d, #e0ad14, #eab927, #eab927, #edc131, #edc131, #f2ce3e, #f2ce3e, #f4d950, #f4d950,
        #f4d950, #f4d950, #f4d950, #f2ce3e, #f2ce3e, #edc131, #edc131, #eab927, #eab927, #e0ad14, #dba70d, #d8a90f,
        #dba70d, #e0ad14, #eab927, #eab927, #edc131, #edc131, #f2ce3e, #f2ce3e, #f4d950, #f4d950,
        #f4d950
    )`, "background-size": "150% 100%", "text-shadow": "0px 0px 4px rgba(255, 174, 12, 0.4)" },
        "silver": { "background": `linear-gradient(
        to right,
        #d1d1d1, #d1d1d1, #d1d1d1, #c8c8c8, #c8c8c8, #bdbdbd, #bdbdbd, #b7b7b7, #b7b7b7, #aaaaaa, #a4a4a4, #a5a5a5,
        #a4a4a4, #aaaaaa, #b7b7b7, #b7b7b7, #bdbdbd, #bdbdbd, #c8c8c8, #c8c8c8, #d1d1d1, #d1d1d1,
        #d1d1d1, #d1d1d1, #d1d1d1, #c8c8c8, #c8c8c8, #bdbdbd, #bdbdbd, #b7b7b7, #b7b7b7, #aaaaaa, #a4a4a4, #a5a5a5,
        #a4a4a4, #aaaaaa, #b7b7b7, #b7b7b7, #bdbdbd, #bdbdbd, #c8c8c8, #c8c8c8, #d1d1d1, #d1d1d1,
        #d1d1d1, #d1d1d1, #d1d1d1, #c8c8c8, #c8c8c8, #bdbdbd, #bdbdbd, #b7b7b7, #b7b7b7, #aaaaaa, #a4a4a4, #a5a5a5,
        #a4a4a4, #aaaaaa, #b7b7b7, #b7b7b7, #bdbdbd, #bdbdbd, #c8c8c8, #c8c8c8, #d1d1d1, #d1d1d1,
        #d1d1d1
    )`, "background-size": "150% 100%", "text-shadow": "0px 0px 4px rgba(179, 179, 179, 0.4)" },
        "bronze": { "background": `linear-gradient(
        to right,
        #ff9e6d, #ff9e6d, #ff9e6d, #f39261, #f39261, #e98857, #e98857, #e07f4e, #e07f4e, #d67544, #ce6c3b, #c96b3c,
        #ce6c3b, #d67544, #e07f4e, #e07f4e, #e98857, #e98857, #f39261, #f39261, #ff9e6d, #ff9e6d,
        #ff9e6d, #ff9e6d, #ff9e6d, #f39261, #f39261, #e98857, #e98857, #e07f4e, #e07f4e, #d67544, #ce6c3b, #c96b3c,
        #ce6c3b, #d67544, #e07f4e, #e07f4e, #e98857, #e98857, #f39261, #f39261, #ff9e6d, #ff9e6d,
        #ff9e6d, #ff9e6d, #ff9e6d, #f39261, #f39261, #e98857, #e98857, #e07f4e, #e07f4e, #d67544, #ce6c3b, #c96b3c,
        #ce6c3b, #d67544, #e07f4e, #e07f4e, #e98857, #e98857, #f39261, #f39261, #ff9e6d, #ff9e6d,
        #ff9e6d
    )`, "background-size": "150% 100%", "text-shadow": "0px 0px 4px rgba(255, 93, 12, 0.4)" }
    };

    let configFields = {
                'user-admin': { label: 'Headquarters', type: 'select', section: ['Rank Options'],
                                options: ['No Change', 'Custom'],
                                default: 'No Change' },
                'user-4000': { label: '4000', type: 'select',
                                options: ['No Change', 'Custom'],
                                default: 'No Change' },
                'legendary-user-first-letter': { label: 'LGM first letter', type: 'select',
                                options: ['No Change', 'Hide', 'Custom'],
                                default: 'Hide' },
                'user-legendary': { label: 'LGM', type: 'select',
                                options: ['No Change', 'Default Light Blue', 'Custom'],
                                default: 'Default Light Blue' },
                'user-pink': { label: 'IGM', type: 'select',
                                options: ['No Change', 'Default Pink', 'Custom'],
                                default: 'Default Pink' },
                'user-truered': { label: 'GM', type: 'select',
                                options: ['No Change', 'Custom'],
                                default: 'No Change' },
                'user-trueorange': { label: 'IM', type: 'select',
                                options: ['No Change', 'Custom'],
                                default: 'No Change' },
                'user-yellow': { label: 'M', type: 'select',
                                options: ['No Change', 'Default Yellow', 'Custom'],
                                default: 'Default Yellow', },
                'user-violet': { label: 'CM', type: 'select',
                                options: ['No Change', 'Custom'],
                                default: 'No Change' },
                'user-blue': { label: 'E', type: 'select',
                                options: ['No Change', 'Custom'],
                                default: 'No Change' },
                'user-cyan': { label: 'S', type: 'select',
                                options: ['No Change', 'Custom'],
                                default: 'No Change' },
                'user-green': { label: 'P', type: 'select',
                                options: ['No Change', 'Custom'],
                                default: 'No Change' },
                'user-gray': { label: 'N', type: 'select',
                                options: ['No Change', 'Custom'],
                                default: 'No Change' },
                'user-black': { label: 'Unrated', type: 'select',
                                options: ['No Change', 'Custom'],
                                default: 'No Change' },
            };

    {
        function addGdOptions(name) {
            for (let x of gradientlist) {
                configFields[name].options.push(x);
            }
        }
        for (let x of classlist) {
            addGdOptions(x);
        }
    }
    {
        let fieldList = Object.entries(configFields).map(([name,props]) => ({name,props}));
        // console.log(fieldList);
        function addExtFields(name) {
            let idx = fieldList.findIndex(elm => elm.name === name);
            fieldList.splice(idx+1,0,{ name:`${name}_custom`, props:{ label: 'Color', type: 'text', default: '#000000' } });
            fieldList.splice(idx+2,0,{ name:`${name}_speed`, props:{ label: 'ms/frame (-1 for default)', type: 'int', default: -1 } });
        }
        for (let x of classlist) {
            addExtFields(x);
        }
        configFields = fieldList.reduce((acc,elm) => {
            acc[elm.name] = elm.props;
            return acc;
        }, {});
    }

    let gmc = new GM_config(
        {
            'id': 'rankscfg',
            'title': 'Codeforces Ranks+ Config',
            'fields': configFields,
            'events':
            {
                'open': function() {
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
                    function breakline(selector) {
                        modiframe(`#rankscfg_${selector}_var`, (elm) => {
                            let breakdiv = document.createElement("div");
                            breakdiv.style.cssText = "width: 100%, height: 0";
                            elm.insertAdjacentElement("beforebegin", breakdiv);
                        });
                    }
                    /* modiframe("#rankscfg_section_header_0", (elm) => {
                        let descdiv = document.createElement("div");
                        descdiv.innerText = "miliseconds per frame for color animations";
                        descdiv.style.cssText = "font-size: 14px; color: black; margin-top: 5px; margin-bottom: 5px";
                        elm.insertAdjacentElement("afterend", descdiv);
                    }); */
                    for (let x of classlist) {
                        breakline(x);
                        chain(x);
                    }
                    function groupOpt(selector) {
                        modiframe(`#rankscfg_field_${selector}`, (elm) => {
                            let optgroup = document.createElement("optgroup");
                            optgroup.label = `Gradients`;
                            for (let option of Array.from(elm.options)) {
                                if (gradientlist.includes(option.value)) {
                                    optgroup.appendChild(option);
                                }
                            }
                            elm.appendChild(optgroup);
                        });
                    }
                    for (let x of classlist) {
                        groupOpt(x);
                    }
                    function updateFields(elm, selector) {
                        let opt = elm.value;
                        let customField = iframeDoc.querySelector(`#rankscfg_${selector}_custom_var`);
                        let speedField = iframeDoc.querySelector(`#rankscfg_${selector}_speed_var`);
                        // console.log(opt);
                        if (opt === "Custom") {
                            customField.style.display = "inline-block";
                        } else {
                            customField.style.display = "none";
                        }
                        if (gradientlist.includes(opt)) {
                            speedField.style.display = "inline-block";
                        } else {
                            speedField.style.display = "none";
                        }
                    };
                    function addCustom(name) {
                        let selectField = iframeDoc.querySelector(`#rankscfg_field_${name}`);
                        updateFields(selectField,name);
                        selectField.addEventListener("change", (e) => updateFields(selectField,name));
                    }
                    for (let x of classlist) {
                        addCustom(x);
                    }
                    // addDesc("rainbow",`miliseconds per frame for rainbow animation`);
                    // addDesc("gold",`miliseconds per frame for gold animation`);
                },
                'save': function() {
                    /* function updateConfig(configName) {
                        const val = gmc.get(configName);
                        GM_setValue(configName,val)
                    }
                    updateConfig('msPerFrameLGM');updateConfig('msPerFrame4000'); */
                    let newconfigs = configs;
                    function updateConfig(configName) {
                        let obj = {};
                        let option = gmc.get(configName);
                        let type = option;
                        // console.log(type);
                        if (type === "No Change")type = "none";
                        else if (type.substring(0,7) === "Default")type = "default";
                        else if (type === "Custom")type = "static";
                        else if (gradientlist.includes(type))type = "animation";
                        else if (type === "Hide")type = "hide";
                        obj.type = type;
                        // console.log(obj.type);
                        if (obj.type === "static") {
                            let color = gmc.get(`${configName}_custom`).toLowerCase();
                            // console.log(color);
                            obj.color = color;
                        } else if (obj.type === "animation") {
                            let animation = option.toLowerCase();
                            obj.animation = animation;
                            let speed = gmc.get(`${configName}_speed`);
                            obj.speed = speed;
                        }
                        newconfigs[configName] = obj;
                    }
                    for (let x of classlist) {
                        updateConfig(x);
                    }
                    // console.log(newconfigs);
                    GM_setValue("configs",newconfigs);
                    /* for (let x in animconfigs) {
                        animconfigs[x].msperframe = gmc.get(x);
                    }
                    GM_setValue("animconfigs",animconfigs); */
                    location.reload();
                },
                'reset': function() {
                    let iframe = document.querySelector("#rankscfg");
                    if (!iframe) {
                        console.log("couldnt find iframe");
                        return;
                    }
                    let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    function updateFields(elm, selector) {
                        let opt = elm.value;
                        let customField = iframeDoc.querySelector(`#rankscfg_${selector}_custom_var`);
                        let speedField = iframeDoc.querySelector(`#rankscfg_${selector}_speed_var`);
                        // console.log(opt);
                        if (opt === "Custom") {
                            customField.style.display = "inline-block";
                        } else {
                            customField.style.display = "none";
                        }
                        if (gradientlist.includes(opt)) {
                            speedField.style.display = "inline-block";
                        } else {
                            speedField.style.display = "none";
                        }
                    };
                    function fixCustom(name) {
                        let selectField = iframeDoc.querySelector(`#rankscfg_field_${name}`);
                        updateFields(selectField,name);
                    }
                    for (let x of classlist) {
                        fixCustom(x);
                    }
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

    let isDark = -1;

    /*function updateCSS() {
        var cssname = (theme ? "rankcolorsdark" : "rankcolorslight");
        var rankColorsCSS = GM_getResourceText(cssname);
        GM_addStyle(rankColorsCSS);
    }

    updateCSS();*/

    function overrideStyleAttribute(elm, prop, value) {
        // elm.setAttribute("style", elm.getAttribute("style") + `; ${prop}: ${value} !important; `);
        let style = elm.getAttribute("style") || "";

        let styleObj = style.split(';').reduce((acc, styleProp) => {
            let [key,val] = styleProp.split(':').map(item => item.trim());
            if (key) {
                acc[key] = val;
            }
            return acc;
        }, {});

        styleObj[prop] = `${value} !important`;
        if (value === "")delete styleObj[prop];

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
        if (elm.classList.contains('user-yellow') || elm.classList.contains('user-trueorange'))return;
        if (isMasterRank(elm)) {
            elm.classList.add('user-yellow');
        } else {
            elm.classList.add('user-trueorange');
        }
    }

    function changeRed(elm) {
        if (elm.classList.contains('user-pink') || elm.classList.contains('user-truered'))return;
        if (isIGMRank(elm)) {
            elm.classList.add('user-pink');
        } else {
            elm.classList.add('user-truered');
        }
    }

    function applyChanges() {
        // console.log(theme);
        let defaultTheme = (theme ? defaultDark : defaultLight );
        let gradients = (theme ? gradientsDark : gradientsLight );
        let s = "body .topic .content center";
        for (let x in configs) {
            let cfg = configs[x];
            if (cfg.type === "default") {
                cfg = defaultTheme[x];
            }
            // console.log(cfg);
            // console.log(cfg.type);
            // console.log("hello");
            // console.log(x);
            if (cfg.type === "animation") {
                // console.log("found animation");
                // console.log(x);
                // console.log(cfg.animation);
                let gd = gradients[cfg.animation];
                gd["-webkit-background-clip"] = "text";
                gd["-webkit-text-fill-color"] = "transparent";
                gd["-moz-background-clip"] = "text";
                gd["-moz-text-fill-color"] = "transparent";
                let newStyle = Object.entries(gd).map(([key, val]) => `${key}: ${val} !important`).join('; ');
                let wrapper = `body tr.${x} td, body span.${x}, body a.${x}, body .topic .content center a.${x} { ${newStyle} }`;
                GM_addStyle(wrapper);
            } else if (cfg.type === "static") {
                // console.log("found static");
                if (x === "legendary-user-first-letter") {
                    let z = "user-legendary";
                    let y = "::first-letter";
                    let wrapper = `body tr.${z} td${y}, body span.${z}${y}, body a.${z}${y}, body .topic .content center a.${z}${y} { color: ${cfg.color} !important; }`;
                    GM_addStyle(wrapper);
                }
                let wrapper = `body tr.${x} td, body span.${x}, body a.${x}, body .topic .content center a.${x} { color: ${cfg.color} !important }`;
                // console.log(wrapper);
                GM_addStyle(wrapper);
            } else if (cfg.type === "hide") {
                // console.log("found hidden");
                if (x === "legendary-user-first-letter") {
                    let z = "user-legendary";
                    let y = "::first-letter";
                    let wrapper = `body tr.${z} td${y}, body span.${z}${y}, body a.${z}${y}, body .topic .content center a.${z}${y} { color: inherit !important; }`;
                    GM_addStyle(wrapper);
                }
                let wrapper = `body tr.${x} td, body span.${x}, body a.${x}, body .topic .content center a.${x} { color: inherit !important }`;
                // console.log(wrapper);
                GM_addStyle(wrapper);
            }
        }
    }

    applyChanges();

    function animateGradient(elm, speed) {
        let position = 0;
        let id = null;

        function frame() {
            position += 1;
            if (position > 100) position = 0;
            overrideStyleAttribute(elm,"background-position",`${position}% 50%`);
        }

        clearInterval(id);
        id = setInterval(frame, speed);
    }

    let animateconfigs = {};

    function animconfiginit() {
        animateconfigs = {};
        let defaultTheme = (theme ? defaultDark : defaultLight );
        let gradients = (theme ? gradientsDark : gradientsLight );
        for (let x in configs) {
            let cfg = configs[x];
            if (cfg.type === "default") {
                cfg = defaultTheme[x];
            }
            if (cfg.type === "animation") {
                animateconfigs[x] = cfg;
            }
        }
    }

    animconfiginit();

    function animate(node) {
        for (let x in animateconfigs) {
            let cfg = animateconfigs[x];
            node.querySelectorAll(`.${x}`).forEach(elm => {
                animateGradient(elm, (cfg.speed === -1 ? defaultSpeeds[cfg.animation] : cfg.speed));
            });
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
                animate(node);
            }
        });
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
        let isDark = isDarkMode();
        if (theme != isDark) {
           GM_setValue('theme',isDark);
           theme = isDark;
           //updateCSS();
           applyChanges();
           animconfiginit();
        }
        document.querySelectorAll('.user-orange').forEach(function (elm) {
            changeOrange(elm);
            // setTimeout(() => applyClassChanges(elm), 0);
        });
        document.querySelectorAll('.user-red').forEach(function (elm) {
            changeRed(elm);
            // setTimeout(() => applyClassChanges(elm), 0);
        });

        observer.observe(document.body, { attributes: true, childList: true, subtree: true });

        // applyChanges();
        animate(document);
        // gmc.open();
    });

    /*
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
    }*/
})();