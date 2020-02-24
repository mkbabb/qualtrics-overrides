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
    if (event.data === "done" && that !== null) {
        that.clickNextButton();
    }
}
window.addEventListener("message", receiveMessage, false);
