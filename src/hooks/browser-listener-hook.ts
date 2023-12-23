import { useEffect, useRef, useState } from 'react';
import { Page, chromeExtension } from '../services/browser-extension';

export function useActiveTabChange() {
    const [page, setPage] = useState<Page | null>();

    const pageChangeListenerId = useRef<number>();

    useEffect(() => {
        const pageChangeListener = (page: Page | null) => {
            setPage(page);
        }

        // 注册页面变动监听器，保存监听器Id，用于卸载监听器时使用
        pageChangeListenerId.current = chromeExtension.addActivePageChangeListener(pageChangeListener);

        // 加载插件后主动查询当前页面基本信息
        chromeExtension.getCurrentActivePage().then(page => pageChangeListener(page));

        return () => {
            // 在组件卸载时移除消息监听器
            if (pageChangeListenerId.current !== undefined) {
                chromeExtension.removeActivePageChangeListener(pageChangeListenerId.current);
            }
        };
    }, []); // 注意: 空数组表示只在组件挂载和卸载时执行

    return page;
}