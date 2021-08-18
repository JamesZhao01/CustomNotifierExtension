// document.addEventListener("DOMContentLoaded", function () {
//     let encountered = [];
//     chrome.storage.local.get("storage", function (result) {
//         console.log("Value currently is ", result);
//         // document.querySelector("#text").innerHTML == "";
//     });

//     chrome.runtime.onMessageExternal.addListener(function (
//         request,
//         sender,
//         sendResponse
//     ) {
//         if (request.for == "popup") {
//         }
//     });
//     let text = chrome.storage.local.get(["prev"], (res) => {
//         console.log(res);
//         console.log(document);
//         document.querySelector("#text").innerHTML = res;
//     });
// });

// function addItems() {
//     document.getElementById("add").innerText = "BABWEIWBOIN";
// }
