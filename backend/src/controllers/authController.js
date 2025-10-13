import { signupUser, loginUser } from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const userData = { ...req.body };

    if (req.file) {
      userData.photo = req.file.filename;
    }

    const result = await signupUser(userData);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: result.id,
        email: result.email,
        username: result.username,
        photo: result.photo,
      },
      token: result.token,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const credentials = { ...req.body };

    const result = await loginUser(credentials);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: result.id,
        email: result.email,
        username: result.username,
        photo: result.photo,
      },
      token: result.token,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
