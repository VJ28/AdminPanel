const MentorModel = require("../../models/mongoose/mentor");
exports.create = async function(req, res) {
  try {
    let mentorModel = new MentorModel({
      name: req.body.name,
      email: req.body.email
    });

    let data = await MentorModel.find({ email: req.body.email });
    if (data.length == 0) {
      let result = await mentorModel.save();
      if (result.errors)
        return res.json({ success: false, error: result.errors });
      return res.json({
        success: true,
        message: "Mentor added successfully",
        result: result
      });
    }
    return res.json({
      success: false,
      message: "Mentor already exist"
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
};
