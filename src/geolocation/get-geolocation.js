// @ts-expect-error
var qs = Qualtrics.SurveyEngine;
var geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
var getCurrentPosition = function () {
    return new Promise(function (resolve, reject) {
        return navigator.geolocation.getCurrentPosition(resolve, reject, geolocationOptions);
    });
};
var writePosition = function (pos) {
    var coords = pos.coords;
    qs.setEmbeddedData("lat", String(coords.latitude));
    qs.setEmbeddedData("long", String(coords.longitude));
    qs.setEmbeddedData("geo_accuracy", String(coords.accuracy));
    console.log("Your current position is:");
    console.log("Latitude : " + coords.latitude);
    console.log("Longitude: " + coords.longitude);
};
qs.addOnload(function () {
    var _this = this;
    this.hideNextButton();
    getCurrentPosition()
        .then(writePosition)
        .catch(function (err) {
        qs.setEmbeddedData("geo_error_code", err.code);
        console.warn("ERROR(" + err.code + "): " + err.message);
    })
        .finally(function () {
        _this.clickNextButton();
    });
});
qs.addOnReady(function () { });
qs.addOnUnload(function () { });
