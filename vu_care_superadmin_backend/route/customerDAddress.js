const customeAddressController = require("../controller/customerDAddress");
const express = require("express");
const router = express.Router();

router.post("/addcustomerAddress", customeAddressController.customerAddress);
router.get("/getalladress", customeAddressController.getcustomerAddress);
module.exports = router;
