import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Coupon } from "@/lib/sas/models.ts";
import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import browser from 'webextension-polyfill';
import { syrupApiClient } from "@/lib/utils";

function round(value: number, precision: number) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

const interpolateColor = (value: number, min: number, max: number): string => {
    const normalized = (value - min) / (max - min);

    const hue = normalized * 120;

    return `hsl(${hue}, 70%, 45%)`;
};

export type FeedbackData = {
    [couponCode: string]: 'up' | 'down';
};

const CouponCard: React.FC<{
    coupon: Coupon;
    onCopy: () => void;
    copied: boolean;
    minScore: number;
    maxScore: number;
}> = ({ coupon, onCopy, copied, minScore, maxScore }) => {
    const { t } = useTranslation();
    const [feedbackGiven, setFeedbackGiven] = useState<'up' | 'down' | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    let score = round(coupon.score, 2);
    const color = interpolateColor(score, minScore, maxScore);
    
    useEffect(() => {
        browser.storage.local.get('feedback').then((data) => {
            const feedbacks = data.feedback as FeedbackData || {};
            if (feedbacks[coupon.code]) {
                setFeedbackGiven(feedbacks[coupon.code]);
            }
        });
    }, [coupon.code]);

    const handleCopy = () => {
        onCopy();
        setShowFeedback(true);
    };
    
    const handleFeedback = (isPositive: boolean) => {
        if (feedbackGiven) return;
        const newFeedback = isPositive ? 'up' : 'down';
        
        setFeedbackGiven(newFeedback);
        
        if (isPositive) {
            syrupApiClient.reportValidCoupon(coupon.code);
        }
        else {
            syrupApiClient.reportInvalidCoupon(coupon.code);
        }
        
        browser.storage.local.get('feedback').then((data) => {
            const feedbacks = data.feedback as FeedbackData || {};
            feedbacks[coupon.code] = newFeedback;
            return browser.storage.local.set({ feedback: feedbacks });
        });
    };

    return (
        <Card className="p-4 pt-2 pb-2 flex justify-between items-center bg-card text-card-foreground">
            <div>
                <p className="text-sm font-bold text-primary">{coupon.code}</p>
                <p className="text-sm text-muted-foreground pr-2">{coupon.title}</p>
                {coupon.score && (
                    <p style={{ color }} className={`text-sm`}>
                        {`Score: ${score}`}
                    </p>
                )}
            </div>
            <div className="flex gap-1">
            {showFeedback ? (
                    <>
                        <Button 
                            onClick={() => handleFeedback(true)}
                            variant="ghost"
                            size="icon"
                            disabled={feedbackGiven !== null}
                            className={`
                                transition-all ease-in-out duration-200 hover:scale-110
                                hover:bg-green-100 hover:dark:bg-green-900/50
                                ${feedbackGiven === 'up' ? 'dark:bg-green-900 disabled:opacity-75' : ''}
                            `}
                        >
                            <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button 
                            onClick={() => handleFeedback(false)}
                            variant="ghost"
                            size="icon"
                            disabled={feedbackGiven !== null}
                            className={`
                                transition-all ease-in-out duration-200 hover:scale-110
                                hover:bg-red-100 hover:dark:bg-red-900/50
                                ${feedbackGiven === 'down' ? 'dark:bg-red-900 disabled:opacity-75' : ''}
                            `}
                        >
                            <ThumbsDown className="h-4 w-4" />
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleCopy} className="bg-primary text-primary-foreground transition-all ease-in-out 
                        duration-200 hover:scale-110 hover:bg-slate-100 hover:dark:bg-slate-100">
                        {copied ? t("Copied!") : t("Copy")}
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default CouponCard;