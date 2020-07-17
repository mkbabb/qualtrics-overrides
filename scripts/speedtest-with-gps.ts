//@ts-ignore
const qs = Qualtrics.SurveyEngine;
const iframeId = "speedtest-frame";
// const speedtestURL = "https://speedtest.fi.ncsu.edu/general_bb/";
const speedtestURL = "https://mbabb.fi.ncsu.edu/speedtest/sites/index.html";

interface IWindowMessage {
    message: string;
    key: string;
    data: { [arg: string]: string };
}

const WINDOW_KEY = "password";

const receiveMessage = function (event: MessageEvent) {
    const windowMessage: IWindowMessage = event.data;
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
    window.scrollTo(0, 0);
    window.addEventListener("message", receiveMessage.bind(this));

    this.hideNextButton();

    const windowMessage: IWindowMessage = {
        message: "start",
        key: "password",
        data: {}
    };

    const start = function () {
        document.getElementById(iframeId).addEventListener("load", function (event) {
            const iframe = <HTMLIFrameElement>event.target;
            console.log(iframe.id);
            iframe.contentWindow.postMessage(windowMessage, speedtestURL);
        });
    };

    setTimeout(start, 10);
});

qs.addOnReady(function () {});

qs.addOnUnload(function () {});
