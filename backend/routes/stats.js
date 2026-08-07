// Exemple simple avec MongoDB
import mongoose from "mongoose";

const StatSchema = new mongoose.Schema({
  action: String,
  user: String,
  timestamp: { type: Date, default: Date.now }
});

const Stat = mongoose.model("Stat", StatSchema);

// Log d’une action
async function logAction(action, user) {
  await Stat.create({ action, user });
}

// Récupération des stats
app.get("/stats", async (req, res) => {
  const stats = await Stat.find();
  res.json(stats);
});
