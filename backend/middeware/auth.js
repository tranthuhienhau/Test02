import {token, generateToken} from "../util/jwt.js";
const authMiddeware = {
    verifyMiddeware: async (req, res, next)=>{
        try{
            if (generateToken.length === 0) {
                res.send('Bạn cần đăng nhập để thực hiện hành động!');
            }
            const currentToken = generateToken[0].AT; // Lấy token truy cập hiện tại từ mảng generatedToken
            const currentUser = token.verify(currentToken); // Xác minh token và lấy thông tin của người dùng
            req.currentUser = currentUser;
            next();
        }catch (err){
            res.status(401).send(err)
        }
    }
}
export {authMiddeware}