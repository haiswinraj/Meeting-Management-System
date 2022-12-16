const router = require("express").Router();
const Meeting = require("../models/Meeting")

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));

//1. Show all meetings
router.get("/all", async (req, res) => {
    try {
        const user = await Meeting.find({});

        res.status(201).json(user);

    } catch(err) {
        res.status(500).json(err);
    }
});

//2. Create new meeting
router.post("/create",  async (req, res) => {
    const newMeeting = new Meeting({
        name: req.body.name,
        location: req.body.location,
        date: req.body.date
    });

    try {
        const savedMeeting = await newMeeting.save();
        res.status(201).json(savedMeeting);

    } catch(err) {
        res.status(500).json(err);
    }
});

//3. Update Meeting

router.delete("/delete/:id", async (req, res) => {
    try{
        const meetings = await Meeting.findByIdAndDelete(req.params.id);
        res.status(201).json(meetings);
        
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router