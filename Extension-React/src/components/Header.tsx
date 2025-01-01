const Header: React.FC<{ pageIcon: string; pageDomain: string }> = ({
    pageIcon,
    pageDomain,
}) => (
    <div className="flex items-center justify-center gap-2 border-border border-t-2 border-b-2 p-3 mb-3 mt-3">
        <img src={pageIcon} alt="Page Icon" className="w-8 h-8" />
        <h2 className="text-lg font-semibold text-primary-foreground">coupons for</h2>
        <h2 className="text-lg font-bold text-primary-foreground">{pageDomain}</h2>
    </div>
);

export default Header;
