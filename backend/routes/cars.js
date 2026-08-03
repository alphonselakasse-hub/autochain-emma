// Exemple de recherche filtrée
app.get("/cars", async (req, res) => {
  const { brand, minPrice, maxPrice, year } = req.query;
  const query = {};
  if (brand) query.brand = brand;
  if (year) query.year = { $gte: year };
  if (minPrice || maxPrice) query.price = {};
  if (minPrice) query.price.$gte = parseInt(minPrice);
  if (maxPrice) query.price.$lte = parseInt(maxPrice);

  const cars = await Car.find(query);
  res.json(cars);
});
