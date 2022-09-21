import { ApolloClient, createHttpLink, from, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import fetch from "node-fetch";
import { createUploadLink } from "apollo-upload-client"

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const httpLink = createHttpLink({
    uri: `${baseUrl}/graphql`,
    fetch
});
const uploadLink = createUploadLink({
    uri: `${baseUrl}/graphql`,
});

const additiveLink = from([
    httpLink
]);

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: additiveLink,
    credentials: "include",
});

export default client;
