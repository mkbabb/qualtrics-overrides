Qualtrics.SurveyEngine.addOnload(function() {
    /*Place your JavaScript here to run when the page loads*/
});

Qualtrics.SurveyEngine.addOnReady(function() {
    /*Place your JavaScript here to run when the page is fully displayed*/
});

Qualtrics.SurveyEngine.addOnUnload(function() {
    /*Place your JavaScript here to run when the page is unloaded*/
});

req = new XMLHttpRequest();
let backendURL = "https://speedtest.fi.ncsu.edu/general_bb/";

req.onload = function() {
    let data = JSON.parse(req.responseText);
    Qualtrics.SurveyEngine.setEmbeddedData("ip_address", data.processedString);
};

req.open("GET", backendURL + "backend/getIP.php?cors=1", true);
req.send();