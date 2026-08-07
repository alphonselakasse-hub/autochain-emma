const express = require('express');
const router = express.Router();
const multer = require('multer');
const documentController = require('../controllers/documentController');
const fuelController = require('../controllers/fuelController');
const upload = multer({ dest: 'uploads/' });
// Routes Documents
router.post('/documents/upload', upload.single('file'),
documentController.uploadDocument);
router.post('/documents/verify', upload.single('file'),
documentController.verifyDocumentIntegrity);
router.get('/documents/:vin', documentController.getVehicleDocuments);
// Routes Carburant & Consommation
router.post('/fuel', fuelController.addFuelLog);
router.get('/fuel/consumption/:vin', fuelController.calculateConsumption);
module.exports = router;