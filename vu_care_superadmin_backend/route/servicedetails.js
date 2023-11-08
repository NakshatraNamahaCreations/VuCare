const express=require("express");
const router=express.Router();
const servicedetailscontroller=require("../controller/servicedetails");


const multer=require("multer");
 
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/services");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/addservicedetails",upload.single("serviceImg"),servicedetailscontroller.addservicedetails);
router.get("/getservicedetails",servicedetailscontroller.getservicedetails);
router.post("/deleteservicedetails/:id",servicedetailscontroller.deleteservicedetails);
router.post("/editservicedetails/:id",servicedetailscontroller.editservicedetails);
router.post("/postservicecategory", servicedetailscontroller.postcategory);
router.post("/closeproject/:id", servicedetailscontroller.updateclose);
router.post("/postservicecat",servicedetailscontroller.postservicecategory);

router.get("/getrunningdata",servicedetailscontroller.getallrunningdata);


module.exports=router;