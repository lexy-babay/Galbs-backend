// routes/invoiceRoutes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/invoiceController');

// POST   /api/invoices
router.post('/invoices', ctrl.createInvoice);

// PUT    /api/invoices/:trackingNumber/status
router.put('/invoices/:trackingNumber/status', ctrl.updateInvoiceStatus);

// GET    /api/invoices
// Optional query: ?status=Pending
router.get('/invoices', ctrl.getAllInvoices);

// **NEW** GET    /api/invoices/:trackingNumber
router.get('/invoices/:trackingNumber', ctrl.getInvoiceByTracking);




module.exports = router;
