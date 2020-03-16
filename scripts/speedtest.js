// Saves the Qualtrics context for later.
var that = null;
// Prevents the window message from being posted multiple times.
var set = false;

Qualtrics.SurveyEngine.addOnload(function() {
    that = this;
});

Qualtrics.SurveyEngine.addOnReady(function() {});

Qualtrics.SurveyEngine.addOnUnload(function() {});

document.getElementById("speedtest-frame").addEventListener("load", function() {
    var w = this.contentWindow;
    // Initialize the call to the speed test app.
    w.postMessage("start", "https://mbabb.fi.ncsu.edu/speedtest/");
});

function receiveMessage(event) {
    if (that !== null && event.data !== null && !set) {
        let speedtestData = JSON.parse(event.data);
        set = true;

        console.log(speedtestData.dlStatus);

        /**
         * The below sets the embedded data fields within the survey with the
         * syntax of (embedded_data_filed_name, value).
         * Note that the Qualtrics survey context of 'that' cannot be used here:
         * one must used the 'Qualtrics.SurveyEngine' object.
         */
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
        Qualtrics.SurveyEngine.setEmbeddedData(
            "ip_address",
            speedtestData["ip"]
        );
        that.clickNextButton();
    }
}
window.addEventListener("message", receiveMessage, false);
