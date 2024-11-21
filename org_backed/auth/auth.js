import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.CIPHER_KEY);
        const user =  decodedToken;
// console.log('user tkn is', user,auth_user_id)
        req.user = user;

        next();

    } catch (e) {
        res.status(401).json({
            error: "Invalid request",e
        })
    }
}

export default auth