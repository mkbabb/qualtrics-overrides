var that = null;

Qualtrics.SurveyEngine.addOnload(function() {
    that = this;
});

Qualtrics.SurveyEngine.addOnReady(function() {});

Qualtrics.SurveyEngine.addOnUnload(function() {});

document.getElementById("speedtest-frame").addEventListener("load", function() {
    var w = this.contentWindow;
    w.postMessage("start", "https://mbabb.fi.ncsu.edu/speedtest/");
});

function receiveMessage(event) {
    if (that !== null && event.data !== null) {
        let speedtestData = JSON.parse(event.data);

        console.log(
            `Payload of speedtest data received. Download speed: ${speedtestData.dlStatus}`
        );

        that.setEmbeddedData("dl_speed", speedtestData["dlStatus"]);
        that.setEmbeddedData("ul_speed", speedtestData["ulStatus"]);
        that.setEmbeddedData("ping", speedtestData["pingStatus"]);
        that.setEmbeddedData("jitter", speedtestData["jitterStatus"]);
        that.clickNextButton();
    }
}
window.addEventListener("message", receiveMessage, false);
