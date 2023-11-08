const customerDAddressModel = require("../model/customerDAddress");

class customeAddress {
  async customerAddress(req, res) {
    let { address, streetName, landmark, state, city, zipcode, userId } =
      req.body;
    try {
      const deliveryAddress = new customerDAddressModel({
        address,
        streetName,
        landmark,
        state,
        city,
        zipcode,
        userId,
        
      });
      let Address = await deliveryAddress.save();
      if (Address) {
        return res.status(200).json({ success: "Address Added successfully" });
      }
    } catch (err) {
      res.status(500).json({ error: "An error occurred" });
    }
  }
  async getcustomerAddress(req, res) {
    try {
      let Address = await customerDAddressModel.find({});
      if (Address) {
        res.status(200).json({ succes: "Succesfully fetched", data: Address });
      }
    } catch (err) {
      res.status(500).json({ err: "Error While Fetching addres" });
    }
  }
}

const customeAddressController = new customeAddress();
module.exports = customeAddressController;
