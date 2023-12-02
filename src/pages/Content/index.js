console.log('content script loaded.');


// 监听来自 Side Panel 的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("receive message")
    if (message.type === 'messageFromSidePanel') {
      console.log('Received message in Content Script:', message.data);
      // 处理消息，可以执行需要的操作
      chrome.runtime.sendMessage({ type: 'page-information', content: document.title });
    }
  });
  


console.log('sen done')



