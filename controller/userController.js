const { generateToken } = require("../config/jwtToken");
const userCollection = require("../models/userModal");

// get all user
async function findAllUser() {
  return await userCollection.find();
}

// get a user by email
async function findUserByEmail({ email }) {
  return await userCollection.findOne({ email });
}

// get user by id
async function findUserById({ id }) {
  return await userCollection.findById(id);
}

async function updateUser({ id }, { body }) {
  return await userCollection.findByIdAndUpdate(id, { ...body }, { new: true });
}

// delete user
async function deleteUser({ id }) {
  return await userCollection.findByIdAndDelete(id);
}

// create user
const createUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await findUserByEmail({ email });
  if (!findUser) {
    const newUser = await userCollection.create(req.body);
    res.json(newUser);
  } else {
    res.json({
      message: "User already exists.",
      success: true,
    });
  }
};
// login user
async function loginUser(req, res) {
  const { email: enteredEmail, password: enteredPassword } = req.body;

  try {
    const findUser = await findUserByEmail({
      email: enteredEmail,
    });

    // if (!findUser && (await findUser.isPasswordMatched(password))) {
    if (!findUser) {
      // throw new Error("Uses doesn't exist");
      res.json("Uses doesn't exist");
    } else if (!(await findUser.isPasswordMatched({ enteredPassword }))) {
      res.json("Invalid credential");
      // throw new Error("Invalid credential");
    }
    res.json({
      ...findUser,
      token: generateToken({ email: findUser?.email || "" }),
    });
  } catch (error) {
    throw new Error(error);
  }
}

// Get all user
async function getAllUser(req, res) {
  try {
    const getUsers = await findAllUser();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
}

// Get user by id
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await findUserById({ id });
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
}

// update user by id
async function updateUserById(req, res) {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updatedUser = await updateUser({ id }, { body });
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
}

// delete user by id
async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser({ id });
    res.json(deletedUser);
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getUserById,
  deleteUserById,
  updateUserById,
};
