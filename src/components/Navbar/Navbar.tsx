import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/quiz-2.jpg";
import ButtonPrimary from "../Button/ButtonPrimary";
import { List, X } from "react-bootstrap-icons";
import NavLinks from "./NavLinks";
import Username from "./Username";
import GroupButtonsNavbar from "./GroupButtonsNavbar";

export default function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const location = useLocation();

    return (
        <>
            {location.pathname.startsWith("/dashboard" ) && (
                <nav className="w-full h-16 flex justify-between z-20 p-4 bg-stone-950 text-white md:px-16 lg:px-32 sticky top-0">
                    {/** Logo main */}
                    <Link
                        to="/"
                        className="flex items-center h-full cursor-pointe text-2xl font-light gap-4 text-white hover:text-white hover:no-underline"
                    >
                        <img src={logo} alt="" className="w-8 h-8" />
                        <span>Quizz Wave</span>
                    </Link>

                    <ButtonPrimary
                        className="cursor-pointer w-8 h-8 text-slate-300 block md:hidden bg-transparent hover:bg-transparent p-0"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        <List className="w-full h-full" />
                    </ButtonPrimary>

                    <div className="hidden md:flex items-center gap-4">
                        <Username />
                        <GroupButtonsNavbar />
                    </div>
                    {/** Menu --- lo muestro si un usuario esta autenticado  */}

                    <Sidebar
                        showSidebar={showSidebar}
                        setShowSidebar={setShowSidebar}
                    />
                </nav>
            )}
        </>
    );
}

const Sidebar = ({
    showSidebar,
    setShowSidebar,
}: {
    showSidebar: boolean;
    setShowSidebar: (state: boolean) => void;
}) => {
    return (
        <aside
            className={`flex flex-col gap-8 text-white bg-stone-950 w-full h-screen md:h-[calc(100vh-4rem)] transition-all duration-1000 ease-in-out fixed top-0 md:top-16 ${
                showSidebar ? "left-0" : "-left-full md:left-0"
            } ${showSidebar ? "md:w-52" : "md:w-16"}`}
        >
            {/** Botón Open/Close */}
            <div className="flex justify-end p-4">
                <div
                    className="cursor-pointer w-8 h-8"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    <X className="w-full h-full block md:hidden" />
                    {showSidebar ? (
                        <X className="w-full h-full hidden md:block" />
                    ) : (
                        <List className="w-full h-full hidden md:block" />
                    )}
                </div>
            </div>

            <div className="h-full flex flex-col justify-between">
                {/** Items */}
                <NavLinks
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                />

                {/** Buttons Login/Register */}
                {showSidebar && (
                    <div className="flex flex-col gap-4 md:hidden md:gap-2 px-12 pt-4 pb-12 md:p-4">
                        <Username />
                        <GroupButtonsNavbar />
                    </div>
                )}
            </div>
        </aside>
    );
};
