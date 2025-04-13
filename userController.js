// controllers/userController.js
const User = require('../models/user');

exports.getUserDetailsByEmail = async (req, res) => {
  try {
    const user = await User.getUserByEmail(req.params.email);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        // user_id: user.user_id,
        // first_name: user.first_name,
        // last_name: user.last_name,
        // email: user.email,
        // contact_number: user.contact_number,
        // user_type: user.user_type,
        ...user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};