"use strict";

$.ajaxSettings.async = false;
const jsonNameList = ["bigbldMidgeAlgToInfoManmade", "bigbldSourceToUrl", "edgeCodeToPos", "edgePosToCode", "edgeAlgToStandard"];
const jsonNameListPre = {"bigbldMidgeAlgToInfoManmade":"bigbld/bigbldMidgeAlgToInfoManmade", "bigbldSourceToUrl":"bigbld/bigbldSourceToUrl", "edgeCodeToPos":"edgeCodeToPos", "edgePosToCode":"edgePosToCode", "edgeAlgToStandard":"edgeAlgToStandard"};
const jsonLoaded = jsonNameList.map((name) => $.getJSON(`../assets/json/${jsonNameListPre[name]}.json`, (json) => {
    window[`${name}`] = json;
}));

// if (getCookie("cornerstyle") === "") {
//     setCookie("cornerstyle", "nightmare", 30);
// } else {
//     document.getElementById("cornerstyle").value = getCookie("cornerstyle");
// }

function switchStyle() {
    setCookie("cornerstyle", document.getElementById("cornerstyle").value, 30);
    algSearch();
}

function algSearch() {
    let idValueOrigin = document.getElementById("cornerinput").value;
    if (typeof idValueOrigin === "undefined") {
        return;
    }
    idValueOrigin = idValueOrigin.toUpperCase();
    const id = [idValueOrigin[0], idValueOrigin[1], idValueOrigin[2]];
    document.getElementById("cornerinput1").value = edgeCodeToPos[id[0]];
    document.getElementById("cornerinput2").value = edgeCodeToPos[id[1]];
    document.getElementById("cornerinput3").value = edgeCodeToPos[id[2]];
    const idValue = edgeAlgToStandard[`${id[0]}${id[1]}${id[2]}`];
    algSearchMain(idValue, "manmade");
}

function algSearchByPos() {
    const id = [];
    id[0] = edgePosToCode[document.getElementById("cornerinput1").value];
    id[1] = edgePosToCode[document.getElementById("cornerinput2").value];
    id[2] = edgePosToCode[document.getElementById("cornerinput3").value];
    const idValue = edgeAlgToStandard[`${id[0]}${id[1]}${id[2]}`];
    const cornerinput = [];
    if (typeof id[0] === "undefined") {
        id[0] = "";
    }
    if (typeof id[1] === "undefined") {
        id[1] = "";
    }
    if (typeof id[2] === "undefined") {
        id[2] = "";
    }
    for (let i = 0; i <= 2; i++) {
        if (id[i] === "") {
            cornerinput[i] = "";
        } else {
            cornerinput[i] = id[i];
        }
    }
    document.getElementById("cornerinput").value = `${cornerinput[0]}${cornerinput[1]}${cornerinput[2]}`;
    algSearchMain(idValue, "manmade");
}

function algSearchMain(idValue, cornerstylecookie) {
    const div1 = document.getElementById("div1");
    if (bigbldMidgeAlgToInfoManmade.hasOwnProperty(idValue)) {
        let cornerAlgToInfoStyle = {};
        if (cornerstylecookie === "manmade") {
            cornerAlgToInfoStyle = bigbldMidgeAlgToInfoManmade;
        }
        document.getElementById("cornerinput").blur();
        const rows = cornerAlgToInfoStyle[idValue].length;
        let tab = "";
        if (cornerstylecookie === "manmade") {
            tab = `<table id="table"><thead><tr><th>${arrLang[lang]["no"]}</th><th>${arrLang[lang]["algorithm"]}</th><th>${arrLang[lang]["commutator"]}</th><th>${arrLang[lang]["source"]}</th></tr></thead><tbody>`;
        } else {
            tab = `<table id="table"><thead><tr><th>${arrLang[lang]["no"]}</th><th>${arrLang[lang]["algorithm"]}</th><th>${arrLang[lang]["commutator"]}</th></tr></thead><tbody>`;
        }
        for (let i = 0; i < rows; i++) {
            if (cornerstylecookie !== "manmade" && cornerAlgToInfoStyle[idValue][i] === cornerAlgToStyle[idValue]) {
                tab += "<tr bgcolor=\"#D0D0D0\">";
            } else {
                tab += "<tr>";
            }
            tab += `<td>${i + 1}</td>`;
            if (cornerstylecookie === "manmade") {
                tab += `<td>${cornerAlgToInfoStyle[idValue][i][0]}</td>`;
                tab += `<td>${cornerAlgToInfoStyle[idValue][i][2]}</td>`;
                let sourceElement = "";
                for (const source of cornerAlgToInfoStyle[idValue][i][1]) {
                    if (source in bigbldSourceToUrl) {
                        sourceElement = `${sourceElement}<a href="${bigbldSourceToUrl[source][bigbldSourceToUrl[source].length - 1]}" target="_blank">${source}</a>`;
                    } else {
                        sourceElement = `${sourceElement}${source}`;
                    }
                    if (source !== cornerAlgToInfoStyle[idValue][i][1][cornerAlgToInfoStyle[idValue][i][1].length - 1]) {
                        sourceElement += "<br>";
                    }
                }
                tab += `<td class="help">${cornerAlgToInfoStyle[idValue][i][1].length} <span class="help-content">${sourceElement}</span></td>`;
            } else {
                tab += `<td>${cornerAlgToInfoStyle[idValue][i]}</td>`;
                tab += `<td>${commutator(cornerAlgToInfoStyle[idValue][i])}</td>`;
                tab += `<td>${fingerbeginfrom(cornerAlgToInfoStyle[idValue][i])}</td>`;
            }
            tab += "</tr>";
        }
        tab += "</tbody></table>";
        div1.innerHTML = tab;
    } else {
        div1.innerHTML = "";
    }
    const r = $("#table").width() / $("#div1").width();
    if (r > 1) {
        $("#table").css("font-size", 16 / r);
    }
}

function fontAwesome() {
    $("select").find("option[key='cornerStyleNightmare']").html(`&#128128; ${$("select").find("option[key='cornerStyleNightmare']").html()}`);
    $("select").find("option[key='cornerStyleBalance']").html(`&#62030; ${$("select").find("option[key='cornerStyleBalance']").html()}`);
    $("select").find("option[key='cornerStyleYuanzi']").html(`&thinsp;&#xf5d2;&thinsp; ${$("select").find("option[key='cornerStyleYuanzi']").html()}`);
    $("select").find("option[key='cornerStyleManmade']").html(`&thinsp;&#xf2bd; ${$("select").find("option[key='cornerStyleManmade']").html()}`);
}