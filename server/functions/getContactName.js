const {userModel} = require("../models/userModel")

const getContactName =async (userPhone, contactPhone)=>{
    try{
    const user = await userModel.findOne({phone: userPhone});
    const contactData = user.contacts.find((e) => {
      return e.phone === contactPhone;
    });
    if(contactData!=null){
      return contactData.name;
    }else{
      return null;
    }}catch(err){
      console.log(err);
      return null;
    }
  }
  exports.getContactName = getContactName;