const mongoose = require("mongoose");

const CustomerDelivryAddress = new mongoose.Schema(
  {
    address: {
      type: String,
    },

    streetName: {
      type: String,
    },
    landmark: {
      type: String,
    },

    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

const customerDeliverAddressModel = mongoose.model(
  "deliveryAddress",
  CustomerDelivryAddress
);
module.exports = customerDeliverAddressModel;
