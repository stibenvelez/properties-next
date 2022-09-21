import { ApolloServer } from "apollo-server-micro";
import { typeDefs, resolvers } from "./schemas";
import micro_cors from "micro-cors";
import jwt from 'jsonwebtoken'

const cors = micro_cors();

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({req, res}),
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }
    await startServer;

    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
});

export const config = {
    api: {
        bodyParser: false,
    },
};
