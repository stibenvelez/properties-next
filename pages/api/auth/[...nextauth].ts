import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "lib/prisma";
import { compare } from "bcrypt";
import generateJWT from "lib/generatejwt";
import { useTransform } from "framer-motion";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export const authOptions: NextAuthOptions = {
    secret: process.env.SECRET,

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "jsmith@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any, req) {
                const User = await prisma.users.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                    include: {
                        role: true,
                    },
                });

                if (!User) {
                    throw new Error("El usuario no existe");
                }
                const passwordCorrect = await compare(
                    credentials?.password,
                    User.password
                );

                if (!passwordCorrect) {
                    const error = new Error("contraseña incorrecta");
                    throw error;
                }
                const {
                    idUser,
                    firstName,
                    lastName,
                    email,
                    idRole,
                    role,
                    confirmed,
                } = User;
                return {
                    idUser,
                    firstName,
                    lastName,
                    email,
                    idRole,
                    role,
                    confirmed,
                };
            },
        }),
    ],
    jwt: {
        async encode({ secret, token }) {
            return jwt.sign(token, secret);
        },
        async decode({ secret, token }) {
            return jwt.verify(token, secret);
        },
    },
    callbacks: {
        session: ({ session, token }) => ({ ...session, ...token }),
        jwt: ({ token, user }) => {
            return { ...token, ...user };
        },
        authorized: ({ token }) => !!token,
    },
};

export default NextAuth(authOptions);
