const customerModel = require("../model/customer");

class addcustomer {
  //add customer
  async addcustomer(req, res) {
    let {
      customerName,
      zipcode,
      Address,
      customerLastName,
      EnquiryId,
      contactPerson,
      category,
      mainContact,
      alternateContact,
      email,
      gst,
      rbhf,
      cnap,
      lnf,
      mainArea,
      city,
      pinCode,
      customerType,
      size,
      color,
      instructions,
      approach,
      password,
      cpassword,
      type,
      serviceExecute,
      selectedSlotText,
    } = req.body;
    try {
      // Get the latest card number from the database
      const latestCustomer = await customerModel
        .findOne()
        .sort({ cardNo: -1 })
        .exec();
      const latestCardNo = latestCustomer ? latestCustomer.cardNo : 0;

      // Increment the card number by 1
      const newCardNo = latestCardNo + 1;

      // check if contact is already exists
      const existingContactno = await customerModel.findOne({
        mainContact: mainContact,
      });
      if (existingContactno) {
        return res.status(400).json({ error: "Contactno already exists" });
      }
      // Check if the email or name already exists
      const emailOrNameExists = await customerModel.findOne({
        $or: [
          { email: email },
          // { email: loginnameOrEmail },
        ],
      });
      if (emailOrNameExists) {
        return res.status(500).json({ error: "The email already exists." });
      }

      // Create a new customer instance with the generated card number
      const customer = new customerModel({
        cardNo: newCardNo,
        Address,
        EnquiryId,
        customerName,
        zipcode,
        customerLastName,
        contactPerson,
        category,
        mainContact,
        alternateContact,
        email,
        gst,
        rbhf,
        cnap,
        lnf,
        mainArea,
        city,
        pinCode,
        customerType,
        size,
        color,
        instructions,
        approach,
        password,
        cpassword,
        type,
        serviceExecute,
        selectedSlotText,
      });
      // Save the customer data to the database
      const savedCustomer = await customer.save();

      if (savedCustomer) {
        return res.json({ success: "Customer added successfully" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async usersignin(req, res) {
    const { email, password } = req.body;

    try {
      if (!email) {
        return res
          .status(400)
          .json({ error: "Please enter your loginname or email" });
      }
      if (!password) {
        return res.status(400).json({ error: "Please enter your password" });
      }
      const user = await customerModel.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found " });
      }
      // const passwordMatch = bcrypt.compareSync(password, user.password);
      console.log(user.password);
      console.log(password);
      if (password !== user.password) {
        return res.status(401).json({ error: "Invalid password" });
      }
      await customerModel.findOneAndUpdate({ email }, { status: "Online" });
      return res.json({ success: "Login successful", user });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async editcustomer(req, res) {
    try {
      let id = req.params.id;
      let {
        cardNo,
        Address,
        EnquiryId,
        customerName,
        zipcode,
        customerLastName,
        contactPerson,
        category,
        mainContact,
        alternateContact,
        email,
        gst,
        rbhf,
        cnap,
        lnf,
        mainArea,
        city,
        pinCode,
        customerType,
        size,
        color,
        instructions,
        approach,
        serviceExecute,
      } = req.body;

      let data = await customerModel.findOneAndUpdate(
        { _id: id },
        {
          cardNo,
          EnquiryId,
          customerName,
          zipcode,
          Address,
          customerLastName,
          contactPerson,
          category,
          mainContact,
          alternateContact,
          email,
          gst,
          rbhf,
          cnap,
          lnf,
          mainArea,
          city,
          pinCode,
          customerType,
          size,
          color,
          instructions,
          approach,
          serviceExecute,
        },
        { new: true }
      );

      if (data) {
        return res.status(200).json({ success: "Updated" });
      } else {
        return res.status(401).send("Not Updated");
      }
    } catch (error) {
      console.error("Error editing customer:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async addCustomersViaExcelSheet(req, res) {
    const data = req.body;

    try {
      // Get the latest card number from the database
      const latestCustomer = await customerModel
        .findOne()
        .sort({ cardNo: -1 })
        .exec();
      const latestCardNo = latestCustomer ? latestCustomer.cardNo : 0;

      // Increment the card number by 1
      const customersWithCardNo = data.map((customer, index) => ({
        ...customer,
        cardNo: latestCardNo + index + 1,
      }));
      const inserteCustomer = await customerModel.insertMany(
        customersWithCardNo
      );

      if (inserteCustomer.length > 0) {
        return res.json({ success: "Customer added successfully" });
      } else {
        return res.status(400).json({ error: "Failed to add Customers" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async addservicedetails(req, res) {
    try {
      const id = req.params.id;
      const { treatmentdetails } = req.body;

      const doc = await customerModel.findByIdAndUpdate(
        id,
        { $push: { treatmentdetails: treatmentdetails } },
        { new: true } // Optional: To return the updated document
      );

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  //Get all customer
  async getallcustomer(req, res) {
    let data = await customerModel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ customers: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Delete customer
  async deletecustomer(req, res) {
    let id = req.params.id;
    const data = await customerModel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }

  async addDeliveryAddress(req, res) {
    try {
      const cardNo = req.params.cardNo;
      const deliveryAddressData = req.body.deliveryAddress;

      // Find the customer by ID
      const customer = await customerModel.findOne({ cardNo });

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      // Add the delivery address to the customer's deliveryAddress array
      customer.deliveryAddress.push(deliveryAddressData);

      // Save the updated customer
      await customer.save();

      res.status(200).json({ success: "Delivery address added successfully" });
    } catch (error) {
      console.error("Error adding delivery address:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
const customercontroller = new addcustomer();
module.exports = customercontroller;
