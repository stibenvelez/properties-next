import { useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import {NavLink} from '../../../shared/NavLink'
import Link from "next/link";

const SubMenu = ({ item, showSidebar }) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    const { role } = useSelector(({ auth }) => auth.user); 
    return (
        <>
            <NavLink
                className={`w-full flex items-center justify-between p-5 text-base text-white cursor-pointer hover:bg-indigo-700 hover:border-l-4 hover:pl-4`}
                href={item.path}
                onClick={item.subNav && showSubnav}
            >
                <div>
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                </div>
                <div>
                    {item.subNav && subnav ? (
                        <ChevronUpIcon
                            className="w-5 h-5 ml-2 -mr-1"
                            aria-hidden="true"
                        />
                    ) : item.subNav ? (
                        <ChevronDownIcon
                            className="w-5 h-5 ml-2 -mr-1"
                            aria-hidden="true"
                        />
                    ) : null}
                </div>
            </NavLink>
            {subnav &&
                item.subNav.map((item, index) => {
                    if (item.onlyAdmin && role !== "admin") return null;
                    return (
                        <Link href={item.path} key={index} onClick={showSidebar}>
                            <a className="flex items-center p-5 pl-5 text-white bg-slate-900 hover:bg-slate-600">
                                {item.icon} <span>{item.title}</span>
                            </a>
                        </Link>
                    );
                })}
            
        </>
    );
};

export default SubMenu;
