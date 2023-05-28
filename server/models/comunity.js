import mongoose from "mongoose";

const comunitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      maxLength: 1000,
    },
    members: {
      type: Array,
      default: [],
    },
    mods: {
      type: Map,
      of: Boolean,
    },
    picturePath: String,
    coverPath: String,
  },
  { timestamps: true }
);

const Comunity = mongoose.model("Comunity", comunitySchema);

export default Comunity;
