console.log('content script loaded.');
chrome.runtime.sendMessage({ type: 'page-information', content: document.title });
console.log('sen done')

