const otpModel = require("../model/otp");
const customerModel = require("../model/customer");
const { default: axios } = require("axios");

class Otp {
  async sendotp(req, res) {
    const { mainContact } = req.body;
    const user = await customerModel.findOne({ mainContact: mainContact });

    if (!mainContact) {
      return res.json({ error: "No Number" });
    } else if (!user) {
      return res.status(404).json({ error: "User not found! please register" });
    } else {
      try {
        const authkey = "359703Ajc6p8zlcOZT6087ef96P1";
        const mobileNumber = mainContact;

        let otp = "";
        let newnumber = await otpModel.findOne({ mainContact: mainContact });

        if (newnumber) {
          otp = newnumber.otp;
        } else {
          otp = Math.floor(1000 + Math.random() * 9000).toString();

          await new otpModel({ mainContact, otp }).save();
        }
        // Format the OTP expiration time
        const expirationTime = newnumber?.expire_at;
        const formattedExpirationTime = expirationTime
          ? expirationTime.toLocaleString()
          : "N/A";

        const message = `Your One Time Password (OTP) for Vijay Home Services - Most Trusted Home Services Company is ${otp}. <www.vijayhomeservices.com>`;
        const sender = "VIJYHS";
        const route = "4";
        const country = "91";
        const DLT_TE_ID = "1707169511264546338";

        const url = `http://control.bestsms.co.in/api/sendhttp.php?authkey=${authkey}&mobiles=${mobileNumber}&message=${encodeURIComponent(
          message
        )}&sender=${sender}&route=${route}&country=${country}&DLT_TE_ID=${DLT_TE_ID}`;

        const response = await axios.post(
          url,
          {},
          {
            headers: { Cookie: "PHPSESSID=jtocgr1alepci3c33nbup47m85" },
          }
        );

      
        return res.json({ otp, formattedExpirationTime });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: error.message });
      }
    }
  }

  async verifyotp(req, res) {
    const { otp, mainContact } = req.body;

    console.log(otp, mainContact);
    if (!otp) {
      return res.json({ error: "enter otp" });
    } else {
      try {
        const customer = await customerModel.findOne({
          mainContact: mainContact,
        });
      
        if (!customer) {
          console.log("user not found");
          return res
            .status(404)
            .json({ error: "User not found! please register" });
        } else {
          const storedOtp = await otpModel.findOne({ otp: otp });
          if (!storedOtp) {
            return res.status(404).json({ error: "OTP not found" });
          }

          if (otp === storedOtp.otp.toString()) {
            console.log("storedOtp.otp.toString()", storedOtp.otp.toString());

            return res.json({ success: "OTP verified",user:customer });
          } else {
            return res.status(400).json({ error: "Invalid OTP" });
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
      }
    }
  }

 
}

const authotpController = new Otp();
module.exports = authotpController;