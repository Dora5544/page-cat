import React, { useEffect, useState } from 'react';
import { Chat } from './Chat';
import { Login } from './Login';
import './Panel.css';
import { decodeJwt } from 'jose';




const Panel: React.FC = () => {

  const [pageTitle, setPageTitle] = useState('...');
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>();

  const checkTokenExpiration = (token: string | null) => {

    const res = token ? decodeJwt(token) : null;

    //check if authenticaion token has expired when authentication is not null
    if (res?.exp) {
      const expirationTimestamp = res.exp * 1000;
      // get current timestamp
      const currentTimestamp = new Date().getTime();

      // check if token is expired, hasTokenExpired will be true if token is expired
      const hasTokenExpired = currentTimestamp > expirationTimestamp;

      setIsTokenExpired(hasTokenExpired);

      console.log('hasTokenExpired', hasTokenExpired)
      console.log('isTokenExpired', isTokenExpired)
    }else{
      //set the isTokenExpired to true when authentication is null
      setIsTokenExpired(true);
    }
  };


  useEffect(() => {

    console.log("in useEffect")

    const authenticationToken = localStorage.getItem("accessToken");
    console.log("authenticationToken", authenticationToken);
    checkTokenExpiration(authenticationToken);
    

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

  }, []); // 注意: 空数组表示只在组件挂载和卸载时执行


  return (
    <div>
      <div style={{ height: '80vh', overflowY: 'auto' }}>
        {/* <h1>You are visiting {pageTitle}</h1> */}
        {isTokenExpired?<Login></Login>:<Chat></Chat>}
      </div>
    </div>
  );
};

export default Panel;
