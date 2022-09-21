import { gql, useQuery } from "@apollo/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React, { useEffect } from "react";
import LayoutDashboard from "../../components/Dashboard/LayoutDashboard";
import useUser from "../../lib/useUser";

import { getSession, useSession } from "next-auth/react";
import { withIronSessionSsr } from "iron-session/next/dist";
import { withSessionSsr } from "lib/whitSession";

const DashboardPage = () => {
    useEffect(() => {
        (async () => {
            const session = await getSession();
            console.log('session',session);
        })();
    }, []);

    return (
        <LayoutDashboard>
            <h1 className="font-bold text-4xl text-gray-700">Dashboard</h1>
        </LayoutDashboard>
    );
};

export default DashboardPage;

/*
export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }: any) {
        const user: any = req.session.user;
        console.log('--user', user)
        if (user?.role?.role !== "admin") {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }

        return {
            props: {
                user: user,
            },
        };
    }
);

*/
