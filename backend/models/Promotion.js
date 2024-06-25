const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String },
  discountPercentage: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },
});

module.exports = mongoose.model("Promotion", promotionSchema);
