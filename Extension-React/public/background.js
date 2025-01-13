chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCoupons") {
        fetch(
            "https://api.discountdb.ch/api/v1/syrup/coupons?domain=" +
                request.domain
        )
            .then((response) => response.json())
            .then((data) => {
                sendResponse({ coupons: data });
            })
            .catch((err) => {
                sendResponse({ coupons: [] });
            });
        return true;
    }

    if (request.action === "setBadgeText") {
        chrome.action.setBadgeText({
            tabId: sender.tab.id,
            text: request.text,
        });
    }

    if (request.action === "openPopup") {
        chrome.action.openPopup();
    }

    if (request.action === "checkDev") {
        //https://developer.chrome.com/docs/extensions/reference/api/management#type-ExtensionInfo
        chrome.management.getSelf((self) => {
            sendResponse(self.installType === "development");
        });
        return true;
    }
});
