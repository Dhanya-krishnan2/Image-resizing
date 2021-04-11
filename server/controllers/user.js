const mongoose = require('mongoose');
const { imageHash } = require('image-hash');
const fs = require('fs');
const sharp = require('sharp');

const User = require('../models/user');
// refered the documentation for image-hash
// and it accepts 4 parameters

exports.users_upload_img = async (req, res, next) => {
  try {
    const hash = await new Promise((res, rej) => {
      try {
        imageHash(`./uploads/${req.file.filename}`, 16, true, (error, data) => {
          if (error) throw error;
          res(data);
        });
      } catch (err) {
        rej();
      }
    });
     
    const userImg = await User.find({ imageSHA256Hash: hash });
    if (userImg.length >= 1) {
      const preImg = [`uploads/${req.file.filename}`];
      preImg.forEach((path) => fs.existsSync(path) && fs.unlinkSync(path));
      return res.status(409).json({
        message: 'Image exists',
      });
    } else {
      if (req.body.isProfile === true) {
        sharp(`uploads/${req.file.filename}`)
          .toBuffer()
          .then((data) => {
            sharp(data)
              .resize(128, 128)
              .toFile(`uploads/resize${req.file.filename}`);
          });
      } else
        sharp(`uploads/${req.file.filename}`)
          .toBuffer()
          .then((data) => {
            sharp(data)
              .resize(1200, 1200)
              .toFile(`uploads/resize${req.file.filename}`);
          });
      const user = new User({
        userName: req.body.userName,
        isProfile: req.body.isProfile,
        imageUrl: `uploads/resize${req.file.filename}`,
        imageSHA256Hash: hash,
      });
      const result = await user.save();
      const preImg = [`uploads/${req.file.filename}`];
      preImg.forEach((path) => fs.existsSync(path) && fs.unlinkSync(path));
      res.status(201).json({
        message: 'User created',
        result: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      message: 'Something went wrong!',
    });
  }
};

exports.users_get_allUser = async (req, res, next) => {
  try {
    const result = await User.find({ isProfile: true });
    if (result.length < 1) {
      return res.status(200).json({
        message: 'There is no user',
        result,
      });
    }
    return res.status(201).json({
      message: 'Get all user successfully',
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: 'Something went wrong!',
    });
  }
};

exports.users_change_name = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    user.userName = req.body.userName;
    user.markModified('userName');
    const result = await user.save();
    return res.status(200).json({
      message: 'Name changed successfully',
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: 'Something went wrong!',
    });
  }
};
