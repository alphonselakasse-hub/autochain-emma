const fs = require('fs');
const crypto = require('crypto');
const pool = require('../config/db');
 const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
   const result = await pool.query(
     `INSERT INTO documents (vin, type_doc, file_path, file_hash, ipfs_cid)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
     [vin, type_doc, filePath, fileHash, ipfs_cid || null]
   );
   res.json({ success: true, document: result.rows[0], computedHash: `0x${fileHash}`
});
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
};
exports.verifyDocumentIntegrity = async (req, res) => {
 const { document_id } = req.body;
 if (!req.file) return res.status(400).json({ error: "Fichier à vérifier manquant" });
 const uploadedFilePath = req.file.path;
 try {
   const dbRes = await pool.query('SELECT file_hash FROM documents WHERE id = $1',
[document_id]);
   if (dbRes.rows.length === 0) return res.status(404).json({ error: "Document non
trouve" });
   const originalHash = dbRes.rows[0].file_hash;
   const currentBuffer = fs.readFileSync(uploadedFilePath);
   const currentHash = crypto.createHash('sha256').update(currentBuffer).digest('hex');
   fs.unlinkSync(uploadedFilePath);
   if (originalHash === currentHash) {
     res.json({ isValid: true, message: "Document authentique et conforme." });
   } else {
     res.status(400).json({ isValid: false, message: "Alerte : Fichier altéré ou
corrompu !" });
   }
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
};
exports.getVehicleDocuments = async (req, res) => {
 const { vin } = req.params;
 try {
   const result = await pool.query('SELECT * FROM documents WHERE vin = $1', [vin]);
   const pool = require('../config/db');
exports.addFuelLog = async (req, res) => {
 const { vin, driver_id, litres, prix_total, kilometrage } = req.body;
 try {
   const result = await pool.query(
     `INSERT INTO fuel_logs (vin, driver_id, litres, prix_total, kilometrage)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
     [vin, driver_id, litres, prix_total, kilometrage]
   );
   res.json({ success: true, log: result.rows[0] });
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
};
exports.calculateConsumption = async (req, res) => {
 const { vin } = req.params;
 try {
   const result = await pool.query(
     `SELECT litres, kilometrage FROM fuel_logs WHERE vin = $1 ORDER BY kilometrage
ASC`,
     [vin]
   );
   const logs = result.rows;
   if (logs.length < 2) {
     return res.json({ message: "Donnees insuffisantes pour calculer la consommation
moyenne." });
   }
   let totalLitres = 0;
   for (let i = 1; i < logs.length; i++) {
     totalLitres += parseFloat(logs[i].litres);
   }
   const distanceTotal = logs[logs.length - 1].kilometrage - logs[0].kilometrage;
   const avgConsumption = (totalLitres / distanceTotal) * 100;
   res.json({ vin, distanceKm: distanceTotal, avgL100km: avgConsumption.toFixed(2) });
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
};