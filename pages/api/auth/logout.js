import { serialize } from "cookie";
import { withIronSessionApiRoute } from "iron-session/next";
import bcrypt from "bcryptjs";
import prisma from "lib/prisma";

const secret = process.env.SECRET;

export default withIronSessionApiRoute(
    async function login(req, res) {
        if (req.method === "POST") {
 
            req.session.destroy();
       


        }
        res.json({ msg: "logout ok" });
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
