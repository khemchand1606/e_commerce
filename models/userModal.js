const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    mobile: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    role: { type: String, default: "user" },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // Modify the document or perform additional tasks
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  // next();
});

userSchema.methods.isPasswordMatched = async function ({ enteredPassword }) {
  return bcrypt.compare(enteredPassword, this.password);
};
module.exports = { userCollection: mongoose.model("User", userSchema) };
