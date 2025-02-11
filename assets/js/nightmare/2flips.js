"use strict";

$.ajaxSettings.async = false;
const jsonNameList = ["edgeChichuToNumber", "nightmareTwoFlipsAlgToInfo"];
const jsonNameListPre = {"edgeChichuToNumber":"edgeChichuToNumber", "nightmareTwoFlipsAlgToInfo":"nightmare/nightmareTwoFlipsAlgToInfo"};
const jsonLoaded = jsonNameList.map((name) => $.getJSON(`../assets/json/${jsonNameListPre[name]}.json`, (json) => {
    window[`${name}`] = json;
}));
algSearch();

function algSearch() {
    let tab = `<table id="table"><thead><tr><th>${arrLang[lang]["nightmareLetters"]}</th><th>${arrLang[lang]["algorithm"]}</th><th>${arrLang[lang]["commutator"]}</th><th>${arrLang[lang]["thumbPosition"]}</th></tr></thead><tbody>`;
    const edgeinput = [];
    let codecookie = "DEGCGAAJWIXKOOMREDCXTQLMKHIRZZPSBBLSQNJYHFFYWTNP";
    if (getCookie("code") !== "") {
        codecookie = getCookie("code");
    }
    for (const algi in nightmareTwoFlipsAlgToInfo) {
        for (let i = 0; i <= 1; i++) {
            if (algi[i] === "") {
                edgeinput[i] = "";
            } else if (codecookie[edgeChichuToNumber[algi[i]]] === "") {
                edgeinput[i] = algi[i];
            } else {
                edgeinput[i] = codecookie[edgeChichuToNumber[algi[i]]];
            }
        }
        tab += "<tr>";
        tab += `<td>${`${edgeinput[0]}${edgeinput[1]}`}</td>`;
        tab += `<td>${nightmareTwoFlipsAlgToInfo[algi].algorithm}</td>`;
        tab += `<td>${nightmareTwoFlipsAlgToInfo[algi].commutator}</td>`;
        tab += `<td>${fingerbeginfrom(nightmareTwoFlipsAlgToInfo[algi].algorithm)}</td>`;
        tab += "</tr>";
    }
    tab += "</tbody></table>";
    div1.innerHTML = tab;
    const r = $("#table").width() / $("#div1").width();
    if (r > 1) {
        $("#table").css("font-size", 16 / r);
    }
}