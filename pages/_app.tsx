import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider, gql } from "@apollo/client";
import { store } from "../redux";
import client from "lib/apollo";

import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { Provider, useDispatch } from "react-redux";
import { getSession, SessionProvider } from "next-auth/react";
import { useEffect } from "react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {

    useEffect(() => {
        (async () => {
            const session = await getSession();
            console.log("session app", session);
        
        })();
    }, []);
    return (
        <Provider store={store}>
            <SessionProvider session={pageProps.session}>
                <ApolloProvider client={client}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </SessionProvider>
        </Provider>
    );
}

export default MyApp;
