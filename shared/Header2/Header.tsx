import React, { FC } from "react";
import MainNav1 from "./MainNav1";
import { useEffect } from "react";
import { useState } from "react";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    const [isTop, setisTop] = useState(true);
    /*
    useEffect(() => {
        window.onscroll = function () {
            scrollFunction();
        };
    }, []);

    function scrollFunction() {
        const $head = document.getElementById("nc-chifis-header");
        if (!$head) return;
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            !!isTop && setisTop(false);
        } else {
            setisTop(true);
        }
    }
*/
    return (
        <div
            className={`z-50 w-full lg:sticky  lg:top-0 lg:left-0 lg:right-0 h-80 bg-red-800`}
        >sdfdsfsdg</div>
    );
};

export default Header;
