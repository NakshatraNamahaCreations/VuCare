const mongoose = require("mongoose");

const offerbannerSchema = new mongoose.Schema({
  icon: {
    type: String,
  },
  header: {
    type: String,
  },
  desc: {
    type: String,
  },
});

const offerbannermodel = mongoose.model("offerbanner", offerbannerSchema);
module.exports = offerbannermodel;
