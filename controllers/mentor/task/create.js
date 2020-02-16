const MentorModel = require("../../../models/mongoose/mentor");
exports.create = async function(req, res) {
  try {
    let task = { taskName: req.body.taskName, taskStatus: true };
    let result = await MentorModel.findOne({ email: req.body.email });

    let index =
      result.Task.length > 0
        ? result.Task[result.Task.length - 1].taskId + 1
        : 1;

    result.Task.push({
      ...task,
      taskId: index
    });
    result = await result.save();

    if (result.errors)
      return res.json({ success: false, error: result.errors });
    return res.json({
      success: true,
      message: "Task added successfully",
      result: result
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
};
