import { serialize } from "cookie";
import { withIronSessionApiRoute } from "iron-session/next";
import bcrypt from "bcryptjs";
import prisma from "lib/prisma";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";

const secret = process.env.SECRET;

export default withIronSessionApiRoute(
    async function login(req, res) {
        if (req.method === "POST") {

            const { email, password } = req.body;
            try {
                const User = await prisma.users.findUnique({
                    where: {
                        email: email,
                    },
                    include: {
                        role: true,
                    },
                });

                if (!User) {
                    throw new Error("El usuario no existe");
                }

                const passwordCorrect = await bcrypt.compare(
                    password,
                    User.password
                );

                if (!passwordCorrect) {
                    const error = new Error("contraseña incorrecta");
                    throw error;
                }

                // valid confirm
                /*
        if (!rows[0].confirmed) {
            const error = new Error("El usuario no está confirmado");
            throw error;
        }

       
        const token = generateJWT({
            idUser: User.idUser,
            firstName: User.firstName,
            lastName: User.lastName,
            email: User.email,
            role: User.role,
        });

        const serialized = serialize("propertiesJWT", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/",
        });
*/
                //context.res.setHeader("Set-Cookie", serialized);
                req.session.user = {
                    idUser: User.idUser,
                    firstName: User.firstName,
                    lastName: User.lastName,
                    email: User.email,
                    role: User.role,
                };
                //await req.session.save();
                  const session = await unstable_getServerSession(
                      req,
                      res,
                      authOptions
                );
                console.log(session);
                res.json({ msg: "ok" });
            } catch (error) {
                console.log(error);
                res.status(400).json({ msg: "hubo un error" });
                return error;
            }
        } else {
            // Handle any other HTTP method
        }
    },
    {
        cookieName: "properties-session",
        password: secret,
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    }
);
