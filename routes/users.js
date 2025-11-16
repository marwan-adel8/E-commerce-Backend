import express from "express";
const api = process.env.API_URL;
import User from "../models/User.js";
import bcrypt from "bcryptjs";
const router = express.Router();
import jwt from "jsonwebtoken";

router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-password");
  if (!userList) {
    res.status(500).json({
      success: false,
      message: "No user found",
    });
  }

  res.send(userList);
});

router.get(`/:id`, async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    res.status(500).json({
      success: false,
      message: "No user found",
    });
  }

  res.send(user);
});

router.post(`/`, async (req, res) => {
  // استخدمت let علشان عرفتها تحت تاني
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    city: req.body.city,
    isAdmin: req.body.isAdmin,
  });

  user = await user.save();

  if (!user) {
    res.status(500).send("The user cannot be created");
  }
  res.send(user);
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.JWT_SECRET;
    if (!user) {
        return res.status(500).send("user not found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign({
            userId: user._id,
            isAdmin: user.isAdmin

        }, secret, {expiresIn:"1d"});

      res.status(200).send({email:user.email, token:token});
    }else{
        res.status(400).send("invaild email or password");

    }
})

export default router;
