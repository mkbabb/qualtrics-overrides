// @ts-expect-error
const qs: Qualtrics.SurveyEngine = Qualtrics.SurveyEngine;

const getIpURL = "https://speedtest.fi.ncsu.edu/general_bb/backend/getIP.php?cors=1";

const writeIpInfo = function (this: Qualtrics.SurveyEngine) {
    const req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) {
            const data = JSON.parse(req.responseText);
            const { processedString: ip_address } = data;

            console.log(`Found IP address of ${ip_address}`);

            qs.setEmbeddedData("ip_address", ip_address);
            this.showNextButton();
        }
    };

    req.open("GET", getIpURL, true);
    req.send();
};

qs.addOnload(function () {
    this.hideNextButton();
    writeIpInfo.bind(this)();
});

qs.addOnReady(function () {});

qs.addOnUnload(function () {});

export {};
