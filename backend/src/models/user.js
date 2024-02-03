const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    password: { type: Number },
    email: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

const userModel = mongoose.model("user", userSchema, "user");

module.exports = {
  create: async ({ insertDict }) => new userModel(insertDict).save(),
  findOne: async ({ query, projection }) =>
    userModel.findOne(query, projection).lean(),
  find: async ({ query, projection }) =>
    userModel.find(query, projection).lean(),
  updateOne: ({ query, updateDict }) => userModel.updateOne(query, updateDict),
  update: async ({ query, updateDict }) =>
    userModel.updateMany(query, updateDict),
};
