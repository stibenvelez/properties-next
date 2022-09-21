import jwt from "jsonwebtoken";

const generateJWT = (user) => {
    return jwt.sign(user, process.env.SECRET, {
        expiresIn: "30d",
    });
};

export default generateJWT;
