import { gql } from "apollo-server-micro";
import prisma from "lib/prisma";

export const typeDefs = gql`
    type Role {
        idRole: Int
        role: String
        state: Boolean
        createdAt: String
        updatedAt: String
    }
    type Query{
        getRoles:[Role]
    }
`;

export const resolvers = {
    Query: {
        getRoles: async () => {
            try {
                const roles = await prisma.roles.findMany({});
                return roles;
            } catch (error) {
                console.log(error);
            }
        },
    },
};
