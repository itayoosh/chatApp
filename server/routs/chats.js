const express = require('express');
const router = express.Router();
const {chatModel, validateMessage}= require('../models/chatModel'); 
const {userModel}=require("../models/userModel")
const {auth}=require("../midlewares/auth")
 
const getContactName =async (userPhone, friendPhone)=>{
  try{
  const user = await userModel.findOne({phone: userPhone});
  const contactData = user.contacts.find((e) => {
    return e.phone === friendPhone;
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
router.get('/showChat/:chatId', auth, async(req, res)=>{
    try{
        const userPhone=req.tokenData.phone;
        const chatId=req.params.chatId;
        const chat = await chatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found.' });
        }
        if (chat.phone1 !== userPhone && chat.phone2 !== userPhone) {
          return res.status(403).json({ message: 'You are not authorized to access that chat.' });
        }
        
        res.status(201).json(chat.messages);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})
router.get('/friendData/:chatId', auth, async(req, res)=>{
  try{
      const userPhone=req.tokenData.phone;
      const chatId=req.params.chatId;
      let friendPhone;
      const chat = await chatModel.findById(chatId);
      if (!chat) {
          return res.status(404).json({ message: 'Chat not found.' });
      }
      if (chat.phone1 == userPhone ){
        friendPhone=chat.phone2;
      }else if(chat.phone2 == userPhone ){
        friendPhone=chat.phone1;
      }else{
       return res.status(403).json({ message: 'You are not authorized to access that chat.' });
      }
      const contactName = await getContactName(userPhone, friendPhone)
      const friend = await userModel.findOne({phone: friendPhone});
      res.status(201).json({phone: friendPhone, contactName: contactName, img_url: friend.img_url});
  }catch(error){
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
})
router.get('/showChats', auth, async (req, res) => {
  try {
    const userPhone = req.tokenData.phone;
    const chats = await chatModel.find({
      $or: [{ phone1: userPhone }, { phone2: userPhone }],
    }).sort({updatedAt:-1})

    if (!chats || chats.length === 0) {
      return res.status(404).json({ message: 'No chats found' });
    }

    const userChats = await Promise.all(
      chats.map(async (chat) => {
        const _id = chat._id;
        const contactPhone = chat.phone1 !== userPhone ? chat.phone1 : chat.phone2;
        const contactName = await getContactName(userPhone, contactPhone);
        const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;

        if (contactName != null) {
          return {
            _id,
            contactPhone,
            contactName,
            lastMessage,
          };
        } else {
          return {
            _id,
            contactPhone,
            lastMessage,
          };
        }
      })
    );

    res.json(userChats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

    


// if the chat already exists, return the existed chat
router.post('/createChat/:phone',auth, async (req, res) => {
  try {
    
    const phone1=req.tokenData.phone;
    const phone2 = req.params.phone;
    
  
    try{
      const isPhoneExist = await userModel.find({phone: phone2});
      console.log(isPhoneExist);
      if(!isPhoneExist.length){
        return res.status(404).json({msg: "user not found"});
      }
    } catch (error) {
      console.log(error);
    }
    const existingChat = await chatModel.findOne({ $or: [{ phone1, phone2 }, { phone1: phone2, phone2: phone1 }] });

    if (existingChat) {
      return res.status(201).json(existingChat);
    }
    const newChat = new chatModel({ phone1, phone2 });

    await newChat.save();

    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/sendMessage/:chatId',auth, async (req, res) => {
  try {
    const isValid = validateMessage(req.body);
  if (isValid.error) {
    return res.status(401).json(isValid.error.details);
  }
    const { chatId } = req.params;
    const { text } = req.body;
    const senderPhone = req.tokenData.phone;

    const chat = await chatModel.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found.' });
    }
    const phone = req.tokenData.phone;
    if(chat.phone1!=phone&&chat.phone2!=phone){
      return res.status(401).json({message: "you are not a participant of this chat"})
    }
    chat.messages.push({ text, senderPhone });

    await chat.save();

    res.status(201).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
