const pool = require('../../config/db');

// --- 1. Saisie d'un plein de carburant ---
exports.addFuelLog = async (req, res) => {
  const { vin, driver_id, litres, prix_total, kilometrage } = req.body;

  if (!vin  !litres  !prix_total || !kilometrage) {
    return res.status(400).json({ error: "Tous les champs obligatoires doivent être renseignés." });
  }

  try {
    const result = await pool.query(
      INSERT INTO fuel_logs (vin, driver_id, litres, prix_total, kilometrage)
       VALUES ($1, $2, $3, $4, $5) RETURNING *,
      [vin, driver_id || null, litres, prix_total, kilometrage]
    );

    res.json({ 
      success: true, 
      message: "Plein de carburant enregistré avec succès.",
      log: result.rows[0] 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- 2. Calcul automatique de la consommation moyenne (L/100km) ---
exports.calculateConsumption = async (req, res) => {
  const { vin } = req.params;

  try {
    const result = await pool.query(
      SELECT litres, kilometrage, date_plein 
       FROM fuel_logs 
       WHERE vin = $1 
       ORDER BY kilometrage ASC,
      [vin]
    );

    const logs = result.rows;

    // Il faut au moins 2 relevés pour calculer la distance et la consommation entre deux pleins
    if (logs.length < 2) {
      return res.json({ 
        vin,
        message: "Données insuffisantes. Il faut au moins 2 enregistrements de pleins pour calculer la consommation." 
      });
    }

    // Calcul du total des litres consommés après le premier plein initial
    let totalLitres = 0;
    for (let i = 1; i < logs.length; i++) {
      totalLitres += parseFloat(logs[i].litres);
    }

    // Distance parcourue entre le premier et le dernier plein
    const initialKm = logs[0].kilometrage;
    const finalKm = logs[logs.length - 1].kilometrage;
    const distanceTotal = finalKm - initialKm;

    if (distanceTotal <= 0) {
      return res.status(400).json({ error: "Incohérence dans le kilométrage des pleins enregistrés." });
    }

    // Formule : (Litres totaux / Distance totale en KM) * 100
    const avgConsumption = (totalLitres / distanceTotal) * 100;

    res.json({
      vin,
      premierPleinKm: initialKm,
      dernierPleinKm: finalKm,
      distanceTotaleKm: distanceTotal,
      totalLitresConsommes: totalLitres.toFixed(2),
      consomMoyenneL100km: avgConsumption.toFixed(2)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- 3. Historique des pleins d'un véhicule ---
exports.getFuelLogsByVehicle = async (req, res) => {
  const { vin } = req.params;

  try {
    const result = await pool.query(
      SELECT f.*, u.email as driver_email 
       FROM fuel_logs f 
       LEFT JOIN users u ON f.driver_id = u.id 
       WHERE f.vin = $1 
       ORDER BY f.date_plein DESC,
      [vin]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};