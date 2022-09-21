import { withIronSessionApiRoute } from "iron-session/next";
const secret = process.env.SECRET;
export default withIronSessionApiRoute(
    async function user(req, res) {
        const user = req.session.get("user");

        if (user) {
            // in a real world application you might read the user id from the session and then do a database request
            // to get more information on the user if needed
            res.json({
                isLoggedIn: true,
                ...user,
            });
        } else {
            res.json({
                isLoggedIn: false,
            });
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
