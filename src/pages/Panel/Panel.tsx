import React, { useState, useEffect } from 'react';
import './Panel.css';
import { Chat } from "./Chat"

const Panel: React.FC = () => {

  const [pageTitle, setPageTitle] = useState('...');

  console.log("before useEffect")

  useEffect(() => {

    console.log("in useEffect")

    // 监听页面title information
    // chrome.runtime.onMessage.addListener(function (message) {
    //   if (message.type === 'page-information') {
    //     // 更新页面标题
    //     console.log("i am on side panel checking title message", message.data)
    //     setPageTitle(message.data);
    //   }
    // });

    //页面切换时触发
    chrome.tabs.onActivated.addListener(function (activeInfo) {
      console.log("tab is actived", activeInfo.tabId)
      // chrome.tabs.sendMessage(activeInfo.tabId, { action: 'pageIsActive' });
      getCurrentActiveTabInfo();
    });

    //页面加载完成时触发
    chrome.webNavigation.onCompleted.addListener(function (details) {
      if (details.frameId === 0) {
        console.log("page is loaded", details, details.tabId)
        // chrome.tabs.sendMessage(details.tabId, { action: 'pageIsActive' });
        getCurrentActiveTabInfo();
      }
    });

    function getCurrentActiveTabInfo() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        console.log("activeTab", activeTab)

        // 检查标签页是否为真实网页
        if (activeTab && activeTab.url) {
          console.log('Current active tab URL:', activeTab.url);

          // 处理真实网页的逻辑
          if (activeTab.url.startsWith('http') || activeTab.url.startsWith('https')) {
            console.log('This is a real webpage.');
            if (activeTab.title) {
              setPageTitle(activeTab.title);
            }
          } else {
            console.log('This is not a real webpage (e.g., a new tab page).');
          }
        } else {
          console.log('No active tab or URL found.');
        }
      });
    }

    getCurrentActiveTabInfo()

    console.log("panel send")

  }, []); // 注意: 空数组表示只在组件挂载和卸载时执行


  return (
    <div>
      <div style={{ height: '80vh', overflowY: 'auto' }}>
        <h1>You are visiting {pageTitle}</h1>
        <Chat></Chat>
      </div>
    </div>
  );
};

export default Panel;
