const MentorModel = require("../../models/mongoose/mentor");
exports.get = async function(req, res) {
  try {
    let result = await MentorModel.find({
      email: req.body.email
    });
    if (result.errors)
      return res.json({ success: false, error: result.errors });
    return res.json({
      success: true,
      message: "Mentor added successfully",
      result: result
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
};

exports.getAll = async function(req, res) {
  try {
    let result = await MentorModel.find({});
    if (result.errors)
      return res.json({ success: false, error: result.errors });
    return res.json({
      success: true,
      result: result
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
};
