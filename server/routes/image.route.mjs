import express from 'express';
import db from '../db/conn.mjs';
import mongoose from 'mongoose';
import Image from '../model/image.mjs';
import upload from '../middleware/upload.mjs';

const router = express.Router();
// const db = mongoose.connection;

router.get('/getAllImages', async (req, res) => {
  try {
    let collection = await db.collection('image');
    let results = await collection.find({}).toArray();
    res.status(200).send({
      resultCode: 1,
      message: 'Get all image successfully',
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      resultCode: -1,
      message: 'Get all image failed',
      data: null,
    });
  }
});

// router.post('/createImage', upload.single('image'),  async (req, res) => {
//   try {
//     const path = req.file.path;

//     const newImage = new Image({
//       property_id: req.body.property_id,
//       image_name: req.body.image_name,
//       image_url: path,
//       description: req.body.description,
//     });
//     if (
//       req.body.property_id == null ||
//       req.body.image_url == null ||
//       req.body.description == null
//     ) {
//       res.status(500).send({
//         resultCode: -1,
//         message: 'Data cannot be empty',
//         data: null,
//       });
//     } else {
//       let collection = await db.collection('image');
//       const result = await collection.insertOne(newImage);

//       res.status(201).send({
//         resultCode: 1,
//         message: 'Image created successfully',
//         data: newImage,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       resultCode: -1,
//       message: 'Failed to create Image',
//       data: result,
//     });
//   }
// });

export default router;
