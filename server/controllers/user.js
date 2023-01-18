const usermodel = require("../models/user");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const options = {
  page: 1,
  limit: 2,
};

exports.getData = (req, res) => {
  usermodel.paginate({}, options, (err, docs) => {
    res.send({
      docs,
    });
  });
};

exports.insertData = async (req, res) => {
  const { nombre, usuario, password, email } = req.body;
  const existinUser = await usermodel.findOne({ email });

  if (existinUser) {
    console.log("Ya existe un usuario con este correo");
  } else {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new usermodel({
      nombre,
      usuario,
      passwordHash,
      email,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  }
};

exports.sigIn = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const existingUser = await usermodel.findOne({ usuario });

    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong user or password" });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong user or password" });

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.logged = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (error) {
    res.json(false);
  }
};

exports.logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

exports.updateSingle = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  usermodel.updateOne({ _id: id }, body, (err, docs) => {
    res.send({
      items: docs,
    });
  });
};

exports.deleteSingle = (req, res) => {
  const { id } = req.params;
  usermodel.deleteOne({ _id: id }, (err, docs) => {
    res.send({
      items: docs,
    });
  });
};
