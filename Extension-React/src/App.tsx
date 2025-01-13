import React, { useEffect, useState, useCallback } from "react";
import { fetchCoupons } from "@/lib/utils";
import { parseDomain } from "parse-domain";
import CouponsPage from "@/components/CouponsPage";
import Header from "@/components/Header";
import { Coupon } from "@/lib/sas/models.ts";

interface ParseResult {
    domain: string;
    topLevelDomains: string[];
    subDomains: string[];
    hostname: string;
}

const domainReplacements: Record<string, string> = {
    "nordcheckout.com": "nordvpn.com",
};

const invalidDomains = [
    "arc://", "chrome://", "chrome-extension://", "edge://",
    "firefox://", "opera://", "safari://", "about:", "mozilla:", "newtab"
];

const Popup: React.FC = () => {
    const [pageInfo, setPageInfo] = useState({
        domain: "",
        subDomain: "",
        isSubDomain: false,
        icon: "",
    });
    const [couponsDomain, setCouponsDomain] = useState<Coupon[]>([]);
    const [couponsSubDomain, setCouponsSubDomain] = useState<Coupon[]>([]);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleDomainParsing = useCallback((fullDomain: string, favIconUrl: string | null = null) => {
        fullDomain = fullDomain.replace("www.", "");

        if (invalidDomains.some((domain) => fullDomain.includes(domain))) {
            setErrorMsg("Browser_domain");
            return;
        }

        try {
            const parseResult = parseDomain(domainReplacements[fullDomain] || fullDomain) as ParseResult;
            const domain = `${parseResult.domain}.${parseResult.topLevelDomains.join(".")}`;

            setPageInfo({
                domain,
                subDomain: parseResult.subDomains.length > 0 ? parseResult.hostname : "",
                isSubDomain: parseResult.subDomains.length > 0,
                icon: favIconUrl || `https://www.google.com/s2/favicons?sz=64&domain=${domain}`,
            });

            fetchCoupons(domain, (coupons) => {
                setCouponsDomain(Array.isArray(coupons) ? coupons : []);
            });
            fetchCoupons(parseResult.hostname, (coupons) => {
                setCouponsSubDomain(Array.isArray(coupons) ? coupons : []);
            });
            setErrorMsg("");
        } catch (error) {
            console.error("Error parsing domain:", error);
            setErrorMsg("Domain_invalid");
        }
    }, []);

    const handleChromeTab = useCallback(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const tab = tabs[0];
                if (tab.url) {
                    const url = new URL(tab.url);
                    handleDomainParsing(url.hostname, tab.favIconUrl);
                }
            }
        });
    }, [handleDomainParsing]);

    useEffect(() => {
        if (!chrome.tabs) {
            let fullDomain = window.location.hostname.replace("www.", "");
            const searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has("domain")) {
                fullDomain = searchParams.get("domain") || "";
            }
            handleDomainParsing(fullDomain);
        } else {
            handleChromeTab();
        }
    }, [handleChromeTab, handleDomainParsing]);

    const updateCouponCopiedState = (index: number, copied: boolean) => {
        setCouponsDomain((prev) =>
            prev.map((coupon, i) => (i === index ? { ...coupon, copied } : coupon))
        );
    };

    const handleCopy = (code: string, index: number) => {
        navigator.clipboard.writeText(code);
        if (couponsDomain && index >= 0 && index < couponsDomain.length) {
            updateCouponCopiedState(index, true);
            setTimeout(() => updateCouponCopiedState(index, false), 2000);
        } else {
            console.warn("Invalid index for coupon copy.");
        }
    };

    return (
        <main className="grid grid-cols-1 grid-rows-[10%,90%] h-screen w-screen overflow-hidden">
            <Header />
            <CouponsPage
                pageIcon={pageInfo.icon}
                pageDomain={pageInfo.domain}
                pageSubDomain={pageInfo.subDomain}
                isSubDomain={pageInfo.isSubDomain}
                couponsDomain={couponsDomain}
                couponsSubDomain={couponsSubDomain}
                handleCopy={handleCopy}
                errorMsg={errorMsg}
            />
        </main>
    );
};

export default Popup;