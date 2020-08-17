// @ts-expect-error
const qs: Qualtrics.SurveyEngine = Qualtrics.SurveyEngine;

const backendURL = "https://speedtest.fi.ncsu.edu/testing/scripts/librespeed/backend/";
const getIp = "getIP.php?cors=1?id=${e://Field/ResponseID}";

const getIpURL = backendURL + getIp;

const writeIpInfo = function () {
    const req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) {
            const data = JSON.parse(req.responseText);
            const { processedString: ip_address } = data;

            console.log(`Found IP address of ${ip_address}`);

            qs.setEmbeddedData("ip_address", ip_address);
        }
    };

    req.open("GET", getIpURL, true);
    req.send();
};

qs.addOnload(function () {
    writeIpInfo();
});

qs.addOnReady(function () {});

qs.addOnUnload(function () {});

export {};
