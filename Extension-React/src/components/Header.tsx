import Dropdown from "./Dropdown";

const Header: React.FC = () => {

    return (
        <header className="w-[100%] h-[100%] bg-background/90 flex items-center justify-between">
            <div className="w-[100%] p-4 flex items-center justify-between gap-4 flex-rows">
                <div className="flex items-center gap-2">
                    <a href="https://joinsyrup.com" target="_blank"><img className="w-5 h-5 rounded-[5px]" src="/icons/Syrup.png" alt="" /></a>
                    <h1 className="text-xl font-bold">Syrup</h1>
                </div>
                <Dropdown />
            </div>
        </header>
    );
}

export default Header;