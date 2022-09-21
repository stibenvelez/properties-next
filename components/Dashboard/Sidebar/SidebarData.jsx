export const SidebarData = [
    {
        title: "Inmuebles",
        path: "#",
        icon: null,
        iconClosed: null,
        iconOpened: null,

        subNav: [
            {
                title: "Mis inmuebles",
                path: "/dashboard/properties",
                icon: null,
                cName: "sub-nav",
            },
            {
                title: "registrar inmueble",
                path: "/dashboard/properties/new-property",
                icon: null,
                cName: "sub-nav",
            },
        ],
    },
    {
        title: "Contactos",
        path: "#",
        icon: null,
        iconClosed: null,
        iconOpened: null,

        subNav: [
            {
                title: "Contactame",
                path: "/dashboard/contact/contact-me-list",
                icon: null,
                cName: "sub-nav",
            },
        ],
    },
    {
        title: "Config",
        path: "#",
        icon: null,
        iconClosed: null,
        iconOpened: null,

        subNav: [
            {
                title: "Usuarios",
                path: "/dashboard/users",
                icon: null,
                onlyAdmin: false,
            },
        ],
    },
];
