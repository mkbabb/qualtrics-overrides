interface WindowMessage {
    message: string;
    key: string;
    data: { [arg: string]: string };
}

// @ts-expect-error
const qs: Qualtrics.SurveyEngine = Qualtrics.SurveyEngine;
const iframeId = "speedtest-frame";
const speedtestURL = "https://speedtest.fi.ncsu.edu/testing/sites/index.html";

const WINDOW_KEY = "password";

const receiveMessage = function (event: MessageEvent) {
    const windowMessage: WindowMessage = event.data;
    console.log(windowMessage);

    if (windowMessage != null && windowMessage.key === WINDOW_KEY) {
        if (windowMessage.message === "complete") {
            const {
                dlStatus,
                ulStatus,
                pingStatus,
                jitterStatus,
                ip
            } = windowMessage.data;

            qs.setEmbeddedData("dl_speed", dlStatus);
            qs.setEmbeddedData("ul_speed", ulStatus);
            qs.setEmbeddedData("ping", pingStatus);
            qs.setEmbeddedData("jitter", jitterStatus);
            qs.setEmbeddedData("ip_address", ip);

            this.showNextButton();
        } else if (windowMessage.message === "next") {
            this.clickNextButton();
        }
    }
};

qs.addOnload(function () {
    window.addEventListener("message", receiveMessage.bind(this));
    this.hideNextButton();

    const windowMessage: WindowMessage = {
        message: "start",
        key: "password",
        data: {}
    };

    const duration = 1000;

    const start = function () {
        document.getElementById(iframeId).addEventListener("load", function (event) {
            const iframe = <HTMLIFrameElement>event.target;
            const post = () => {
                iframe.contentWindow.postMessage(windowMessage, speedtestURL);
            };
            setTimeout(post, duration);
        });
    };

    start();
});

qs.addOnReady(function () {});

qs.addOnUnload(function () {});

export {};
