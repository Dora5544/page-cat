

export interface Page {

    tabId: number;

    title: string;

    url?: string;
}

export type ActivePageChangeListener = (page: Page | null) => void;

export class ChromeExtension {

    private readonly activePageChangeListenerList: ActivePageChangeListener[] = [];

    private readonly tabActivatedListener = async () => {

        const currentPage = await this.getCurrentActivePage();
        this.activePageChangeListenerList.forEach(listener => listener(currentPage));
    }

    private readonly webNavigationListener = async (details: chrome.webNavigation.WebNavigationFramedCallbackDetails) => {
        if (details.frameId === 0) {
            const currentPage = await this.getCurrentActivePage();
            if (currentPage != null) {
                this.activePageChangeListenerList.forEach(listener => listener(currentPage));
            }
        }
    }

    public addActivePageChangeListener(listener: ActivePageChangeListener): number {
        if (this.activePageChangeListenerList.length === 0) {
            chrome.tabs.onActivated.addListener(this.tabActivatedListener);
            chrome.webNavigation.onCompleted.addListener(this.webNavigationListener);
            console.log("tabActivatedListener and webNavigationListener registered");
        }

        return this.activePageChangeListenerList.push(listener) - 1;
    }

    public removeActivePageChangeListener(listenerId: number) {

        this.activePageChangeListenerList.splice(listenerId, 1);

        if (this.activePageChangeListenerList.length === 0) {
            chrome.tabs.onActivated.removeListener(this.tabActivatedListener);
            chrome.webNavigation.onCompleted.removeListener(this.webNavigationListener);
            console.log("tabActivatedListener and webNavigationListener removed");
        }
    }

    public async getCurrentActivePage() {
        return new Promise<Page | null>(resolver => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
                if (tabs && tabs[0]) {
                    const activeTab = tabs[0];
                    if (activeTab.id !== undefined && (activeTab.url?.startsWith("http") || activeTab.url?.startsWith("https"))) {
                        resolver({
                            tabId: activeTab.id,
                            title: activeTab.title || '',
                            url: activeTab.url
                        });
                    }
                }
                resolver(null);
            });
        })
    }
}


export const chromeExtension = new ChromeExtension();