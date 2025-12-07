import User from "../models/userSchema.js";

const bookingMiddleware = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customers can book properties" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default bookingMiddleware;
