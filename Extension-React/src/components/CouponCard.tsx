import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface Coupon {
    code: string;
    title: string;
    description: string;
    copied?: boolean;
    expirationDate: string;
}

const CouponCard: React.FC<{
    coupon: Coupon;
    onCopy: () => void;
    copied: boolean;
}> = ({ coupon, onCopy, copied }) => (
    <Card className="p-4 pt-2 pb-2 flex justify-between items-center bg-card text-card-foreground">
        <div>
            <p className="font-bold text-card-foreground">{coupon.code}</p>
            <p className="text-sm text-muted-foreground">{coupon.title}</p>
            {coupon.expirationDate && (
                <p className="text-sm text-muted-foreground">
                    Expires: {coupon.expirationDate}
                </p>
            )}
        </div>
        <Button onClick={onCopy} className="bg-accent text-accent-foreground over:bg-primary over:text-primary-foreground">
            {copied ? "Copied!" : "Copy"}
        </Button>
    </Card>
);

export default CouponCard;
