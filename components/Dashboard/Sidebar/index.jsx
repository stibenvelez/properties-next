import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";

import { useState } from "react";
import { ChevronRightIcon, MenuIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Logo from "shared/Logo/Logo";

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <aside className="bg-slate-800 hidden sm:block  sm:w-1/3 xl:w-[16rem]  h-screen overflow-hidden sticky top-0">
            <div className="flex justify-center py-6">
                <Logo href="/dashboard" />
            </div>
            <div className=" bg-slate-800">
                {!sidebar && (
                    <button
                        className="fixed left-0 z-50 flex items-center justify-center w-12 h-12 shadow-sm rounded-r-md bg-slate-800 hover:bg-slate-700 top-3 button-3 sm:hidden"
                        onClick={showSidebar}
                    >
                        <Link className="text-white" href="#">
                            <ChevronRightIcon className="w-5 h-5" />
                        </Link>
                    </button>
                )}
                <nav
                    className={` w-full overflow-y-auto flex justify-center transition-all duration-300 sm:relative sm:left-0 fixed ease-in-out ${
                        sidebar ? "left-0" : "-left-full "
                    }`}
                >
                    <div className="w-full ">
                        <div className="flex justify-end p-4 sm:hidden">
                            <XIcon
                                className="h-5 text-white w- hover:text-indigo-500 hover:cursor-pointer "
                                onClick={showSidebar}
                            />
                        </div>
                        <Link href="#">
                            <a className="absolute items-center justify-end text-xl font-bold text-white right-2 top-3 sm:hidden">
                                <XIcon onClick={showSidebar} />
                            </a>
                        </Link>

                        {SidebarData.map((item, index) => {
                            return (
                                <SubMenu
                                    item={item}
                                    key={index}
                                    showSidebar={showSidebar}
                                />
                            );
                        })}
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
