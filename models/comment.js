const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const CommentSchema = new Schema({
  timeStamp: { type: Number, required: true },
  content: { type: String, required: true },
  session: { type: Schema.Types.ObjectId, ref: "Session" },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  authorName: { type: String, required: true }
});

// Always populate the author field
CommentSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

module.exports = mongoose.model("Comment", CommentSchema);
