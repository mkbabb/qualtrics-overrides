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
    // Initialize the call to the speed test app; the below calls the dev version thereof.
    w.postMessage("start", "https://mbabb.fi.ncsu.edu/speedtest/");
});

function receiveMessage(event) {
    // If our Qualtrics context is defined, and we've yet to set any embedded data, continue onward.
    if (that !== null && event.data !== null && !set) {
        // Coalesce our speed test data object into a dictionary.
        let speedtestData = JSON.parse(event.data);
        set = true;

        // Sanity check, to be removed in the future.
        console.log(speedtestData.dlStatus);

        /**
         * The below sets the embedded data fields within the survey with the
         * syntax of (embedded_data_field_name, value).
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
        // For the auto progression; simulates a click of the next button based on the 'that' context.
        that.clickNextButton();
    }
}
window.addEventListener("message", receiveMessage, false);
