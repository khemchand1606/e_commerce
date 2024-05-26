const { generateToken } = require("../config/jwtToken");
const {
  createDocument,
  getDocumentByEmail,
  getAllDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
} = require("./commonController");

// create user
const registerUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await getDocumentByEmail({ email });
  if (!findUser) {
    const newUser = await createDocument({ body: req.body });
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
    const findUser = await getDocumentByEmail({
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
  console.log(req.user);
  try {
    const getUsers = await getAllDocument();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
}

// Get user by id
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await getDocumentById({ id });
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
    const updatedUser = await updateDocument({ id }, { body });
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
}

// delete user by id
async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await deleteDocument({ id });
    res.json(deletedUser);
  } catch (error) {
    throw new Error(error);
  }
}

async function blockUser(req, res) {
  const { id } = req.params;

  try {
    const block = await updateDocument(
      {
        id,
      },
      {
        body: {
          isBlocked: true,
        },
      }
    );

    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function unblockUser(req, res) {
  const { id } = req.params;
  try {
    const unblock = await updateDocument(
      {
        id,
      },
      {
        body: {
          isBlocked: false,
        },
      }
    );

    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  deleteUserById,
  updateUserById,
  blockUser,
  unblockUser,
};
