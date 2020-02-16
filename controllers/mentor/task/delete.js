const MentorModel = require("../../../models/mongoose/mentor");
exports.delete = async function(req, res) {
  try {
    let result = await MentorModel.findOneAndUpdate(
      { email: req.body.email },
      {
        $pull: { Task: { taskId: req.body.taskId } }
      }
    );
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
