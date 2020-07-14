const qs = Qualtrics.SurveyEngine;
// Prevents the window message from being posted multiple times.
let set = false;
// The speedtest iframe name. This must match the Qualtrics HTML!
const iframeId = "speedtest-frame";

document.getElementById(iframeId).addEventListener("load", function () {
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
         * one must used the 'qs' object.
         */
        qs.setEmbeddedData("dl_speed", speedtestData["dlStatus"]);
        qs.setEmbeddedData("ul_speed", speedtestData["ulStatus"]);
        qs.setEmbeddedData("ping", speedtestData["pingStatus"]);
        qs.setEmbeddedData("jitter", speedtestData["jitterStatus"]);
        qs.setEmbeddedData("ip_address", speedtestData["ip"]);
        // For the auto progression; simulates a click of the next button based on the 'that' context.
        this.showNextButton();
        // this.clickNextButton();
    }
}

qs.addOnload(function () {
    window.scrollTo(0, 0);
    this.hideNextButton();
    window.addEventListener("message", receiveMessage.bind(this));
});

qs.addOnReady(function () {});

qs.addOnUnload(function () {});
