// @ts-expect-error
var qs = Qualtrics.SurveyEngine;
var getIpURL = "https://speedtest.fi.ncsu.edu/general_bb/backend/getIP.php?cors=1";
var writeIpInfo = function () {
    var _this = this;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var data = JSON.parse(req.responseText);
            var ip_address = data.processedString;
            console.log("Found IP address of " + ip_address);
            qs.setEmbeddedData("ip_address", ip_address);
            _this.showNextButton();
        }
    };
    req.open("GET", getIpURL, true);
    req.send();
};
qs.addOnload(function () {
    this.hideNextButton();
    writeIpInfo.bind(this)();
});
qs.addOnReady(function () { });
qs.addOnUnload(function () { });
