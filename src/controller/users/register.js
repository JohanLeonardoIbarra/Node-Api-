import User from "@models-users/user"
import bCrypt from "bcrypt"
import config from "@src/config";
import jwt from "jsonwebtoken";

export default async(req, res) => {
    const { user, email, password, confirmPassword } = req.body;
    if (!user || !email || !password || !confirmPassword) {
        res.send({
            status: false,
            message: "All fields are required"
        });
    } else {
        if (password !== confirmPassword) {
            res.send({
                status: false,
                message: "Passwords do not match"
            });
        } else {
            const hash = bCrypt.hashSync(password, 10);
            const newUser = new User({
                user: user,
                email: email,
                password: hash
            });
            try {
                await newUser.save();
                const token = jwt.sign({
                        email: newUser.email,
                        id: newUser._id,
                        expiration: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
                    },
                    config.apiKey, {
                        expiresIn: config.tokenExpiration
                    });
                res.send({
                    status: true,
                    message: "Register Successfully",
                    token: token
                });
            } catch (err) {
                res.send({
                    status: false,
                    message: err.message
                });
            }
        }
    }
}