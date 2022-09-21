import { gql } from "apollo-server-micro";
import generateId from "../../utilities/generateId";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import prisma from "lib/prisma";
import axios from "axios";


const secret = process.env.SECRET;


async function saveSession(user, request) {
    console.log("desde aja", request);
    //request.session.set("user", user);
    //await request.session.save();
}


export const typeDefs = gql`
    scalar DateTime
    type Token {
        token: String
    }
    type Profile {
        id: Int
        phone: Int
        cellPhone: Int
        idCity: Int
        whatsapp: String
        createdAt: DateTime
        updatedAt: DateTime
        createdBy: Int
        idUser: Int
        state: Int
    }
    type Role {
        idRole: Int
        role: String
        State: Boolean
        createdAt: String
        updatedAt: String
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
        profile: Profile
        isLoggedIn: Boolean
    }

    input InputUser {
        firstName: String
        lastName: String
        email: String
        idRole: Int
        password: String
        passwordConfirm: String
    }
    type Query {
        getUsers: [User]
        getUser(token: String!): User
        getProfile(token: String): User
    }

    type Mutation {
        createUser(input: InputUser): User
        login(email: String, password: String): Token
        logout: User
    }
`;

export const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                const users = await prisma.users.findMany({
                    include: {
                        profile: true,
                    },
                });
                return users || [];
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        getUser: async (_, { token }) => {
          
            try {
                const userId = await jwt.verify(token, secret);
                return userId;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        getProfile: async (_, args, ctx) => {

            try {
                const { data } = jwt.verify(args.token, secret);
                return data;
            } catch (error) {
                console.log(error);
                return {
                    message: "Invalid token",
                };
            }
        },
    },
    Mutation: {
        createUser: async (_, { input }) => {
            const { passwordConfirm, ...user } = input;

            try {
                const isExistUser = await prisma.users.findUnique({
                    where: {
                        email: input.email,
                    },
                });

                if (isExistUser) {
                    throw new Error("El usuario ya existe");
                }

                user.token = generateId();
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                const res = await prisma.users.create({ data: user });
                return res;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        login: async (_, args, context) => {
            await axios.post(
                "http://localhost:3000/api/auth/login",
                args 
            );

            return 'ok'
        },
        logout: async (_, args, ctx) => {
            const { propertiesJWT } = ctx.req.cookies;

            if (!propertiesJWT) {
                return res.status(401).json({ error: "Not logged in" });
            }

            try {
                jwt.verify(propertiesJWT, secret);
                const serialized = serialize("propertiesJWT", null, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 0,
                    path: "/",
                });
                ctx.res.setHeader("Set-Cookie", serialized);
                return;
            } catch (error) {
                console.log(error);
            }

            return "Logout successful";
        },
    },
};
