import { gql } from "apollo-server-micro";
import prisma from "lib/prisma";

export const typeDefs = gql`
    type Contactme {
        firstName: String
        lastName: String
        email: String
        message: String
        stateId: Int
        createdAt: String
        updatedAt: String
        contactDate: String
        idProperty: Int
        state: StateContact
    }
    input ContactmeInput {
        firstName: String
        lastName: String
        email: String
        message: String
        idProperty: Int
    }
    type StateContact {
        stateId: Int
        state: String
        observations: String
        createdAt: String
        updatedAt: String
    }

    type PayloadCreateContactMe {
        message: String
        succes: Boolean
    }

    type Query {
        getAllContactMe: [Contactme]
    }
    type Mutation {
        createContactMe(input: ContactmeInput): PayloadCreateContactMe
    }
`;

export const resolvers = {
    Query: {
        getAllContactMe: async (_, arg) => {
            try {
                const contactMe = await prisma.contactme.findMany({
                    include: {
                        state: true,
                    },
                });
                return contactMe;
            } catch (error) {
                console.log(error);
            }
        },
    },
    Mutation: {
        createContactMe: async (_, { input }) => {
            try {
                const contactMe = await prisma.contactme.create({data: 
                    input
                });
                return {
                    message: "Contactme Successful",
                    succes: true
                };
            } catch (error) {}
        },
    },
};
