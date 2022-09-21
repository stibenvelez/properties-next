import prisma from "lib/prisma";
import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    scalar Upload
    scalar DateTime
    extend type City {
        _empty: String
    }
    type User {
        idUser: Int
        firstName: String
        lastName: String
        email: String
        idRole: String
        password: String
        token: String
        confirmed: Boolean
        observations: String
        state: Boolean
        createdAt: DateTime
        updatedAt: DateTime
        role: Role
        isLoggedIn: Boolean
    }
    type Property {
        idProperty: Int!
        propertyType: PropertyType
        offerId: Int
        offer: Offer
        title: String!
        description: String
        price: Int!
        saleOff: Int
        area: Int!
        address: String
        building: String
        city: City
        cityId: Int
        neighborhood: String
        stratum: Int
        bedrooms: Int
        antiquityYears: Int
        elevators: Int
        floor: Int
        bathrooms: Int
        garage: Int
        parking: Int
        remodelation: Int
        latitude: Float
        longitude: Float
        lastAdminprice: Int
        contactName: String
        contactEmail: String
        contactPhone: String
        contactCellphone: String
        image1: String
        image2: String
        image3: String
        image4: String
        image5: String
        image6: String
        image7: String
        agent: User
        createdBy: CreateBy
        createdById: Int
        createdAt: DateTime
        updateAt: DateTime
        stateId: Int
        state: PropertyState
        galleryImages: [Image]
    }

    type CreateBy {
        idUser: Int
        firstName: String
        lastName: String
        email: String
        idRole: Int
        password: String
        token: String
        confirmed: Boolean
        observations: String
        state: Boolean
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Offer {
        offerId: Int
        offer: String
        description: String
        createdAt: DateTime
        updateAt: DateTime
        state: Int
    }

    type PropertyType {
        propertyTypeId: Int
        propertyType: String
        stateId: Int
        createdAt: DateTime
    }

    type PropertyState {
        stateId: Int
        state: String
        description: String
    }

    type Image {
        id: Int
        name: String
        url: String
        thumbnail: String
        idProperty: Int
        createdAt: DateTime
    }

    input CreatePropertyInput {
        propertyTypeId: Int
        offerId: Int
        title: String
        description: String
        price: Int
        saleOff: Int
        area: Int
        address: String
        building: String
        cityId: Int
        neighborhood: String
        stratum: Int
        bedrooms: Int
        antiquityYears: Int
        elevators: Int
        floor: Int
        bathrooms: Int
        garage: Int
        parking: Int
        remodelation: Int
        latitude: Float
        longitude: Float
        lastAdminprice: Int
        contactName: String
        contactEmail: String
        contactPhone: String
        contactCellphone: String
        image1: String
        image2: String
        image3: String
        image4: String
        image5: String
        image6: String
        image7: String
        createdById: Int
        stateId: Int
    }
    type CreateUserPayload {
        success: Boolean!
        message: String!
    }

    type Query {
        getProperties(
            city: String
            bedrooms: Int
            offer: String
            minPrice: Int
            maxPrice: Int
            bathrooms: Int
            propertyType: String
            neighborhood: String
        ): [Property]
        getProperty(id: Int!): Property!
        getOffers: [Offer]
    }

    type Mutation {
        createProperty(
            input: CreatePropertyInput
            file: Upload
        ): CreateUserPayload
    }
`;

export const resolvers = {

    Query: {
        getProperties: async (_, args, ctx) => {
            try {
                const properties = await prisma.Properties.findMany({
                    include: {
                        city: true,
                        offer: true,
                        propertyType: true,
                        createdBy: true,
                        state: true,
                        galleryImages: true,
                    },
                    where: {
                        city: { city: { contains: args.city } },
                        bedrooms: args.bedrooms,
                        offer: { offer: { contains: args.offer } },
                        price: {
                            lte: args.maxPrice,
                            gte: args.minPrice,
                        },
                        propertyType: {
                            propertyType: args.propertyType,
                        },
                        bathrooms:
                            args.bathrooms !== 4
                                ? args.bathrooms
                                : { gte: args.bathrooms },
                        neighborhood: { contains: args.neighborhood },
                    },
                    orderBy: [
                        {
                            createdAt: "desc",
                        },
                        {
                            idProperty: "desc",
                        },
                    ],
                });

                return properties;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        getProperty: async (_, { id }) => {
            try {
                const data = await prisma.Properties.findUnique({
                    include: {
                        city: true,
                        offer: true,
                        propertyType: true,
                        createdBy: true,
                        state: true,
                        agent: true,
                        galleryImages: true,
                    },
                    where: {
                        idProperty: id,
                    },
                });

                return data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        getOffers: async () => {
            try {
                const offers = await prisma.offer.findMany({});

                return offers;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
    Mutation: {
        createProperty: async (_, arg, ctx) => {
            try {
                /*
                await prisma.properties.create({
                    data,
                });*/
                console.log(arg);
                return {
                    success: true,
                    message: "Propiedad creada con exito",
                };
            } catch (error) {
                console.log(error);
                return { success: false, message: "Hubo un error" };
            }
        },
    },
};
