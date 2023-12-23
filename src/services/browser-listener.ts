export type ActivePageChangeListener = (page: Page) => void;


export class Page {

    constructor(public tabId: number) {

    }

}


export class ChromeExtension {

    private readonly activePageChangeListenerList: ActivePageChangeListener[] = [];

    private tabActivatedListener = (activeInfo: chrome.tabs.TabActiveInfo) => {
        this.activePageChangeListenerList.forEach(listener => listener(new Page(activeInfo.tabId)));
    }

    private webNavigationListener = (details: chrome.webNavigation.WebNavigationFramedCallbackDetails) => {
        this.activePageChangeListenerList.forEach(listener => listener(new Page(details.tabId)));
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
}


export const chromeExtension = new ChromeExtension();