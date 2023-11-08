const servicedetailsmodel = require("../model/servicedetails");
const customerModel = require("../model/customer");
const { v4: uuidv4 } = require("uuid");

class servicedetails {
  async addservicedetails(req, res) {
    try {
      let {
        customerData,
        dCategory,
        cardNo,
        contractType,
        service,
        slots, //  this 03-10
        serviceID,
        serviceCharge,
        dateofService,
        desc,
        firstserviceDate,
        serviceFrequency,
        startDate,
        category,
        expiryDate,
        date,
        time,
        dividedDates,
        dividedCharges,
        dividedamtDates,
        dividedamtCharges,
        oneCommunity,
        communityId,
        BackofficeExecutive,
        deliveryAddress,
        type,
        userId,
        selectedSlotText,
        AddOns,
        TotalAmt,
        GrandTotal,
        totalSaved,
        discAmt,
        couponCode,
        city,
        paymentMode,
        
      } = req.body;
      let file = req.file?.filename;

      // Initialize the variables as empty arrays
      let dividedDateObjects = [];
      let dividedamtDateObjects = [];
      let dividedamtChargeObjects = [];

      if (contractType === "AMC") {
        if (dividedDates) {
          dividedDateObjects = dividedDates.map((date) => {
            const uniqueId = uuidv4(); // Generate a UUID for the date
            return { id: uniqueId, date: new Date(date) };
          });
        }

        if (dividedamtDates) {
          dividedamtDateObjects = dividedamtDates.map((date) => {
            const uniqueId = uuidv4(); // Generate a UUID for the date
            return { id: uniqueId, date: new Date(date) };
          });
        }

        if (dividedamtCharges) {
          dividedamtChargeObjects = dividedamtCharges.map((charge) => {
            const uniqueId = uuidv4(); // Generate a UUID for the charge
            return { id: uniqueId, charge };
          });
        }
      } else {
        if (dividedDates) {
          dividedDateObjects = dividedDates.map((date) => {
            const uniqueId = uuidv4(); // Generate a UUID for the date
            return { id: uniqueId, date: new Date(date) };
          });
        }
        if (dividedamtDates) {
          dividedamtDateObjects = dividedamtDates.map((date) => {
            const uniqueId = uuidv4(); // Generate a UUID for the date
            return { id: uniqueId, date: new Date(date) };
          });
        }
        if (dividedamtCharges) {
          dividedamtChargeObjects = dividedamtCharges.map((charge) => {
            const uniqueId = uuidv4(); // Generate a UUID for the charge
            return { id: uniqueId, charge };
          });
        }


      }
      const user = await customerModel.findOneAndUpdate(
        { _id: customerData[0]?._id },
        { city: city, category: category },
        { new: true }
      );

      console.log("user--", user);

      let add = new servicedetailsmodel({
        customerData,
        cardNo: cardNo,
        dCategory,
        category: category,
        contractType: contractType,
        service: service,
        serviceID: serviceID,
        slots: slots,
        serviceCharge: serviceCharge,
        dateofService: dateofService,
        desc: desc,
        serviceFrequency: serviceFrequency,
        startDate: startDate,
        expiryDate: expiryDate,
        firstserviceDate: firstserviceDate,
        date: date,
        time: time,
        dividedDates: dividedDateObjects, // Store the array of objects with IDs and dates
        dividedCharges,
        dividedamtDates: dividedamtDateObjects,
        dividedamtCharges: dividedamtChargeObjects,
        oneCommunity,
        communityId,
        BackofficeExecutive,
        deliveryAddress,
        type,
        userId,
        selectedSlotText,
        serviceImg: file,
        AddOns,
        GrandTotal,
        totalSaved,
        discAmt,
        couponCode,
        city,
        paymentMode,
        TotalAmt
      });

      let save = await add.save();

      if (save) {
        return res.json({ success: "Added successfully",data:save });
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

async updatepayment(req,res){
  let id = req.params.id;

  

  let data = await servicedetailsmodel.findByIdAndUpdate({ _id: id }, {paymentMode:"online"  });
  if (data) {
    return  res.status(200).json({ success: "Updated" });
  }

}

  //edit
  async editservicedetails(req, res) {
    let id = req.params.id;
    let {
      customerData,
      cardNo,
      dCategory,
      contractType,
      service,
      serviceCharge,
      dateofService,
      desc,
      firstserviceDate,
      serviceFrequency,
      startDate,
      category,
      expiryDate,
      dividedDates,
      dividedCharges,
      BackofficeExecutive,
      deliveryAddress,
    } = req.body;

    let data = await servicedetailsmodel.findOneAndUpdate(
      { _id: id },
      {
        customerData,
        cardNo,
        dCategory,
        contractType,
        service,
        serviceCharge,
        dateofService,
        desc,
        firstserviceDate,
        serviceFrequency,
        startDate,
        category,
        expiryDate,
        dividedDates,
        dividedCharges,
        BackofficeExecutive,
        deliveryAddress,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    } else {
      return res.json({ error: "error" });
    }
  }
  async getallrunningdata(req, res) {
    try {
      // const customerId = req.query.customerId;
      // const userId = req.query.userId;
      let data = await servicedetailsmodel.aggregate([
        {
          $lookup: {
            from: "addcalls",
            localField: "_id",
            foreignField: "serviceId",
            as: "dsrdata",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "cardNo",
            foreignField: "cardNo",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "enquiryadds",
            localField: "customer.EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryData",
          },
        },
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "customer.EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryFollowupData",
          },
        },
        {
          $lookup: {
            from: "payments",
            localField: "customer._id",
            foreignField: "customer",
            as: "paymentData",
          },
        },
        {
          $lookup: {
            from: "treatments",
            localField: "customer.EnquiryId",
            foreignField: "EnquiryId",
            as: "treatmentData",
          },
        },
        {
          $lookup: {
            from: "quotes",
            localField: "customer.EnquiryId",
            foreignField: "EnquiryId",
            as: "quotedata",
          },
        },
        {
          $sort: {
            _id: -1, // Sort by _id in descending order
          },
        },
      ]);
      if (data) {
        return res.json({ runningdata: data });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  
  async postservicecategory(req, res) {
    let { category } = req.body;
    let data = await servicedetailsmodel.find({ category }).sort({ _id: -1 });

    if (data) {
      return res.json({ servicedetails: data });
    }
  }
  async updateclose(req, res) {
    let id = req.params.id;
    let { closeProject, closeDate } = req.body;
    let newData = await servicedetailsmodel.findOneAndUpdate(
      { _id: id },
      {
        closeProject,
        closeDate,
      },
      { new: true } // Option to return the updated document
    );
    if (newData) {
      return res.status(200).json({ Success: "updated succesfully" });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async postcategory(req, res) {
    let { category } = req.body;
    let servicedetails = await servicedetailsmodel.find({ category });

    if (servicedetails) {
      return res.json({ servicedetails: servicedetails });
    } else {
      return res.json({ error: "something went wrong" });
    }
  }
  async getservicedetails(req, res) {
    let servicedetails = await servicedetailsmodel.find({}).sort({ _id: -1 });
    if (servicedetails) {
      return res.json({ servicedetails: servicedetails });
    }
  }

  async deleteservicedetails(req, res) {
    let id = req.params.id;
    let data = await servicedetailsmodel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const servicedetailscontroller = new servicedetails();
module.exports = servicedetailscontroller;
