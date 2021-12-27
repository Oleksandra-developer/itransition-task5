const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");
const Status = require("../constants")
const { v4 } = require("uuid")

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Name required"]
      },
  email: {
    type: String,
    required: [true, "Email required"]
     },
  password: {
    type: String,
    required: [true, "Password required"]
  },
  status: {
    type: String,
    enum: [Status.BLOCK, Status.UNBLOCK],
    default: Status.UNBLOCK,
  },
  registration: {
    type: Date,
    required: [true, "Date of registration is required"]
 },
lastVisit: {
  type: Date,
 default: null
},
token: {
  type: String,
  default: null,
},
verify: {
  type: Boolean,
  default: false,
},
verifyToken: {
  type: String,
  required: [true, "Verify token is required"],
},
})

userSchema.methods.setPassword = function(password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.password);
};

userSchema.methods.createRegDate = function () {
  this.registration = new Date();
}

userSchema.methods.createLastVisitDate = function () {
  this.lastVisit = new Date();
}

userSchema.methods.createVerifyToken = function () {
  this.verifyToken = v4();
};
const User = mongoose.model("user", userSchema);

module.exports = User;