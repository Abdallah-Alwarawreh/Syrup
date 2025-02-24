// Type definitions for message requests
import { SyrupApiClientV1 } from "@/lib/sas";

interface GetCouponsRequest {
    action: "getCoupons";
    domain: string;
}

interface SetBadgeTextRequest {
    action: "setBadgeText";
    text: string;
}

interface OpenPopupRequest {
    action: "openPopup";
}

interface CheckDevRequest {
    action: "checkDev";
}

// Union type for all possible requests
type MessageRequest =
    | GetCouponsRequest
    | SetBadgeTextRequest
    | OpenPopupRequest
    | CheckDevRequest;

export const syrupApiClient = new SyrupApiClientV1(
    "https://db.joinsyrup.com/api/v1/syrup"
);

// Message handler
chrome.runtime.onMessage.addListener(
    (
        request: MessageRequest,
        sender: chrome.runtime.MessageSender,
        sendResponse: (response?: any) => void
    ) => {
        if (request.action === "getCoupons") {
            syrupApiClient
                .listCoupons({ domain: request.domain, cache: 60 * 1000 })
                .then((response) => {
                    sendResponse({ coupons: response.data.coupons });
                })
                .catch((error) => {
                    console.error("Error fetching coupons:", error);
                    sendResponse({ coupons: [] });
                });
            return true;
        }

        if (request.action === "setBadgeText") {
            chrome.action.setBadgeText({
                tabId: sender.tab?.id,
                text: request.text,
            });
        }

        if (request.action === "openPopup") {
            chrome.action.openPopup();
        }

        if (request.action === "checkDev") {
            chrome.management.getSelf(
                (self: chrome.management.ExtensionInfo) => {
                    sendResponse(self.installType === "development");
                }
            );
            return true;
        }
    }
);
