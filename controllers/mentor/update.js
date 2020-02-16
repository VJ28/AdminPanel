const MentorModel = require("../../models/mongoose/mentor");
exports.update = async function(req, res) {
  try {
    let result = await MentorModel.updateOne(
      { email: req.body.email },
      {
        name: req.body.name,
        email: req.body.email
      }
    );
    if (result.errors)
      return res.json({ success: false, error: result.errors });
    return res.json({
      success: true,
      message: "Mentor updated successfully"
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
};
