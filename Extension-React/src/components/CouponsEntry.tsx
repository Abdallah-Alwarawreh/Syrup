import Header from "./Header";
import CouponsList from "./CouponsList";

export interface CouponData {
    pageIcon: string;
    pageDomain: string;
    couponsDomain: Coupon[] | null;
    handleCopy: (code: string, index: number) => void;
}

export interface Coupon {
    code: string;
    title: string;
    description: string;
    copied?: boolean;
    expirationDate: string;
}

const CouponsEntry: React.FC<CouponData> = ({pageIcon, pageDomain, couponsDomain, handleCopy}) => {

    return (
        <div className="h-[60vh] flex flex-col pt-2">
            <Header pageIcon={pageIcon} pageDomain={pageDomain} />
            <CouponsList
                coupons={couponsDomain}
                handleCopy={handleCopy} />
        </div>
    );
}

export default CouponsEntry;