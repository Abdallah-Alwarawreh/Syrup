chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCoupons") {
        fetch(
            "https://abdallah-alwarawreh.github.io/Syrup/backend/" +
                request.domain +
                "/coupons.json"
        )
            .then((response) => response.json())
            .then((data) => {
                sendResponse({ coupons: data });
            })
            .catch((err) => {
                sendResponse({ coupons: [] });
            });
        return true;
    } else if (request.action === "setBadgeText") {
        chrome.action.setBadgeText({
            tabId: sender.tab.id,
            text: request.text,
        });
    }

    if (request.action === "openPopup") {
        chrome.action.openPopup();
    }
});
