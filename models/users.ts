import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
    },

    bio: {
      type: String,
      default: "",
    },
    communities: [
  {
    type: Schema.Types.ObjectId,
    ref: "community",
  },
],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;