const mongoose = require('mongoose');
const {messageSchema} = require("./messageSchema")

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




