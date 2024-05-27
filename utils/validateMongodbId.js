const mongoose = require("mongoose");

function validateMongoDbId({ id }) {
  const isValidId = mongoose.Schema.Types.ObjectId.isValid(id);
  if (!isValidId) throw new Error("This Id is not valid or not found.");
}

module.exports = { validateMongoDbId };
