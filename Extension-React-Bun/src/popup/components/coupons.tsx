import { useTranslation } from "react-i18next";
import { parseDomain, fromUrl } from "parse-domain";
import type { Coupon } from "@/lib/sas/models";
import { Check, Copy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSetting } from "@/lib/settings";
import React, { useEffect } from "react";

export interface CouponData {
    pageDomain: string;
    pageSubDomain: string;
    isSubDomain: boolean;
    couponsDomain: Coupon[] | null;
    couponsSubDomain: Coupon[] | null;
    errorMsg: string;
}

const Coupons: React.FC<CouponData> = ({
    pageDomain,
    pageSubDomain,
    couponsDomain,
    couponsSubDomain,
    errorMsg,
}) => {
    const { t } = useTranslation();

    const parsedDomain = parseDomain(fromUrl(pageDomain));
    const parsedSubDomain = parseDomain(fromUrl(pageSubDomain));

    const getDomainName = (parsed: ReturnType<typeof parseDomain>) => {
        if (parsed.type === "LISTED" && parsed.icann) {
            return parsed.icann.domain;
        }
        return "";
    };
    const getSubDomainName = (parsed: ReturnType<typeof parseDomain>) => {
        if (
            parsed.type === "LISTED" &&
            parsed.icann &&
            parsed.icann.subDomains
        ) {
            return parsed.icann.subDomains.join(".");
        }
        return "";
    };

    const domainName = getDomainName(parsedDomain);
    const subDomainName: string = getSubDomainName(parsedSubDomain);
    const [dummyData, setDummyData] = React.useState<string | null>(null);

    useEffect(() => {
        getSetting("dummyData").then(data => setDummyData(data));
    }, []);

    const [copiedId, setCopiedId] = React.useState<number | null>(null)
    const handleCopy = (code: string, id: number) => {
        navigator.clipboard.writeText(code)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <Tabs defaultValue="domain" className="grid grid-cols-1 grid-rows-[8%,92%] h-100 w-100">
            {errorMsg && dummyData === "false" ? (
                <>
                    <TabsList className="grid w-full grid-cols-1 w-80">
                        <TabsTrigger value="error">{t(errorMsg)}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="error">{t(errorMsg)}</TabsContent>
                </>
            ) : (
                <>
                    <TabsList className="grid w-full grid-cols-2 w-80">
                        {subDomainName ? (
                            <>
                                <TabsTrigger value="domain">{domainName}</TabsTrigger>
                                <TabsTrigger value="subdomain">{subDomainName}</TabsTrigger>
                            </>
                        ) : (
                            <TabsTrigger value="domain">{domainName}</TabsTrigger>
                        )}
                    </TabsList>
                    <TabsContent value="domain" className="w-80 overflow-y-scroll mb-4">
                        <div className="space-y-4">
                            {couponsDomain?.map((coupon, index) => (
                                <Card key={coupon.id} className="shadow-sm">
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-start">
                                    <CardTitle className="text-base">{coupon.title}</CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 px-2 ml-2"
                                        onClick={() => handleCopy(coupon.code, index)}
                                    >
                                        {copiedId === index ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 mr-1" />
                                            {t("copied")}
                                        </>
                                        ) : (
                                        <>
                                            <Copy className="h-3.5 w-3.5 mr-1" />
                                            {t("copy")}
                                        </>
                                        )}
                                    </Button>
                                    </div>
                                    <div className="mt-1 inline-flex bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
                                        {coupon.code}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-2">
                                    <CardDescription className="text-xs">{coupon.description}</CardDescription>
                                </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="subdomain" className="w-80 overflow-y-scroll mb-4">
                        <div className="space-y-4">
                            {couponsSubDomain?.map((coupon, index) => (
                                <Card key={coupon.id} className="shadow-sm">
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-start">
                                    <CardTitle className="text-base">{coupon.title}</CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 px-2 ml-2"
                                        onClick={() => handleCopy(coupon.code, index)}
                                    >
                                        {copiedId === index ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 mr-1" />
                                            {t("copied")}
                                        </>
                                        ) : (
                                        <>
                                            <Copy className="h-3.5 w-3.5 mr-1" />
                                            {t("copy")}
                                        </>
                                        )}
                                    </Button>
                                    </div>
                                    <div className="mt-1 inline-flex bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
                                        {coupon.code}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-2">
                                    <CardDescription className="text-xs">{coupon.description}</CardDescription>
                                </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </>
            )}
        </Tabs>
    );
};

export default Coupons;