import {updateUserProfile} from '../services/userService.js';

export const updateUser = async (req, res) => {
  try {
    const userData = { ...req.body };

    if (req.file) {
      userData.photo = req.file.filename;
    }

    const result = await updateUserProfile(req.user.userId, userData);

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: result.id,
        email: result.email,
        username: result.username,
        photo: result.photo,
        updatedAt: result.updatedAt,
      },
    });                         
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};