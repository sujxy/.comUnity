import mongoose from "mongoose";
import User from "../models/user.js";

//reading
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUserBuddies = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const buddies = await Promise.all(
      user.buddies.map((id) => User.findById(id))
    );

    const formattedBuddies = buddies.map(
      ({ _id, firstName, lastName, description, department, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          description,
          department,
          picturePath,
        };
      }
    );

    res.status(200).json(formattedBuddies);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//updating buddylist
export const addRemoveBuddies = async (req, res) => {
  try {
    const { id, buddyId } = req.params;
    const user = await User.findById(id);
    const buddy = await User.findById(buddyId);

    if (user.buddies.includes(buddyId)) {
      user.buddies = user.buddies.filter((id) => id !== buddyId);
      buddy.buddies = buddy.buddies.filter((id) => id !== id);
    } else {
      user.buddies.push(buddyId);
      buddy.buddies.push(id);
    }

    await user.save();
    await buddy.save();

    //resend updated buddy list
    const buddies = await Promise.all(
      user.buddies.map((id) => User.findById(id))
    );

    const formattedBuddies = buddies.map(
      ({ _id, firstName, lastName, description, department, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          description,
          department,
          picturePath,
        };
      }
    );

    res.status(200).json(formattedBuddies);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
