import { useRouter } from "next/router";
import React, { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import MainNav1 from "./MainNav1";
import MainNav2 from "./MainNav2";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    const [isTop, setisTop] = useState(true);
    const [scrollY, setScrollY] = useState(0);
    const router = useRouter();

    function logit() {
        setScrollY(window.scrollY);
    }

    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", logit);
        }
        watchScroll();

        if (scrollY > 20) {
            setisTop(false);
        } else {
            setisTop(true);
        }

        return () => {
            window.removeEventListener("scroll", logit);
        };
    }, [scrollY]);

    return (
        <div
            id="nc-chifis-header"
            className={`${
                isTop
                    ? "bg-transparent dark:bg-slate-900"
                    : "bg-gray-50/80 dark:bg-slate-900 shadow-sm backdrop-blur-md "
            } ${
                router.pathname === "/" ? "fixed" : "relative"
            } top-0 z-40 w-full transition-all  duration-200 ease-in-out `}
        >
            <MainNav2 isTop={isTop} />
        </div>
    );
};

export default Header;
