export default (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        res.send({
            status: false,
            message: "All fields are required"
        });
    }
    res.send({
        status: true,
        message: "Register Successfully"
    });
}