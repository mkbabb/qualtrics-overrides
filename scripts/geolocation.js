const qs = Qualtrics.SurveyEngine;

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const getCurrentPosition = function () {
    return new Promise((resolve, reject) => {
        return navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            geolocationOptions
        );
    });
};

const writePosition = function (pos) {
    const coords = pos.coords;

    qs.setEmbeddedData("lat", coords.latitude);
    qs.setEmbeddedData("long", coords.longitude);
    qs.setEmbeddedData("geo_accuracy", coords.accuracy);

    console.log("Your current position is:");
    console.log(`Latitude : ${coords.latitude}`);
    console.log(`Longitude: ${coords.longitude}`);
};

qs.addOnload(function () {
    this.hideNextButton();

    getCurrentPosition()
        .then(writePosition)
        .catch((err) => {
            qs.setEmbeddedData("geo_error_code", err.code);
            console.warn(`ERROR(${err.code}): ${err.message}`);
        })
        .finally(() => {
            this.clickNextButton();
        });
});

qs.addOnReady(function () {});

qs.addOnUnload(function () {});
