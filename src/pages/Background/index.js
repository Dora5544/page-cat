console.log(new Date(), 'This is the background page.');
console.log(new Date(), 'Put the background scripts here.');

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.log(error))

// chrome.webRequest.onBeforeSendHeaders.addListener(
//     function(details) {
//       for (const header of details.requestHeaders) {
//         if (header.name.toLowerCase() === 'user-agent') {
//             console.log("user-agent information")
//           header.value = 'xxx';
//           break;
//         }
//       }
//       return { requestHeaders: details.requestHeaders };
//     },
//     { urls: ['https://chat-dog.azurewebsites.net/chat'] },
//     ['blocking', 'requestHeaders']
//   );




