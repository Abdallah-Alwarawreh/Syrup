import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Coupon } from "@/lib/sas/models.ts";

function round(value: number, precision: number) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

const interpolateColor = (value: number, min: number, max: number): string => {
    const normalized = (value - min) / (max - min);

    const hue = normalized * 120;

    return `hsl(${hue}, 70%, 45%)`;
};

const CouponCard: React.FC<{
    coupon: Coupon;
    onCopy: () => void;
    copied: boolean;
    minScore: number;
    maxScore: number;
}> = ({ coupon, onCopy, copied, minScore, maxScore }) => {
    const { t } = useTranslation();
    const score = round(coupon.score, 2);
    const color = interpolateColor(score, minScore, maxScore);

    return (
        <Card className="p-4 pt-2 pb-2 flex justify-between items-center bg-card text-card-foreground">
            <div>
                <p className="text-sm font-bold text-primary">{coupon.code}</p>
                <p className="text-sm text-muted-foreground">{coupon.title}</p>
                {coupon.score && (
                    <p style={{ color }} className={`text-sm`}>
                        {`Score: ${score}`}
                    </p>
                )}
            </div>
            <Button onClick={onCopy} className="bg-primary text-primary-foreground">
                {copied ? t("Copied!") : t("Copy")}
            </Button>
        </Card>
    );
};

export default CouponCard;
