const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  createdAt: { type: Date },
  sessionName: {type: String, required: true},
  videoUrl: {type: String, required: true},
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  userNames: [{ type: String, required: false }], // maybe unnecessary
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

module.exports = mongoose.model("Session", SessionSchema);
