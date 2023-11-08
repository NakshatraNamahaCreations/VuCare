const vouchermodel = require("../../model/userapp/voucher");

class voucher {
  
  async addvoucher(req, res) {
    let { category,voucherCode,discountPercentage, startDate,expDate,desc,htuse} = req.body;


    let add = new vouchermodel({
      category: category,
      voucherCode:voucherCode,
      discountPercentage:discountPercentage,
      startDate:startDate,
      expDate:expDate,
      desc:desc,
      htuse:htuse
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "Added successfully" });
    }
  }

  //edit category
  async editvoucher(req,res){
    let id=req.params.id;
    let { category,voucherCode,discountPercentage, startDate,expDate,desc,htuse} =req.body;

    
    let data=await vouchermodel.findOneAndUpdate(
        {_id:id},
        {category,voucherCode,discountPercentage, startDate,expDate,desc,htuse}
    );
    if (data) {
        return res.json({ success: "Updated" });
      }

  }
  async getvoucher(req, res) {
    let voucher = await vouchermodel.find({}).sort({ _id: -1 });
    if (voucher) {
      return res.json({ voucher: voucher });
    }
  }


  async postdeletevoucher(req, res) {
    let id = req.params.id;
    const data = await vouchermodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const voucherController = new voucher();
module.exports = voucherController;
