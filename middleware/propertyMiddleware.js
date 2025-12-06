const propertyMiddleware = (req, res, next) => {
  const { title, location, pricePerNight, ownerId, amenities } = req.body;

  if (!title || !location || !pricePerNight || !ownerId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  next();
};

export default propertyMiddleware;
