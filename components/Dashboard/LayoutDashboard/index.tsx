import React, { FC, Fragment, useEffect } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Logo from "../../../shared/Logo/Logo";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { authAction } from "redux/auth/authActions";

interface Props {
    children: JSX.Element;
    container?: boolean;
}

const LayoutDashboard: FC<Props> = ({ children, container = false }) => {
    const dispatch:any = useDispatch();
    useEffect(() => {
      dispatch(authAction())
    }, [])
    
    return (
        <>
            <Head>
                <title>Properties</title>
                <meta
                    name="description"
                    content="The best properties at your fingertips"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex min-h-screen bg-gray-50 ">
                <div className="w-full">
                    <div className="flex min-h-screen w-full">
                        <Sidebar />
                        <div className="w-full">
                            <Navbar />
                            <main>{children}</main>
                        </div>
                    </div>
                </div>  
            </div>
        </>
    );
};

export default LayoutDashboard;
