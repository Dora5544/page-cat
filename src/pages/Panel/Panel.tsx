import React, { useState, useEffect } from 'react';
import './Panel.css';
import { Chat } from "./Chat"
import { useActiveTabChange } from '../../hooks/browser-listener-hook'

const Panel: React.FC = () => {

  const page = useActiveTabChange();

  useEffect(() => {
    console.log('here', page)
  }, [page])

  const [pageTitle, setPageTitle] = useState('...');

  useEffect(() => {
    console.log("in useEffect");

    chrome.tabs.onActivated.addListener((activeInfo) => {
      console.log('listen tab', activeInfo)
    });

    // // 定义消息监听器
    // const messageListener = (message: any) => {
    //   if (message.type === 'page-information') {
    //     // 更新页面标题
    //     setPageTitle(message.content);
    //   }
    //   console.log(message)
    // };

    // // 添加消息监听器
    // chrome.runtime.onMessage.addListener(messageListener);

    // // 发送消息到用户标签页
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   const activeTab = tabs[0];
    //   chrome.tabs.sendMessage(Number(activeTab.id), { type: 'messageFromSidePanel', data: 'Hello from Side Panel!' });
    // });

    // console.log("panel send")
    // // 在组件卸载时移除消息监听器
    // return () => {
    //   chrome.runtime.onMessage.removeListener(messageListener);
    // };
  }, []); // 注意: 空数组表示只在组件挂载和卸载时执行


  return (
    <div>
      <div style={{ height: '80vh', overflowY: 'auto' }}>
        <h1>You are visiting {pageTitle}</h1>
        {/* <Chat></Chat> */}
      </div>
    </div>
  );
};

export default Panel;
