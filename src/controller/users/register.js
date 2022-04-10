import User from "@models-users/user"

export default async(req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
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
            const newUser = new User({
                user: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            try {
                await newUser.save();
                res.send({
                    status: true,
                    message: "Register Successfully",
                    req: req.body
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