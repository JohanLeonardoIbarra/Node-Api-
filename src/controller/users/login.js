import jwt from "jsonwebtoken";
import bCrypt from "bcrypt";
import config from "@src/config";
import User from "@models-users/user";

//Realize a login request to the mongo data base
//Return a token, status, message in case of success
//@params req: request object
//@params res: response object
export default async(req, res) => {
    //Assign the login data to a variable
    const { email, password } = req.body;
    //If some login data is missing return an error
    if (!email || !password) {
        res.send({
            status: false,
            message: "All fields are required"
        });
    } else {
        //Try to find the user in the mongo data base
        try {
            const user = await User.findOne({ email: email });
            //If the user is not found return an error
            if (!user) {
                res.send({
                    status: false,
                    message: "User or Password is incorrect"
                });
            } else {
                //Compare the password with the hash code
                if (!bCrypt.compareSync(password, user.password)) {
                    //If the password is not correct return an error
                    res.send({
                        status: false,
                        message: "User or Password is incorrect"
                    });
                } else {
                    //Create a token for the user in case of success
                    const token = jwt.sign({
                            email: user.email,
                            id: user._id,
                            expiration: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
                        },
                        config.apiKey, {
                            expiresIn: config.tokenExpiration
                        });
                    //Return a token, status, message in case of success
                    res.send({
                        status: true,
                        message: "Login Successfully",
                        token: token
                    });
                }
            }
        } catch (err) {
            //Return an error in case of error on the mongo request
            res.send({
                status: false,
                message: err.message
            });
        }
    }
}