import { gql } from "apollo-server-micro";
import prisma from 'lib/prisma'

export const typeDefs = gql`
    type City {
        cityId: Int
        city: String
        departament: String
        idDepartament: Int
        region: String
    }
    type Departament {
        idDepartament: Int
        departament: String
    }

    type Query {
        getCities: [City]
        getDepartaments: [Departament]
    }
`;

export const resolvers = {
    Query: {
        getCities: async (_, args) => {
            try {
                const cities = await prisma.cities.findMany({});
                
                return cities;
            } catch (error) {
                console.log(error);

            }
        },
        getDepartaments: async (_, arg) => {
            try {
                const departaments = await prisma.departaments.findMany({});
                return departaments;
            } catch (error) {
                console.log(error);
            }
        },
    },
};
