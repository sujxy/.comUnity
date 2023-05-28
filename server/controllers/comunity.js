import Comunity from "../models/comunity.js";
import User from "../models/user.js";
//create the comunity

export const createComunity = async (req, res) => {
  try {
    const { name, description, bio, picturePath, coverPath, userId } = req.body;
    const user = await User.findById(userId);

    const comunity = new Comunity({
      name,
      description,
      bio,
      picturePath,
      coverPath,
      members: [userId],
      mods: { [userId]: true },
    });

    const savedComunity = await comunity.save();
    user.communities.push(savedComunity._id);
    await user.save();

    res.status(200).json(savedComunity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get all communities

export const getAllComunity = async (req, res) => {
  try {
    const allCommunities = await Comunity.find({});
    res.status(200).json(allCommunities);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get comunity members

export const getMembers = async (req, res) => {
  try {
    const { comId } = req.params;
    const comunity = await Comunity.findById(comId);
    const members = await Promise.all(
      comunity.members.map((id) => User.findById(id))
    );
    const formattedMembers = members.map(
      ({ _id, firstName, lastName, picturePath, description, department }) => {
        return {
          _id,
          firstName,
          lastName,
          picturePath,
          description,
          department,
        };
      }
    );

    res.status(200).json(formattedMembers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get user communities

export const getUserComunity = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const userCommunities = await Promise.all(
      user.communities.map((comId) => Comunity.findById(comId))
    );

    res.status(200).json(userCommunities);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get specific Comunity

export const getComunity = async (req, res) => {
  try {
    const { comId } = req.params;
    const comunity = await Comunity.findById(comId);
    res.status(200).json(comunity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//patch users

export const patchUsers = async (req, res) => {
  try {
    const { id, comId } = req.params;
    const comunity = await Comunity.findById(comId);
    const user = await User.findById(id);

    if (user.communities.includes(comId)) {
      user.communities = user.communities.filter((id) => id !== comId);
      comunity.members = comunity.members.filter((Id) => Id !== id);
    } else {
      user.communities.push(String(comId));
      comunity.members.push(String(id));
    }

    await user.save();
    await comunity.save();

    const communities = await Promise.all(
      user.communities.map((id) => Comunity.findById(id))
    );

    res.status(200).json(communities);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//
