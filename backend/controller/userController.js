import UserModel from "../models/user.js";
import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken"
const userController = {
    register: async (req, res) => {
        const { username, password } = req.body;

        // Kiểm tra xem người dùng đã tồn tại chưa
        const testUser = await UserModel.findOne({ username });
        if (testUser) {
            return res.status(400).send({
                message: 'Tài khoản đã tồn tại!'
            });
        }

        // Tạo một `profile_id` mới tự động bằng cách tạo một đối tượng `ObjectId`
        try {
            // Tạo muối và băm mật khẩu
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            const newUser = new UserModel({
                username,
                password: hashPassword

            });

            await newUser.save();
            return res.status(201).send({
                message: 'Người dùng đã được tạo thành công',
                user: newUser
            });
        } catch (error) {
            return res.status(500).send({
                message: 'Đã xảy ra lỗi khi tạo người dùng',
                error: error.message
            });
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        const findUser = await UserModel.findOne({ username });
        if (!findUser) {
            return res.status(401).send("Tài khoản hoặc mật khẩu bạn nhập chưa chính xác!");
        }

        const testPass = await bcrypt.compare(password, findUser.password);
        if (!testPass) {
            return res.status(401).send("Tài khoản hoặc mật khẩu bạn nhập chưa chính xác!");
        }

        const SECRET_KEY = process.env.SECRET_KEY;
        const token = jwt.sign({ userId: findUser._id }, SECRET_KEY, { expiresIn: "30s" });

        return res.status(200).send({
            message: "Login is successful",
            token: token
        });
    }
    //
    // logout: async (req, res) => {
    //     res.status(201).send("Đăng xuất thành công!");
    // },
    //
    // getAllUser: async (req, res) => {
    //     try {
    //         const users = await UsersModel.find();
    //         res.status(201).send(users); // Phản hồi thành công
    //     } catch (error) {
    //         res.status(500).send({ message: 'Lỗi máy chủ', error: error.message }); // Phản hồi lỗi
    //     }
    // }
};

export default userController;