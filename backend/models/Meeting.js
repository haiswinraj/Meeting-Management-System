const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const MeetingSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    location: { type: String, required: true, unique: true},
    date: { type: String, required: true, unique: true}
});

module.exports = mongoose.model("Meeting", MeetingSchema);