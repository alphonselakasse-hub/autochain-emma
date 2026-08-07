const cron = require('node-cron');
const pool = require('../config/db');

function initAlertCron() {
  // Exécute la vérification toutes les heures
  cron.schedule('0 * * * *', async () => {
    try {
      console.log('🔄 [CRON] Vérification des alertes véhicules...');
      
      // Exemple de requête SQL de vérification
      const queryText = 'SELECT * FROM cars WHERE status = $1';
      // const res = await pool.query(queryText, ['pending']);

    } catch (err) {
      console.error('[CRON ERROR]', err);
    }
  });

  console.log('✅ Job d\'alertes (Cron) initialisé avec succès.');
}

module.exports = initAlertCron;