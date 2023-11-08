const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log("=============MongoDb Database connected successfuly")
  )
  .catch((err) => console.log("Database Not connected !!!"));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

// import routes
const admin = require("./route/adminlogin");
const technician = require("./route/master/technician");

const category = require("./route/category");
const subcategory = require("./route/subcategory");
const banner = require("./route/userapp/banner");
const userrouter = require("./route/master/user");
const cityrouter = require("./route/master/city");

const customer = require("./route/customer");

const servicedetails = require("./route/servicedetails");
const addcall = require("./route/addcall");

//user app
const userauth = require("./route/userapp/userauth");
const ubanner = require("./route/userapp/banner");
const uservice = require("./route/userapp/serviceManament");
const usubcat = require("./route/userapp/subcat");
const uresubcat = require("./route/userapp/resubcat");
const uvoucher = require("./route/userapp/voucher");
const usuperlogin = require("./route/userapp/superlogin");
const uofferbanner = require("./route/userapp/offerbanner");
const uspotlightbanner = require("./route/userapp/spotlight");
const uhomebanner = require("./route/userapp/homepagebanner");
const uhometitle = require("./route/userapp/homepagetiltle");
const uslots = require("./route/userapp/slots");

const ufeq = require("./route/userapp/feq");
const addOnsRoute = require("./route/userapp/serviceAddons");
const numbersRoute = require("./route/userapp/whatsappNumber");
const paymentgateway = require("./route/paymentgatway/payment");
const sPayment = require("./route/paymentgatway/servicePayment");

const webbanner = require("./route/websitebanner");

const otp = require("./route/otp");
const address = require("./route/customerDAddress");
app.use("/api", otp);
app.use("/api", admin);
app.use("/api", technician);
app.use("/api", category);
app.use("/api", subcategory);

app.use("/api", banner);
app.use("/api/master", userrouter);
app.use("/api/master", cityrouter);

app.use("/api", customer);

app.use("/api", servicedetails);

app.use("/api", addcall);

//user app
app.use("/api/userapp", userauth);
app.use("/api/userapp", ubanner);
app.use("/api/userapp", uservice);
app.use("/api/userapp", usubcat);
app.use("/api/userapp", uresubcat);
app.use("/api/userapp", uvoucher);
app.use("/api/super", usuperlogin);
app.use("/api/userapp", uofferbanner);
app.use("/api/userapp", uhomebanner);
app.use("/api/userapp", uhometitle);
app.use("/api/userapp", uspotlightbanner);
app.use("/api/userapp", uslots);
app.use("/api/userapp", ufeq);

app.use("/api/userapp", addOnsRoute);
app.use("/api/userapp", numbersRoute);

app.use("/api/payment", paymentgateway);
app.use("/api/payment/service", sPayment);

//website
app.use("/api/website", webbanner);
app.use("/api/", address);
const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
