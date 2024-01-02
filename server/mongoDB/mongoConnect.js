const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB);
  console.log("mongo connected");
}