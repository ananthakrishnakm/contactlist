const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the contact name"],
    },

    email: {
      type: String,
      required: [true, "please add the contact email"],
    },

    phone: {
      type: String,
      required: [true, "please add the contact phone"],
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("contact",contactSchema);

