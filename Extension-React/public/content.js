/*******************************************************
 * content.js
 *******************************************************/
(() => {
    /*******************************************************
     * 1. Configurations
     *******************************************************/
    const maxWaitTime = 4000;
    let currentLang = chrome.i18n.getUILanguage() || "en";
    let translations = {};

    const domainReplacements = {
        "nordcheckout.com": "nordvpn.com",
    };

    const domainConfigs = {
        "applebees.com": {
            inputSelector: "#txtPromoCode",
            applyButtonSelector: ".btnPromoApply",
            successSelector: ".lnkPromoRemove",
            failureSelector: ".invalid-feedback",
            priceSelector: ".order-price",
            removeCouponButtonSelector: ".lnkPromoRemove",
        },
        "nordvpn.com": {
            inputSelector: "input[name='couponCode']",
            preApplyButtonSelector:
                "p[data-testid='coupon-show-form-button'] > a",
            applyButtonSelector: "button[data-testid='coupon-apply-button']",
            successSelector: "div[data-testid='coupon-applied-message']",
            failureSelector: "div[data-testid='coupon-error-alert']",
            priceSelector: "span[data-testid='CartSummary-total-amount']",
            removeCouponButtonSelector:
                "button[data-testid='coupon-delete-applied-button']",
        },
    };

    const platformConfigs = {
        woocommerce: {
            inputSelector: "input[name='coupon_code']",
            applyButtonSelector:
                "button[name='apply_coupon'], input[name='apply_coupon']",
            successSelector: ".woocommerce-message",
            failureSelector: ".woocommerce-error",
            priceSelector: ".order-total .amount, .cart_totals .amount",
            removeCouponButtonSelector: ".woocommerce-remove-coupon",
        },
    };

    /*******************************************************
     * 2. E-Commerce Platform Detection
     *******************************************************/
    function detectPlatform() {
        const html = document.documentElement.innerHTML.toLowerCase();

        if (
            html.includes("woocommerce") ||
            html.includes("wp-content/plugins/woocommerce")
        ) {
            return "woocommerce";
        }

        return null;
    }

    /*******************************************************
     * 3. Helper Functions / Variables
     *******************************************************/
    let coupons = [];

    async function fetchCoupons(domain) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(
                { action: "getCoupons", domain },
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

    async function loadTranslations(lang) {
        const url = chrome.runtime.getURL(`_locales/${lang}/messages.json`);

        try {
            const response = await fetch(url);
            console.log("response", response);

            const translations = await response.json();
            return translations;
        } catch (error) {
            console.error("Failed to load translations:", error);
            return {};
        }
    }

    async function setLanguage(lang) {
        currentLang = lang;
        translations = await loadTranslations(lang);
    }

    function getLanguageFromStorage(callback) {
        chrome.storage.sync.get().then((data) => {
            storedLanguage = data["language"];
            callback(storedLanguage || chrome.i18n.getUILanguage() || "en");
        });
    }

    function getMessage(key) {
        return translations[key]?.message || key;
    }

    function getTranslation(key, data = {}) {
        let translated = getMessage(key);
        for (const [name, value] of Object.entries(data)) {
            translated = translated.replace(
                new RegExp(`%${name}%`, "g"),
                value
            );
        }
        return translated;
    }
    const __ = getTranslation;

    function isVisible(el) {
        if (!el) return false;
        return !!(
            el.offsetWidth ||
            el.offsetHeight ||
            el.getClientRects().length
        );
    }

    function parsePrice(str) {
        if (!str) return 0;
        const numericString = str.replace(/[^\d.-]/g, "");
        return parseFloat(numericString) || 0;
    }

    function replaceValue(selector, value) {
        const el = document.querySelector(selector);
        if (el) {
            el.value = value;
            // Fire typical events to ensure the page sees the input
            el.dispatchEvent(new Event("keydown", { bubbles: true }));
            el.dispatchEvent(new Event("keyup", { bubbles: true }));
            el.dispatchEvent(new Event("change", { bubbles: true }));
        }
        return el;
    }

    async function revertCoupon(inputSelector, removeCouponButtonSelector) {
        if (inputSelector) {
            const input = document.querySelector(inputSelector);
            if (input) {
                replaceValue(inputSelector, "");
            }
        }
        if (removeCouponButtonSelector) {
            document.querySelector(removeCouponButtonSelector)?.click();
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    /*******************************************************
     * 4. Testing & Applying Coupons
     *******************************************************/
    let stopTesting = false;
    let useBestNow = false;
    let bestPrice = 0;
    let bestCoupon = null;
    let testPopoverElement = null;

    async function applySingleCoupon(
        inputSelector,
        couponCode,
        preApplyButtonSelector,
        applyButtonSelector,
        successSelector,
        failureSelector,
        priceSelector
    ) {
        const preApplyButton = preApplyButtonSelector
            ? document.querySelector(preApplyButtonSelector)
            : null;

        if (preApplyButton) {
            preApplyButton.click();
        }

        const input = inputSelector
            ? document.querySelector(inputSelector)
            : null;
        const applyButton = applyButtonSelector
            ? document.querySelector(applyButtonSelector)
            : null;

        if (input && applyButton) {
            replaceValue(inputSelector, couponCode);
            applyButton.disabled = false;
            applyButton.click();
        }

        let prePrice = 0;
        if (priceSelector) {
            prePrice = parsePrice(
                document.querySelector(priceSelector)?.textContent
            );
        }

        let successBySelector = false;
        let failureBySelector = false;

        if (successSelector && failureSelector) {
            await new Promise((resolve) => {
                const startTime = Date.now();
                const interval = setInterval(() => {
                    const sEl = document.querySelector(successSelector);
                    const fEl = document.querySelector(failureSelector);

                    if (sEl && isVisible(sEl)) {
                        successBySelector = true;
                        clearInterval(interval);
                        resolve();
                    } else if (fEl && isVisible(fEl)) {
                        failureBySelector = true;
                        clearInterval(interval);
                        resolve();
                    } else if (Date.now() - startTime > maxWaitTime) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 300);
            });
        } else {
            // If no success/failure selector, just wait a bit
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        let postPrice = prePrice;
        if (priceSelector) {
            postPrice = parsePrice(
                document.querySelector(priceSelector)?.textContent
            );
        }

        if (successBySelector && !failureBySelector) {
            return {
                success: true,
                priceDrop: prePrice - postPrice,
                finalPrice: postPrice,
            };
        } else if (failureBySelector && !successBySelector) {
            return {
                success: false,
                priceDrop: 0,
                finalPrice: postPrice,
            };
        } else {
            const dropped = prePrice - postPrice;
            return {
                success: dropped > 0,
                priceDrop: dropped,
                finalPrice: postPrice,
            };
        }
    }

    async function tryAllCouponsAndPickBest(config) {
        stopTesting = false;
        useBestNow = false;
        bestPrice = 0;
        bestCoupon = null;

        const originalPrice = config.priceSelector
            ? parsePrice(
                  document.querySelector(config.priceSelector)?.textContent
              )
            : 0;
        bestPrice = originalPrice;

        showTestingPopover(coupons.length);

        for (let i = 0; i < coupons.length; i++) {
            if (stopTesting || useBestNow) {
                break;
            }

            const coupon = coupons[i];
            const couponCode = coupon.couponCode || coupon; // handle either {couponCode: "..."} or raw string

            updateTestingPopover(i + 1, coupons.length, couponCode, bestPrice);

            const result = await applySingleCoupon(
                config.inputSelector,
                couponCode,
                config.preApplyButtonSelector,
                config.applyButtonSelector,
                config.successSelector,
                config.failureSelector,
                config.priceSelector
            );

            if (
                result.success &&
                result.priceDrop > 0 &&
                result.finalPrice < bestPrice
            ) {
                bestPrice = result.finalPrice;
                bestCoupon = couponCode;
            }

            await revertCoupon(
                config.inputSelector,
                config.removeCouponButtonSelector
            );
        }

        // Stopped by user
        if (stopTesting) {
            finishTestingPopover(null, originalPrice, 0, true);
            return;
        }

        // Use best or finished
        if (bestCoupon && bestPrice < originalPrice) {
            await applySingleCoupon(
                config.inputSelector,
                bestCoupon,
                config.preApplyButtonSelector,
                config.applyButtonSelector,
                config.successSelector,
                config.failureSelector,
                config.priceSelector
            );
            finishTestingPopover(
                bestCoupon,
                bestPrice,
                originalPrice - bestPrice
            );
        } else {
            finishTestingPopover(null, originalPrice, 0);
        }
    }

    /*******************************************************
     * 5. Popover UI with Semi-Transparent Background
     *******************************************************/
    function showTestingPopover(totalCoupons) {
        // If there's an existing overlay/popover, remove it first
        if (testPopoverElement) {
            testPopoverElement.remove();
            testPopoverElement = null;
        }

        // Create a full-screen overlay to dim the background
        const overlay = document.createElement("div");
        overlay.id = "syrup-testing-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        overlay.style.zIndex = "9999998";

        // Create the actual popover container
        const container = document.createElement("div");
        container.id = "syrup-testing-popover";
        container.style.position = "absolute";
        container.style.top = "50%";
        container.style.left = "50%";
        container.style.transform = "translate(-50%, -50%)";
        container.style.zIndex = "9999999";
        container.style.backgroundColor = "#fff";
        container.style.border = "2px solid #ccc";
        container.style.borderRadius = "8px";
        container.style.padding = "20px";
        container.style.width = "400px";
        container.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        container.style.fontFamily = "Arial, sans-serif";

        container.innerHTML = `
            <h2 style="margin: 0 0 10px 0; font-size: 22px;">
                ${__("testing_coupons")}
            </h2>
            <p id="syrup-test-step" style="margin: 5px 0; font-size: 16px; color: #333;"></p>
            <p id="syrup-test-status" style="margin: 5px 0; font-size: 14px; color: #666;"></p>
            <div style="margin-top: 15px;">
                <button id="syrup-cancel-test-btn" style="
                    background-color: #f44336;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    padding: 10px 16px;
                    font-size: 14px;
                    cursor: pointer;
                    margin-right: 8px;
                ">
                    ${__("cancel")}
                </button>
                <button id="syrup-use-best-btn" style="
                    background-color: #ff9800;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    padding: 10px 16px;
                    font-size: 14px;
                    cursor: pointer;
                ">
                    ${__("use_best")}
                </button>
            </div>
        `;

        // Insert the popover container into the overlay
        overlay.appendChild(container);
        // Insert the overlay into the document
        document.body.appendChild(overlay);

        testPopoverElement = overlay;

        // Cancel
        document
            .getElementById("syrup-cancel-test-btn")
            .addEventListener("click", () => {
                stopTesting = true;
            });
        // Use Best
        document
            .getElementById("syrup-use-best-btn")
            .addEventListener("click", () => {
                useBestNow = true;
            });
    }

    function updateTestingPopover(
        currentIndex,
        total,
        currentCoupon,
        bestPriceSoFar
    ) {
        // The popover is inside an overlay, so find the popover elements
        if (!testPopoverElement) return;
        const container = testPopoverElement.querySelector(
            "#syrup-testing-popover"
        );
        if (!container) return;

        const stepEl = container.querySelector("#syrup-test-step");
        const statusEl = container.querySelector("#syrup-test-status");

        if (stepEl) {
            stepEl.textContent = __(`testing_coupon_current_of_total`, {
                currentIndex,
                total,
            });
        }
        if (statusEl) {
            statusEl.textContent = currentCoupon
                ? __(`now_trying_best_so_far`, {
                      currentCoupon,
                      bestPriceSoFar,
                  })
                : __(`best_price_so_far`, { bestPriceSoFar });
        }
    }

    function finishTestingPopover(
        bestCoupon,
        finalPrice,
        savings,
        wasCancelled = false
    ) {
        if (!testPopoverElement) return;

        // Find the actual popover container
        const container = testPopoverElement.querySelector(
            "#syrup-testing-popover"
        );
        if (!container) return;

        const stepEl = container.querySelector("#syrup-test-step");
        const statusEl = container.querySelector("#syrup-test-status");
        const cancelBtn = container.querySelector("#syrup-cancel-test-btn");
        const useBestBtn = container.querySelector("#syrup-use-best-btn");

        if (cancelBtn) cancelBtn.remove();
        if (useBestBtn) useBestBtn.remove();

        if (wasCancelled) {
            if (stepEl) stepEl.textContent = __("testing_cancelled");
            if (statusEl) {
                statusEl.textContent = __(
                    "scan_was_stopped_no_coupons_applied"
                );
            }
        } else if (bestCoupon) {
            if (stepEl) stepEl.textContent = __("we_found_the_best_coupon");
            if (statusEl) {
                statusEl.textContent = __(
                    `applied_coupon_and_saved_savings_new_total`,
                    {
                        bestCoupon,
                        savings: savings.toFixed(2),
                        finalPrice: finalPrice.toFixed(2),
                    }
                );
            }
        } else {
            if (stepEl) stepEl.textContent = __("no_better_price_found");
            if (statusEl) {
                statusEl.textContent = __(
                    "all_coupons_tested_but_none_lowered_your_total"
                );
            }
        }

        // "Got it" button
        const gotItBtn = document.createElement("button");
        gotItBtn.id = "syrup-got-it-btn";
        gotItBtn.textContent = __("got_it");
        gotItBtn.style.marginTop = "15px";
        gotItBtn.style.backgroundColor = "#28a745";
        gotItBtn.style.color = "#fff";
        gotItBtn.style.border = "none";
        gotItBtn.style.borderRadius = "4px";
        gotItBtn.style.padding = "10px 16px";
        gotItBtn.style.fontSize = "14px";
        gotItBtn.style.cursor = "pointer";

        gotItBtn.addEventListener("click", () => {
            testPopoverElement?.remove();
            testPopoverElement = null;
        });
        container.appendChild(gotItBtn);
    }

    /*******************************************************
     * 6. Popups: Auto-Apply or No Config
     *******************************************************/
    function showAutoApplyPopup(syrupIconUrl) {
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
                    <img src="${syrupIconUrl}" alt="${__(
            "syrup_logo"
        )}" style="width: 40px; height: 40px; border-radius: 8px;">
                    <div>
                        <h3 style="margin: 0; font-size: 18px; color: #333;">${__(
                            "syrup_found_coupons"
                        )}</h3>
                        <p style="margin: 0; font-size: 14px; color: #666;">${__(
                            "click_apply_to_try_them_all"
                        )}</p>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 10px;">
                    <button id="apply-coupons-btn" style="
                        background-color: #007bff; 
                        color: #ffffff; 
                        border: none; 
                        border-radius: 5px; 
                        padding: 10px 15px; 
                        font-size: 14px; 
                        cursor: pointer; 
                        transition: background-color 0.2s ease;
                        width: 100%;
                    ">${__("apply")}</button>
                    <button id="ignore-coupons-btn" style="
                        background-color: #f8f9fa; 
                        color: #333; 
                        border: 1px solid #ddd; 
                        border-radius: 5px; 
                        padding: 10px 15px; 
                        font-size: 14px; 
                        cursor: pointer; 
                        transition: background-color 0.2s ease;
                        width: 100%;
                    ">${__("ignore")}</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", popupHTML);

        document
            .getElementById("apply-coupons-btn")
            .addEventListener("click", async () => {
                document.getElementById("coupon-popup")?.remove();
                const config = determineConfig();
                if (config) {
                    await tryAllCouponsAndPickBest(config);
                } else {
                    // If no config found, show "No Config" popup
                    const SyrupIcon = chrome.runtime.getURL("icons/Syrup.png");
                    showNoConfigPopup(SyrupIcon);
                }
            });

        document
            .getElementById("ignore-coupons-btn")
            .addEventListener("click", () => {
                document.getElementById("coupon-popup")?.remove();
            });
    }

    function showNoConfigPopup(syrupIconUrl) {
        const popupHTML = `
            <div id="no-config-popup" style="
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
                    <img src="${syrupIconUrl}" alt="${__(
            "syrup_logo"
        )}" style="width: 40px; height: 40px; border-radius: 8px;">
                    <div>
                        <h3 style="margin: 0; font-size: 18px; color: #333;">${__(
                            "syrup_found_coupons"
                        )}</h3>
                        <p style="margin: 0; font-size: 14px; color: #666;">${__(
                            "no_auto_apply_setup"
                        )}</p>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 10px;">
                    <button id="show-extension-btn" style="
                        background-color: #007bff; 
                        color: #ffffff; 
                        border: none; 
                        border-radius: 5px; 
                        padding: 10px 15px; 
                        font-size: 14px; 
                        cursor: pointer; 
                        transition: background-color 0.2s ease;
                        width: 100%;
                    ">${__("show_extension")}</button>
                    <button id="ignore-no-config-btn" style="
                        background-color: #f8f9fa; 
                        color: #333; 
                        border: 1px solid #ddd; 
                        border-radius: 5px; 
                        padding: 10px 15px; 
                        font-size: 14px; 
                        cursor: pointer; 
                        transition: background-color 0.2s ease;
                        width: 100%;
                    ">${__("ignore")}</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", popupHTML);

        document
            .getElementById("show-extension-btn")
            .addEventListener("click", () => {
                document.getElementById("no-config-popup")?.remove();
                chrome.runtime.sendMessage({ action: "openPopup" });
            });

        document
            .getElementById("ignore-no-config-btn")
            .addEventListener("click", () => {
                document.getElementById("no-config-popup")?.remove();
            });
    }

    /*******************************************************
     * 7. Determine Config Based on Domain or Platform
     *******************************************************/
    function determineConfig() {
        let domain = window.location.hostname.replace("www.", "");
        if (domainReplacements[domain]) domain = domainReplacements[domain];

        // 1) Check domain config
        if (domainConfigs[domain]) {
            return domainConfigs[domain];
        }

        // 2) Check platform
        const platform = detectPlatform();
        if (platformConfigs[platform]) {
            return platformConfigs[platform];
        }

        // If not found, we have no config
        return null;
    }

    /*******************************************************
     * 8. Main
     *******************************************************/
    async function main() {
        let domain = window.location.hostname.replace("www.", "");
        if (domainReplacements[domain]) domain = domainReplacements[domain];
        const path = window.location.pathname;

        // 1) Attempt to fetch coupons
        try {
            await fetchCoupons(domain);
        } catch (err) {
            console.error("[Syrup] Failed to fetch coupons:", err);
            return;
        }

        if (!coupons || coupons.length === 0) {
            console.log("[Syrup] No coupons found.");
            return; // No coupons to try
        }

        chrome.runtime.sendMessage({
            action: "setBadgeText",
            text: coupons.length.toString(),
        });

        // 2) Check if user is on a likely checkout page
        const isCheckoutPath = [
            "checkout",
            "cart",
            "basket",
            "order",
            "payment",
        ].some((keyword) => path.includes(keyword));
        if (!isCheckoutPath) {
            return;
        }

        // 3) Determine config
        const config = determineConfig();
        const SyrupIcon = chrome.runtime.getURL("icons/Syrup.png");

        // 4) If we found a config, show auto-apply, otherwise show fallback
        if (config) {
            showAutoApplyPopup(SyrupIcon);
        } else {
            showNoConfigPopup(SyrupIcon);
        }
    }

    // Delay a bit for the page to load
    setTimeout(() => {
        main().catch((err) => console.error("[Syrup] Main error:", err));
    }, 3000);

    getLanguageFromStorage(setLanguage);
})();
