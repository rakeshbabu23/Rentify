const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, role } =
      req.body;
    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      password,
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: savedUser._id, role: user.role },
      process.env.JWT_SECRET
    );
    // Return success response with JWT token
    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
      token,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }

    // Handle duplicate key errors (e.g., unique email constraint)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or phone number is already registered" });
    }

    // Handle other errors
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token: token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
