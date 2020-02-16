const mongoose = require("mongoose");
const autoincrement = require("mongoose-auto-increment");
let db = require("../../db").getDb();
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskId: Number,
  taskName: String,
  taskStatus: Boolean
});

const MentorSchema = new Schema({
  name: String,
  email: String,
  password: { type: String, default: "123456" },
  Task: [TaskSchema]
});

autoincrement.initialize(db);

MentorSchema.plugin(autoincrement.plugin, {
  model: "mentorCounter",
  field: "mentorId",
  startAt: 1
});

module.exports = mongoose.model("MentorModel", MentorSchema);
