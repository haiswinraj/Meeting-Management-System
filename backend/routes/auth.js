const router = require("express").Router();
const User = require("../models/User")

//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
   
});


router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({username: req.body.username});

        !user && res.status(401).json("Wrong credentials");

        user.password !== req.body.password && res.status(401).json("Wrong credentials");

        res.status(201).json(user);

    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;