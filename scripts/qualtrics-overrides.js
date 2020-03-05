var that = null;
var set = false;

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
    if (that !== null && event.data !== null && !set) {
        let speedtestData = JSON.parse(event.data);
        set = true;

        console.log(speedtestData.dlStatus);

        Qualtrics.SurveyEngine.setEmbeddedData(
            "dl_speed",
            speedtestData["dlStatus"]
        );
        Qualtrics.SurveyEngine.setEmbeddedData(
            "ul_speed",
            speedtestData["ulStatus"]
        );
        Qualtrics.SurveyEngine.setEmbeddedData(
            "ping",
            speedtestData["pingStatus"]
        );
        Qualtrics.SurveyEngine.setEmbeddedData(
            "jitter",
            speedtestData["jitterStatus"]
        );
        that.clickNextButton();
    }
}
window.addEventListener("message", receiveMessage, false);