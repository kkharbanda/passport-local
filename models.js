const mongoose = require("mongoose")
mongoose.set('strictQuery', false);

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1/userDb";

// Wait for database to connect, logging an error if there is a problem 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
const UserSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique:true
    },
    password: {
        type: String,
    },
  });
  
  const User = mongoose.model("User", UserSchema);
  module.exports = User;
  