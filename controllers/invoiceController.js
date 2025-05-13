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

// 🔁 Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    return res.status(200).json(invoices);
  } catch (err) {
    console.error("🛑 getAllInvoices error:", err);
    return res.status(500).json({ error: err.message });
  }
};



