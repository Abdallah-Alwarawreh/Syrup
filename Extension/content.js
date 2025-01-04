let coupons = [];

// https://stackoverflow.com/a/57900849
function replaceValue(selector, value) {
    const el = document.querySelector(selector);
    if (el) {
        el.focus();
        document.execCommand("selectAll");
        if (!document.execCommand("insertText", false, value)) {
            el.value = value;
        }
        el.dispatchEvent(new Event("change", { bubbles: true }));
    }
    return el;
}

async function ApplyCoupon(
    inputSelector,
    couponCode,
    applyButtonSelector,
    successSelector,
    failureSelector
) {
    let input = document.querySelector(inputSelector);
    let applyButton = document.querySelector(applyButtonSelector);
    if (input && applyButton) {
        replaceValue(inputSelector, couponCode);
        applyButton.click();
    }

    if (successSelector && failureSelector) {
        return await new Promise((resolve) => {
            const interval = setInterval(() => {
                if (document.querySelector(successSelector)) {
                    clearInterval(interval);
                    resolve(true);
                } else if (document.querySelector(failureSelector)) {
                    clearInterval(interval);
                    resolve(false);
                }
            }, 1000);
        });
    } else {
        return true;
    }
}

async function fetchCoupons(domain) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
            { action: "getCoupons", domain: domain },
            (response) => {
                if (response && response.coupons) {
                    coupons = response.coupons;
                    resolve();
                } else {
                    reject("No coupons found");
                }
            }
        );
    });
}

async function ApplyCouponOnPage() {
    const domain = window.location.hostname.replace("www.", "");
    const path = window.location.pathname;
}

async function main() {
    const domain = window.location.hostname.replace("www.", "");
    const path = window.location.pathname;
    await fetchCoupons(domain);

    // this is just a demo, i wont be adding every website
    // for future readers, you can add more websites here or just make an endpoint for the javascript to run
    // TODO: add more websites
    if (
        coupons.length > 0 &&
        (path.includes("checkout") ||
            path.includes("cart") ||
            path.includes("basket") ||
            path.includes("order"))
    ) {
        const SyrupIcon = chrome.runtime.getURL("icons/Syrup.png");
        const popupHTML = `
            <div id="coupon-popup" style="
                position: fixed; 
                top: 20px; 
                right: 20px; 
                z-index: 1000; 
                background-color: #ffffff; 
                border: 1px solid #ddd; 
                border-radius: 8px; 
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
                padding: 15px; 
                width: 320px; 
                font-family: Arial, sans-serif;
            ">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <img src="" id="syrupIcon" alt="Syrup Logo" style="width: 40px; height: 40px; border-radius: 8px;">
                    <div>
                        <h3 style="
                            margin: 0; 
                            font-size: 18px; 
                            color: #333;
                        ">Syrup has found coupons for you!</h3>
                        <p style="
                            margin: 0; 
                            font-size: 14px; 
                            color: #666;
                        ">Syrup has found coupons for this site! click on the extension icon on top to check them out</p>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 10px;">
                <!--
                    <button id="apply-coupon" style="
                        background-color: #007bff; 
                        color: #ffffff; 
                        border: none; 
                        border-radius: 5px; 
                        padding: 10px 15px; 
                        font-size: 14px; 
                        cursor: pointer; 
                        transition: background-color 0.2s ease;
                        width: 100%;
                    ">Apply</button>
                -->
                    <button id="close-popup" style="
                        background-color: #f8f9fa; 
                        color: #333; 
                        border: 1px solid #ddd; 
                        border-radius: 5px; 
                        padding: 10px 15px; 
                        font-size: 14px; 
                        cursor: pointer; 
                        transition: background-color 0.2s ease;
                        width: 100%;
                    ">Close</button>
                </div>
            </div>
            `;
        document.body.insertAdjacentHTML("beforeend", popupHTML);

        document.getElementById("syrupIcon").src = SyrupIcon;

        // document
        //     .getElementById("apply-coupon")
        //     .addEventListener("click", () => {
        //         document.getElementById("coupon-popup").remove();

        //         ApplyCouponOnPage();
        //     });

        document.getElementById("close-popup").addEventListener("click", () => {
            document.getElementById("coupon-popup").remove();
        });
    }
}

setTimeout(() => {
    main();
}, 3000);
