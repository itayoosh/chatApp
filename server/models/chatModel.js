const mongoose = require('mongoose');
const Joi = require('joi');


const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  senderPhone: {
    type: String,
    required: true
  },
  },{
    timestamps: true
  }
);

const chatSchema = new mongoose.Schema({
  phone1: {
    type: String,
    required: true
  },
  phone2: {
    type: String,
    required: true
  },
  messages: [messageSchema]
},
{timestamps: true});

exports.chatModel = mongoose.model("chats", chatSchema);

exports.validateMessage = (reqBody)=>{
  const joiSchema = Joi.object({
      text: Joi.string().min(1).max(100).required()
  })
  return joiSchema.validate(reqBody);
}


