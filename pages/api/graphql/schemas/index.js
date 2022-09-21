import { gql } from "apollo-server-micro";
import {
    typeDefs as Property,
    resolvers as PropertyResolvers,
} from "./property";
import { typeDefs as User, resolvers as UserResolvers } from "./user";
import { typeDefs as City, resolvers as CityResolver } from "./city";
import { typeDefs as Config, resolvers as ConfigResolvers } from "./config";
import { typeDefs as Roles, resolvers as RolesResolvers } from "./roles";
import {
    typeDefs as ContactMe,
    resolvers as ContactMeResolvers,
} from "./contact";
import { GraphQLDateTime } from "graphql-iso-date";

const customScalarResolver = {
    DateTime: GraphQLDateTime,
};

const rootTypeDef = gql`
    type Query {
        _: String
    }
`;
export const resolvers = [
    PropertyResolvers,
    UserResolvers,
    CityResolver,
    ConfigResolvers,
    RolesResolvers,
    ContactMeResolvers,
    customScalarResolver
];

export const typeDefs = [
    rootTypeDef,
    Property,
    User,
    City,
    Config,
    Roles,
    ContactMe,
];
