const mongoose = require('mongoose');
require('dotenv').config()


async function main(){
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Connected to database.');
}
mongoose.set('strictQuery', false);
main().catch((err) => console.log(err));

