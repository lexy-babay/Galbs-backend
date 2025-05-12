const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/invoiceController');

// POST    /api/invoices
router.post('/invoices', ctrl.createInvoice);

// PUT     /api/invoices/:trackingNumber/status
router.put('/invoices/:trackingNumber/status', ctrl.updateInvoiceStatus);

// GET     /api/invoices
router.get('/invoices', ctrl.getAllInvoices);

module.exports = router;
