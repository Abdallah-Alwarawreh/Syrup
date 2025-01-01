import React, { useEffect, useState } from "react";
import { Coupon } from "./components/CouponCard";
import Header from "./components/Header";
import CouponsList from "./components/CouponsList";
import { fetchCoupons } from "./lib/utils";

const Popup: React.FC = () => {
    const [pageDomain, setPageDomain] = useState<string>("");
    const [pageSubDomain, setPageSubDomain] = useState<string>("");
    const [isSubDomain, setIsSubDomain] = useState<boolean>(false);
    const [pageIcon, setPageIcon] = useState<string>("");
    const [couponsDomain, setCouponsDomain] = useState<Coupon[]>([]);
    const [couponsSubDomain, setCouponsSubDomain] = useState<Coupon[]>([]);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const tab = tabs[0];
                if (tab.url) {
                    const url = new URL(tab.url);
                    const fullDomain = url.hostname.replace("www.", "");
                    const domain = fullDomain.split(".").slice(-2).join(".");
                    if (fullDomain.split(".").length > 2) {
                        setIsSubDomain(true);
                        setPageSubDomain(fullDomain);
                    } else {
                        setIsSubDomain(false);
                        setPageSubDomain("");
                    }

                    setPageDomain(domain);
                    setPageIcon(
                        `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
                    );

                    fetchCoupons(domain, setCouponsDomain);
                    fetchCoupons(fullDomain, setCouponsSubDomain);
                }
            }
        });
    }, []);

    const handleCopy: (code: string, index: number) => void = (
        code: string,
        index: number
    ) => {
        navigator.clipboard.writeText(code);

        const newCoupons = [...couponsDomain];
        newCoupons[index] = { ...newCoupons[index], copied: true };
        setCouponsDomain(newCoupons);

        setTimeout(() => {
            newCoupons[index] = { ...newCoupons[index], copied: false };
            setCouponsDomain([...newCoupons]);
        }, 2000);
    };

    return (
        <div className="w-96 h-[32rem] flex flex-col p-4 bg-background">
            <h1 className="text-lg text-primary-foreground text-center">
                Syrup
            </h1>
            <Header pageIcon={pageIcon} pageDomain={pageDomain} />
            <CouponsList coupons={couponsDomain} handleCopy={handleCopy} />
            {isSubDomain && (
                <>
                    <Header pageIcon={pageIcon} pageDomain={pageSubDomain} />
                    <CouponsList
                        coupons={couponsSubDomain}
                        handleCopy={handleCopy}
                    />
                </>
            )}
        </div>
    );
};

export default Popup;
