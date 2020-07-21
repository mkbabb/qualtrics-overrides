"use strict";
// @ts-expect-error
const qs = Qualtrics.SurveyEngine;
const backendBaseURL = "https://speedtest.fi.ncsu.edu/general_bb/";
const getIpURL = "backend/getIP.php?cors=1";
const writeIpInfo = function () {
    const req = new XMLHttpRequest();
    req.onload = function () {
        const data = JSON.parse(req.responseText);
        qs.setEmbeddedData("ip_address", data.processedString);
    };
    req.open("GET", backendBaseURL + getIpURL, true);
    req.send();
};
qs.addOnload(function () {
    writeIpInfo();
});
qs.addOnReady(function () { });
qs.addOnUnload(function () { });
