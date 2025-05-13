// controllers/invoiceController.js
const Invoice = require('../models/invoice');

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    return res.status(201).json(invoice);
  } catch (err) {
    console.error("🛑 createInvoice error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Update the status of an existing invoice by trackingNumber
exports.updateInvoiceStatus = async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const { status } = req.body;
    const invoice = await Invoice.findOneAndUpdate(
      { trackingNumber },
      { status },
      { new: true }
    );
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    return res.status(200).json(invoice);
  } catch (err) {
    console.error("🛑 updateInvoiceStatus error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Get all invoices, optionally filtered by status
// e.g. GET /api/invoices?status=Pending
exports.getAllInvoices = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const invoices = await Invoice.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(invoices);
  } catch (err) {
    console.error("🛑 getAllInvoices error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// **NEW**: Get a single invoice by trackingNumber
exports.getInvoiceByTracking = async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const invoice = await Invoice.findOne({ trackingNumber });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    return res.status(200).json(invoice);
  } catch (err) {
    console.error("🛑 getInvoiceByTracking error:", err);
    return res.status(500).json({ error: err.message });
  }
};



