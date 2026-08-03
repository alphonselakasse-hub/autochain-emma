// Exemple avec Express + JWT
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

const users = []; // stockage temporaire

// Création d’un compte
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed, role });
  res.json({ message: "Utilisateur créé" });
});

// Connexion
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }
  const token = jwt.sign({ username, role: user.role }, "SECRET_KEY");
  res.json({ token });
});

// Middleware de rôle
function authorizeRole(role) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.sendStatus(403);
    const decoded = jwt.verify(token, "SECRET_KEY");
    if (decoded.role !== role) return res.sendStatus(403);
    next();
  };
}
