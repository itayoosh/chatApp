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
  isWatched: {
    type: Boolean,
    default: false
  }
  },{
    timestamps: true
  }
);
exports.messageSchema = messageSchema;
exports.validateMessage = (reqBody)=>{
    const joiSchema = Joi.object({
        text: Joi.string().min(1).max(100).required()
    })
    return joiSchema.validate(reqBody);
  }