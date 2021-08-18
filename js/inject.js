const inject = () => {
    const id = "mibooopklgkhienecogbaipedlggablc";

    function bufToString(buf) {
        return String.fromCharCode.apply(String, new Uint8Array(buf));
    }

    function filter(items) {
        items = items.filter((x) => x.reward.flags[0] == "rare");
        items.forEach((x) => console.log(`Prize: "${x.reward.name}"`));
        chrome.runtime.sendMessage(id, items, function (response) {});
    }

    function route(res) {
        switch (res.requestClass) {
            case "FortuneWheelService":
                console.log("[FortuneWheelService]");
                switch (res.requestMethod) {
                    case "getFortuneWheel":
                        filter(res.responseData.items);
                        break;
                    case "refresh":
                        // console.log("\trefresh", res.responseData);
                        break;
                    case "getItems":
                        filter(res.responseData);
                        break;
                }

                break;
        }
        // console.log(res.requestClass, res.requestMethod);
    }
    function handler(e, req, map) {
        const res = JSON.parse(e.currentTarget.responseText);
        res.forEach((x) => route(x));
    }
    const XHR = XMLHttpRequest.prototype;
    const open = XHR.open;
    const send = XHR.send;
    const regex = /.*forgeofempires.com.*json.*/;
    const map = new Map();
    XHR.send = function (postData) {
        if (map.has(this)) {
            map.set(this, {
                postData: JSON.parse(bufToString(postData)),
            });
            this.addEventListener(
                "load",
                function (e) {
                    handler.apply(this, [e, map.get(this).postData, map]);
                }.bind(this),
                {
                    capture: false,
                    passive: true,
                }
            );
        }

        return send.apply(this, arguments);
    };

    XHR.open = function (method, url) {
        if (url.match(regex)) {
            map.set(this, {});
        }
        return open.apply(this, arguments);
    };
};
var code =
    "\
(function(global) {\
    const inject = " +
    inject.toString() +
    ";\
    inject()\
})(window);\
";
var script = document.createElement("script");
script.appendChild(document.createTextNode(code));
(document.head || document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
