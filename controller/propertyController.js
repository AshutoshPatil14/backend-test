import Property from "../models/propertySchema.js";

export const createProperty = async (req, res) => {
  const { title, location, pricePerNight, ownerId } = req.body;

  try {
    const property = new Property({ title, location, pricePerNight, ownerId });
    await property.save();
    res.status(201).json({ message: "Property created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
