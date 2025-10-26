import jwt from "jsonwebtoken";
import redisClient from "../services/redisService.js";



export const authUser = async (req, res, next) => {
    try {

        let token = req.cookies?.token;

        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1]; // Expecting "Bearer <token>"
        }

        if (!token) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }

        const isLoggedOut = await redisClient.get(token);
        if (isLoggedOut) {
            res.cookie('token', '');
            return res.json({ success: false, message: 'Token is invalidated. Please login again.' });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = token_decode;

        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};

export default { authUser };
