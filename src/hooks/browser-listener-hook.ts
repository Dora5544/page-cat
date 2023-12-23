import { useEffect, useRef, useState } from 'react';
import { Page, chromeExtension } from '../services/browser-listener';

export function useActiveTabChange() {
    const [page, setPage] = useState<Page>();

    const pageChangeListenerId = useRef<number>();

    useEffect(() => {
        const pageChangeListener = (page: Page) => {
            setPage(page);
        }

        pageChangeListenerId.current = chromeExtension.addActivePageChangeListener(pageChangeListener);

        return () => {
            if (pageChangeListenerId.current !== undefined) {
                chromeExtension.removeActivePageChangeListener(pageChangeListenerId.current);
            }
        };
    }, []);

    return page;
}