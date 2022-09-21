import prisma from "lib/prisma";
import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    type ConfigVideo {
        id: Int
        title: String
        idUrl: String
        thumbnail: String
        cityId: Int
        state: Boolean
    }

    type Query {
        getConfigHomeVideos: [ConfigVideo]
    }
`;

export const resolvers = {
    Query: {
        getConfigHomeVideos: async (_, arg) => {
            try {
                const configVideos = await prisma.configHomeVideos.findMany({})
                return configVideos;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    }
}