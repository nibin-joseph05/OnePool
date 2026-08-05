const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message,
    });

  }
};

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await authService.login(
      email,
      password
    );

    res.json({
      success: true,
      message: "Login successful",
      data: result,
    });

  } catch (err) {

    res.status(401).json({
      success: false,
      message: err.message,
    });

  }

};

const profile = async (req, res) => {

    const user = req.user.toJSON();

    delete user.password;

    res.json({
        success: true,
        data: user,
    });

};

module.exports = {
  register,
  login,
  profile,
};