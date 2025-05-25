import React, { useEffect, useState, useCallback } from "react";
import { fetchCoupons } from "@/lib/utils";
import { parseDomain } from "parse-domain";
import Coupons from "@/popup/components/coupons";
import Header from "@/popup/components/Header";
import type { Coupon } from "@/lib/sas/models.ts";
import { getSetting } from "@/lib/settings";

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
    "firefox://", "opera://", "safari://", "about:", "mozilla:", "newtab", "extensions",
];

const Popup: React.FC = () => {
    const [pageInfo, setPageInfo] = useState({
        domain: "",
        subDomain: "",
        isSubDomain: false,
        icon: "",
    });
    const [couponsFound, setCouponsFound] = useState<number>(0);
    const [couponsDomain, setCouponsDomain] = useState<Coupon[]>([]);
    const [couponsSubDomain, setCouponsSubDomain] = useState<Coupon[]>([]);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleDomainParsing = useCallback((fullDomain: string, favIconUrl: string | null = null) => {
        fullDomain = fullDomain.replace("www.", "");

        if (invalidDomains.some((domain) => fullDomain.includes(domain))) {
            setPageInfo({
                domain: "joinsyrup.com",
                subDomain: "",
                isSubDomain: false,
                icon: `https://joinsyrup.com/favicon.ico`,
            });
            setCouponsDomain([
                { id: "1", title: "Example Title 1", code: "EXAMPLECODE1", description: "Example description 1", score: 10 },
                { id: "2", title: "Example Title 2", code: "EXAMPLECODE2", description: "Example description 2", score: 9 },
                { id: "3", title: "Example Title 3", code: "EXAMPLECODE3", description: "Example description 3", score: 8 },
                { id: "4", title: "Example Title 4", code: "EXAMPLECODE4", description: "Example description 4", score: 7 },
                { id: "5", title: "Example Title 5", code: "EXAMPLECODE5", description: "Example description 5", score: 6 },
                { id: "6", title: "Example Title 6", code: "EXAMPLECODE6", description: "Example description 6", score: 5 },
                { id: "7", title: "Example Title 7", code: "EXAMPLECODE7", description: "Example description 7", score: 4 },
                { id: "8", title: "Example Title 8", code: "EXAMPLECODE8", description: "Example description 8", score: 3 },
                { id: "9", title: "Example Title 9", code: "EXAMPLECODE9", description: "Example description 9", score: 2 },
            ]);
            setCouponsFound(9);
            setErrorMsg("Browser_domain");
            return;
        } else {
            try {
                const parseResult = parseDomain(domainReplacements[fullDomain] || fullDomain) as ParseResult;
                const domain = `${parseResult.domain}.${parseResult.topLevelDomains.join(".")}`;
    
                setPageInfo({
                    domain,
                    subDomain: parseResult.subDomains.length > 0 ? parseResult.hostname : "",
                    isSubDomain: parseResult.subDomains.length > 0,
                    icon: favIconUrl || `https://www.google.com/s2/favicons?sz=64&domain=${domain}`,
                });
                let conponsFounds = 0;
                fetchCoupons(domain, (coupons) => {
                    setCouponsDomain(Array.isArray(coupons) ? coupons : []);
                    conponsFounds += coupons ? coupons.length : 0;
                });
                fetchCoupons(parseResult.hostname, (coupons) => {
                    setCouponsSubDomain(Array.isArray(coupons) ? coupons : []);
                    conponsFounds += coupons ? coupons.length : 0;
                });
                setCouponsFound(conponsFounds);
                setErrorMsg("");
            } catch (error) {
                console.error("Error parsing domain:", error);
                setErrorMsg("Domain_invalid");
            }
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
        <main className="grid grid-cols-1 grid-rows-[10%,90%] w-screen h-screen">
            <div className="flex items-center justify-between mx-4">
                <Header
                    pageIcon={pageInfo.icon}
                    pageDomain={pageInfo.domain}
                    couponsFound={couponsFound} />
            </div>
            <div className="flex justify-center">
                <Coupons
                    pageDomain={pageInfo.domain}
                    pageSubDomain={pageInfo.subDomain}
                    isSubDomain={pageInfo.isSubDomain}
                    couponsDomain={couponsDomain}
                    couponsSubDomain={couponsSubDomain}
                    errorMsg={errorMsg} />
            </div>
        </main>
    );
};

export default Popup;