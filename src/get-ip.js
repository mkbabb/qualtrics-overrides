// @ts-expect-error
var qs = Qualtrics.SurveyEngine;
var backendURL = "https://speedtest.fi.ncsu.edu/testing/scripts/librespeed/backend";
var getIp = "getIP.php?cors=1";
var getIpURL = backendURL + getIp;
var writeIpInfo = function () {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var data = JSON.parse(req.responseText);
            var ip_address = data.processedString;
            console.log("Found IP address of " + ip_address);
            qs.setEmbeddedData("ip_address", ip_address);
        }
    };
    req.open("GET", getIpURL, true);
    req.send();
};
qs.addOnload(function () {
    writeIpInfo();
});
qs.addOnReady(function () { });
qs.addOnUnload(function () { });
