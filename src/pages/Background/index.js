console.log('This is the background page.');
console.log('Put the background scripts here.');


// // const onActiveTabChanged = (activeInfo) => {
// //     console.log(new Date(), activeInfo)
// // }

// // chrome.tabs.onActivated.addListener((activeInfo) => {
// //     console.log(new Date(), activeInfo)
// // })


// // chrome.tabs.onUpdated.addListener((activeInfo) => {
// //     console.log(new Date(), activeInfo)
// // })
// chrome.webNavigation.onCompleted.addListener(function (details) {
//     // if (details.frameId === 0) { // Ensure that it's the main frame
//     //     console.log('Page refreshed or loaded:', details.url);
//     // }
//     console.log(details);

//     chrome.tabs.get(details.tabId, function (tab) {
//         // 在回调函数中可以访问 tab 对象
//         // if (chrome.runtime.lastError || !tab) {
//         //     console.error("无法获取标签页信息:", chrome.runtime.lastError);
//         //     return;
//         // }
//         console.log('here', details.tabId, tab)

//         // 访问标签页的 document 对象
//         var tabDocument = tab && tab.id ? chrome.tabs.connect(tab.id) : null;

//         if (tabDocument) {
//             // 在这里使用 tabDocument，例如执行内容脚本
//             // tabDocument.postMessage({ action: 'some_action', data: 'some_data' });
//             console.log('here', details.tabId, tabDocument)
//         }
//     });
// });
