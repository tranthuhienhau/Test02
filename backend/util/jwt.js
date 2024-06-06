import dotenv from "dotenv"
import jwt, {decode} from "jsonwebtoken";
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;
const generateToken = [];
const token = {
    generate: (data)=>{
        const newToken = jwt.sign(data, SECRET_KEY, {
            expiresIn: "30m"
        });
        generateToken.push(newToken);
        return newToken;
    },
    verify: (token)=>{
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
        } catch (err) {
            console.error('JWT verification failed:', err.message);
            return null;
        }

    }
}
export {
    token,
    generateToken
}
