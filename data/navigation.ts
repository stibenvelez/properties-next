import { NavItemType } from "../shared/Navigation/NavigationItem";
import ncNanoId from "../helpers/ncNanoId";

export const NAVIGATION_DEMO: NavItemType[] = [
    {
        id: ncNanoId(),
        href: "/",
        name: "Home",
        isNew: true,
    },
    {
        id: ncNanoId(),
        href: "/venta",
        name: "En venta",
        isNew: false,
    },
    {
        id: ncNanoId(),
        href: "/arriendo",
        name: "En arriendo",
        isNew: false,
    },
    {
        id: ncNanoId(),
        href: "/admin/login",
        name: "Admin",
        isNew: false,
    },
];
