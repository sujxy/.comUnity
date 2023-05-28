import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    collegeName: {
      type: String,
      required: true,
      default: "",
    },
    picturePath: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      required: true,
    },
    impressions: Number,
    description: {
      type: String,
      required: true,
      default: "",
      min: 2,
      max: 20,
    },
    bio: {
      type: String,
      default: "",
      min: 0,
      max: 50,
    },
    buddies: {
      type: Array,
      default: [],
    },
    communities: {
      type: Array,
      default: [],
    },
    savedPosts: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
