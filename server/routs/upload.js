const express = require("express");
const { auth } = require("../midlewares/auth");
const { userModel } = require("../models/userModel");
const {monkeyUpload} = require("../midlewares/fileupload")
const router = express.Router();



router.post("/users", auth, async(req,res) => {
  try{
    
    let user = await userModel.findOne({phone:req.tokenData.phone})
    if (!user){
      return res.status(404).json({msg: "user not found"})
    }
    let domainFile = `users_images/`
    const data = await monkeyUpload(req,"myFile",domainFile,5,[".png",".jpg",".gif", ".jpeg"]);
    const update = await userModel.updateOne({phone:req.tokenData.phone},{img_url:data.fileName})
    res.json({data,update});

  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

module.exports = router;