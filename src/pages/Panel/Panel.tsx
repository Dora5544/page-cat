import React, { useState, useEffect } from 'react';
import './Panel.css';

const Panel: React.FC = () => {
  const [pageTitle, setPageTitle] = useState('...');

  useEffect(() => {
    // 定义消息监听器
    const messageListener = (message: any) => {
      if (message.type === 'page-information') {
        // 更新页面标题
        setPageTitle(message.content);
      }
      console.log(message)
    };

    // 添加消息监听器
    chrome.runtime.onMessage.addListener(messageListener);

    // 在组件卸载时移除消息监听器
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []); // 注意: 空数组表示只在组件挂载和卸载时执行


  return (
    <div>
      <h1>You are visiting {pageTitle}</h1>
    </div>
  );
};

export default Panel;
