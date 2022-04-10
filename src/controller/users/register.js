import User from "@models-users/user"
import bCrypt from "bcrypt"
import config from "@src/config";
import jwt from "jsonwebtoken";

//Realize a register request to the mongo data base
//Return a token, status, message in case of success
//@params req: request object
//@params res: response object
export default async(req, res) => {
    //Assing the user data to a variable
    const { user, email, password, confirmPassword } = req.body;
    //If some user data is missing return an error
    if (!user || !email || !password || !confirmPassword) {
        res.send({
            status: false,
            message: "All fields are required"
        });
    } else {
        //If the password and the confirm password are different return an error
        if (password !== confirmPassword) {
            res.send({
                status: false,
                message: "Passwords do not match"
            });
        } else {
            //Create hash code for the password
            const hash = bCrypt.hashSync(password, 10);
            //Create a new user object
            const newUser = new User({
                user: user,
                email: email,
                password: hash
            });
            //Try to save the new user in the mongo data base
            try {
                await newUser.save();
                //Create a token for the new user
                const token = jwt.sign({
                        email: newUser.email,
                        id: newUser._id,
                        expiration: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
                    },
                    config.apiKey, {
                        expiresIn: config.tokenExpiration
                    });
                //Return a token, status, message in case of success
                res.send({
                    status: true,
                    message: "Register Successfully",
                    token: token
                });
            } catch (err) {
                //return an error in case of error on the mongo request
                res.send({
                    status: false,
                    message: err.message
                });
            }
        }
    }
}