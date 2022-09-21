import React, { FC } from "react";
import Logo from "../../shared/Logo/Logo";
import MenuBar from "../../shared/MenuBar/MenuBar";
import SwitchDarkMode from "../../shared/SwitchDarkMode/SwitchDarkMode";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import CurrencyDropdown from "./CurrencyDropdown";
import DropdownTravelers from "./DropdownTravelers";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getSession, useSession } from "next-auth/react";

export interface MainNav2Props {
    isTop: boolean;
}

const MainNav2: FC<MainNav2Props> = ({ isTop }) => {
    const { auth } = useSelector(({ auth }: any) => auth);
    const { data: session, status } = useSession();
    console.log(status);
    return (
        <div
            className={`nc-MainNav1 w-full relative z-10 ${
                isTop ? "onTop " : "notOnTop backdrop-filter"
            }`}
        >
            <div className="container relative flex items-center justify-between py-5 mx-auto space-x-4 xl:space-x-8">
                <div className="flex items-center justify-start flex-grow space-x-3 sm:space-x-8 lg:space-x-10">
                    <Logo />
                    <div className="hidden h-10 border-l sm:block border-neutral-300 dark:border-neutral-500"></div>
                    {/* <div className="hidden sm:block">
                      <DropdownTravelers />
                  </div> */}
                </div>
                <div className="flex items-center justify-end flex-shrink-0 space-x-1 text-neutral-700 dark:text-neutral-100">
                    <div className="items-center hidden gap-4 space-x-1 lg:flex">
                        <Link href="/properties/venta">
                            <a className="font-semibold hover:text-primary-600 text-neutral">
                                Buscador
                            </a>
                        </Link>
                        <Link href="/dashboard">
                            <a className="font-semibold hover:text-primary-600 text-neutral">
                                Dashboard
                            </a>
                        </Link>

                        <Link href="/add-listing-1">
                            <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 border rounded-full text-opacity-90 border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-300 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                Favoritos
                            </a>
                        </Link>
                        <SwitchDarkMode />
                        <div>
                            {status === "authenticated" ? (
                                <div className="flex items-center gap-2">
                                    <NotifyDropdown />
                                    <AvatarDropdown />
                                </div>
                            ) : (
                                <Link href="/login">
                                    <a className="px-4 py-2 transition duration-200 ease-in-out rounded outline-primary-600 outline outline-2 hover:bg-primary-600 text-primary-600 hover:text-white">
                                        Ingresar
                                    </a>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainNav2;
