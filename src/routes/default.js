import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    let salida = {
        message: "Hey There!!"
    }
    res.send(salida);
});

export default router;