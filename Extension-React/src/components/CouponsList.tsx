import { ScrollArea } from "@/components/ui/scroll-area";
import CouponCard from "@/components/CouponCard";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Coupon } from "@/lib/sas/models.ts";

export interface CouponData {
    couponsDomain: Coupon[] | null;
    handleCopy: (code: string, index: number) => void;
    className: string;
}

const CouponsList: React.FC<CouponData> = ({ couponsDomain, handleCopy, className }) => {
    const { t } = useTranslation();
    const { minScore, maxScore } = useMemo(() => {
        if (!couponsDomain?.length) return { minScore: 0, maxScore: 1 };
        
        return {
            minScore: Math.min(...couponsDomain.map(c => c.score)),
            maxScore: Math.max(...couponsDomain.map(c => c.score))
        };
    }, [couponsDomain]);

    return (
        <div className={`${className} h-[92%] m-4 p-2 rounded-lg border-2 border-border relative`}>
            <div className="w-full h-[10%] bg-gradient-to-t from-shadow to-transparent absolute top-0 left-0"></div>
            <ScrollArea className="h-full">
                {couponsDomain ? (
                    couponsDomain.length > 0 ? (
                        <div className="space-y-2">
                            {couponsDomain.map((coupon, index) => (
                                <CouponCard
                                    key={index}
                                    coupon={coupon}
                                    onCopy={() => handleCopy(coupon.code, index)}
                                    copied={(coupon as Coupon).copied || false}
                                    minScore={minScore}
                                    maxScore={maxScore}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center flex-col">
                            <p className="text-sm text-muted-foreground dark:text-slate-400">
                                {t("no_coupons_found")}
                            </p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">
                                {t("keep_looking")}
                            </p>
                        </div>
                    )
                ) : (
                    <p className="text-sm text-muted-foreground dark:text-slate-400">
                        {t("Loading coupons for this site...")}
                    </p>
                )}
            </ScrollArea>
            <div className="w-full h-[10%] bg-gradient-to-t from-shadow to-transparent absolute bottom-0 left-0"></div>
        </div>
    )
}
;

export default CouponsList;
