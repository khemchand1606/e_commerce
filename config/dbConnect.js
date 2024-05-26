const { mongoose } = require("mongoose");

function dbConnect() {
  const connect = mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected To DB Sucessfully....");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = dbConnect;
