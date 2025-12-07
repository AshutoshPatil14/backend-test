import User from "../models/userSchema.js";

const propertyMiddleware = async (req, res, next) => {
  try {
    const { title, location, pricePerNight, ownerId } = req.body;

    if (!title || !location || !pricePerNight || !ownerId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    if (owner.role !== "owner") {
      return res
        .status(403)
        .json({ message: "Only owners can create properties" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default propertyMiddleware;
