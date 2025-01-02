const Header: React.FC<{ pageIcon: string; pageDomain: string }> = ({
    pageIcon,
    pageDomain,
}) => (
    <div className="flex items-center gap-4 pb-2 mb-2 pt-1 border-border border-b-2">
        <img src={pageIcon} alt="Page Icon" className="w-8 h-8 rounded-full" />
        <p className="text-lg font-bold text-primary">{pageDomain}</p>
    </div>
);

export default Header;
