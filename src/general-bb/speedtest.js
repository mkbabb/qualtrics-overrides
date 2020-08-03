// @ts-expect-error
var qs = Qualtrics.SurveyEngine;
var iframeId = "speedtest-frame";
var speedtestURL = "https://speedtest.fi.ncsu.edu/testing/sites/index.html";
var WINDOW_KEY = "password";
var receiveMessage = function (event) {
    var windowMessage = event.data;
    console.log(windowMessage);
    if (windowMessage != null && windowMessage.key === WINDOW_KEY) {
        if (windowMessage.message === "complete") {
            var _a = windowMessage.data, dlStatus = _a.dlStatus, ulStatus = _a.ulStatus, pingStatus = _a.pingStatus, jitterStatus = _a.jitterStatus, ip = _a.ip;
            qs.setEmbeddedData("dl_speed", dlStatus);
            qs.setEmbeddedData("ul_speed", ulStatus);
            qs.setEmbeddedData("ping", pingStatus);
            qs.setEmbeddedData("jitter", jitterStatus);
            qs.setEmbeddedData("ip_address", ip);
            this.showNextButton();
        }
        else if (windowMessage.message === "next") {
            this.clickNextButton();
        }
    }
};
qs.addOnload(function () {
    window.addEventListener("message", receiveMessage.bind(this));
    this.hideNextButton();
    var windowMessage = {
        message: "start",
        key: "password",
        data: {}
    };
    var duration = 1000;
    var start = function () {
        var iframe = document.getElementById(iframeId);
        iframe.addEventListener("load", function (event) {
            var _this = this;
            var post = function () {
                _this.contentWindow.postMessage(windowMessage, speedtestURL);
            };
            setTimeout(post, duration);
        });
    };
    start();
});
qs.addOnReady(function () { });
qs.addOnUnload(function () { });
