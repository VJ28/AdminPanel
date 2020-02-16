const MentorModel = require("../../models/mongoose/mentor");
exports.delete = async function(req, res) {
  try {
    let result = await MentorModel.deleteOne({
      name: req.body.name,
      email: req.body.email
    });
    if (result.errors)
      return res.json({ success: false, error: result.errors });
    return res.json({
      success: true,
      message: "Mentor deleted successfully"
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
};
