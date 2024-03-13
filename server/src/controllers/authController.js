const UserModel = require("../models/userModel");
const bcryp = require('bcrypt');
const asynHandle = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: 'hoangvanhiep12bbm@gmail.com',
        pass: 'ltnamfgfpbanxsgl',
    },
});


const getJsonWebToken = async (email, id) => {
    const payload = {
        email, id
    }

    const token = jwt.sign(payload, `hoanghiep`, {
        expiresIn: '7d',
    });

    return token;
};

const handleSendMail = async (val) => {

    // gửi mail
    try {
        await transporter.sendMail(val);

        return 'OK';
    } catch (error) {
        return error;
    }
};

const verification = asynHandle(async (req, res) => {
    const { email } = req.body;

    const verificationCode = Math.round(1000 + Math.random() * 9000);

    try {

        const data = {
            from: `DatLich_FPT_APP <hoangvanhiep12bbm@gmail.com>`,
            to: email,
            subject: 'Verification email code',
            text: 'Your code to verification email',
            html: `<h1>${verificationCode}</h1>`,//html body
        };

        await handleSendMail(data);

        res.status(200).json({
            message: 'Send verification code successfully!!!',
            data: {
                code: verificationCode,
            },
        });
    } catch (error) {
        res.send(401);
        throw new Error('Can not send email');
    }
});

const register = asynHandle(async (req, res) => {

    const { email, fullname, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        res.status(400);
        throw new Error('Tài khoản đã tồn tại');
    }

    // mã hóa mật khẩu
    const salt = await bcryp.genSalt(10);
    const hasedPassword = await bcryp.hash(password, salt);

    const newUser = new UserModel({
        email,
        fullname: fullname ?? 'User',
        password: hasedPassword,
    });

    await newUser.save();

    res.status(200).json({
        message: 'Register new user successfully',
        data: {
            email: newUser.email,
            id: newUser.id,
            accesstoken: await getJsonWebToken(email, newUser.id),
        },
    });
});

const login = asynHandle(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
        res.status(403).json({
            message: 'Tài khoản không tìm thấy!!!',
        });

        throw new Error('Tài khoản không tìm thấy!!!');
    }

    const isMatchPassword = await bcryp.compare(password, existingUser.password);
    if (!isMatchPassword) {
        res.status(401)
        throw new Error('Email hoặc mật khẩu không đúng');
    }
    res.status(200).json({
        message: 'Đăng nhập thành công',
        data: {
            id: existingUser.id,
            email: existingUser.email,
            accesstoken: await getJsonWebToken(email, existingUser.id),
        },
    });
});

const forgotPassword = asynHandle(async (req, res) => {
    const { email } = req.body

    const randomPassword = Math.round(100000 + Math.random() * 99000);

    const data = {
        from: `New Password <hoangvanhiep12bbm@gmail.com>`,
        to: email,
        subject: 'Verification email code',
        text: 'Your code to verification email',
        html: `<h1>${randomPassword}</h1>`,//html body
    };

    const user = await UserModel.findOne({ email })
    if (user) {

        const salt = await bcryp.genSalt(10);
        const hasedPassword = await bcryp.hash(`${randomPassword}`, salt);

        await UserModel.findByIdAndUpdate(user._id, {
            password: hasedPassword,
            isChangePassword: true
        })
            .then(() => {
                console.log('Done')
            })
            .catch((error) => console.log(error));

        await handleSendMail(data)
            .then(() => {
                res.status(200).json({
                    message: 'Send email new password successfully!!!',
                    data: []
                });
            })
            .catch((error) => {
                res.status(401)
                throw new Error('Can not send email!');
            });

    } else {
        res.status(401)
        throw new Error('User not found!!!');
    }
});

const handleLoginWithGoogle = asynHandle(async (req, res) => {
    const userInfo = req.body;

    const existingUser = await UserModel.findOne({ email: userInfo.email });

    let user = { ...userInfo }

    if (existingUser) {
        await UserModel.findByIdAndUpdate(existingUser.id, { ...userInfo, updateAt: Date.now() }),
            user.accesstoken = await getJsonWebToken(userInfo.email, userInfo.id)
    } else {
        const newUser = new UserModel({
            email: userInfo.email,
            fullname: userInfo.name,
            ...userInfo,
        });
        await newUser.save();

        user.accesstoken = await getJsonWebToken(userInfo.email, newUser.id)

    }

    res.status(200).json({
        message: 'Login with google successfully',
        data: user,
    });
});
module.exports = {
    register,
    login,
    verification,
    forgotPassword,
    handleLoginWithGoogle
};