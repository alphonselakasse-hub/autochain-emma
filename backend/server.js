import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Uniquement les imports dont on est sûr à 100%
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/autochain")
  .then(() => console.log("✅ Connecté à MongoDB avec succès"))
  .catch(err => console.error("Erreur MongoDB:", err));

app.get("/", (req, res) => {
  res.send("API AutoChain Fonctionnelle !");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Serveur lance sur le port 5000");
});