console.log("Background running");

function createNotification(text) {
    let date = new Date();
    let time = `${date.getHours() % 12}:${date.getMinutes()} ${
        date.getHours() >= 12 ? "PM" : "AM"
    }`;
    var notify = {
        type: "basic",
        title: "ForgeNotifier",
        message: `Daily special "${text}" at ${time}`,
        iconUrl: "rock.jpg",
    };
    chrome.notifications.create(notify, () => {});
}

// some options i've encountered
let someOptions = [
    "Shark Shallows",
    "150 Goods",
    "The Ship Selection Kit",
    "Fisherman's Pier",
    "Tactician's Tower - Lv. 1",
    "Sentinel Outpost - Lv. 1",
    "Captain's Anchorage",
    "Crow's Nest Selection Kit",
    "Store building",
];
let filter = ["150 Goods"];

chrome.runtime.onMessageExternal.addListener(function (
    request,
    sender,
    sendResponse
) {
    request.forEach((x) => {
        console.log(`Prize: "${x.reward.name}"`);
        if (filter.includes(x.reward.name)) {
            createNotification(x.reward.name);
        }
    });
});
