import CouponsEntry from "@/components/CouponsEntry";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useTranslation } from "react-i18next";

export interface CouponData {
    pageIcon: string;
    pageDomain: string;
    pageSubDomain: string;
    isSubDomain?: boolean;
    couponsDomain: Coupon[] | null;
    couponsSubDomain: Coupon[] | null;
    handleCopy: (code: string, index: number) => void;
    errorMsg: string;
}

export interface Coupon {
    code: string;
    title: string;
    description: string;
    copied?: boolean;
    expirationDate: string;
}


const CouponsPage: React.FC<CouponData> = ({pageIcon, pageDomain, pageSubDomain, isSubDomain, couponsDomain, couponsSubDomain, handleCopy, errorMsg}) => {
    const { t } = useTranslation();

    return (
        <div className="w-96 h-[32rem] flex flex-col p-4 pt-2">
                <h2 className="text-lg font-semibold pb-2 mb-2 text-primary text-center border-border border-b-2">
                    { t('Coupons') }
                </h2>
            {errorMsg ? (
                <p className="text-sm text-center text-red-500 dark:text-red-300">
                    {t(errorMsg)}
                </p>
            ) : (
                <>
                    <CouponsEntry
                        pageIcon={pageIcon}
                        pageDomain={pageDomain}
                        couponsDomain={couponsDomain}
                        handleCopy={handleCopy} />
                    {isSubDomain && (
                        <CouponsEntry
                            pageIcon={pageIcon}
                            pageDomain={pageSubDomain}
                            couponsDomain={couponsSubDomain}
                            handleCopy={handleCopy} />
                    )}
                </>
            )}
            <div className="flex items-center absolute top-1 right-1">
                <ThemeToggle />
                <LanguageSwitcher />
            </div>
        </div>
    );
}

export default CouponsPage;