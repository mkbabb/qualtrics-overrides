// Prevents the window message from being posted multiple times.
var set = false;
// The speedtest iframe name. This must match the Qualtrics HTML!
var iframeID = "speedtest-frame";

Qualtrics.SurveyEngine.addOnload(function () {
    window.scrollTo(0, 0);
    this.disableNextButton();
    window.addEventListener("message", receiveMessage.bind(this));
});

Qualtrics.SurveyEngine.addOnReady(function () {});

Qualtrics.SurveyEngine.addOnUnload(function () {});

document.getElementById(iframeID).addEventListener("load", function () {
    // Initialize the call to the speed test app; the below calls the dev version thereof.
    this.contentWindow.postMessage(
        "start",
        "https://speedtest.fi.ncsu.edu/general_bb/"
    );
});

function receiveMessage(event) {
    // If we've yet to set any embedded data, continue onward.
    if (event.data !== null) {
        // Coalesce our speed test data object into a dictionary.
        const speedtestData = JSON.parse(event.data);
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
        this.enableNextButton();
        // this.clickNextButton();
    }
}
