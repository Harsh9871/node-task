import User from "../models/User.js";
import { hashPassword, comparePassword } from "../config/hash.js";
import { generateToken } from "../config/jwt.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // Accept role from request body

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Set role: If "Admin" is provided, assign Admin role; otherwise, default to "User"
    const userRole = role === "Admin" ? "Admin" : "User";

    // Create user
    const user = await User.create({ name, email, password: hashedPassword, role: userRole });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (!comparePassword(password, user.password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
