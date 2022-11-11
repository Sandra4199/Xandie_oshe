const User = require("../model/User");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync();

exports.getAllUser = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  // let existingUser;
  try {
    let existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      res.status(400).json({ message: "User Already Exists! Login please " });
    } else {
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
      });

      res.status(201).json({ status: true, message: "User created", user });
      await user.save();

      // try {
      //   await user.save();
      // } catch (err) {
      //   return console.log(err);
      // }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Couldn't Find User By This Email" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Passwords" });
    } else {
      return res
        .status(200)
        .json({ message: "Login Successful", user: existingUser });
    }
  } catch (err) {
    return console.log(err);
  }
};
