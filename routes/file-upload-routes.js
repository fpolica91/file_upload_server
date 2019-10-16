const express = require('express');
const router  = express.Router();
const Thing = require('../models/thing-model')

// include CLOUDINARY:
const uploader = require('../configs/cloudinary-setup');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    // console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }

    const pic = new Thing({
      imageUrl: req.file.secure_url
    })
    pic.save()


    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    // res.json({ secure_url: req.file.secure_url });
    // console.log(req.file.secure_url)
})


router.get('/upload', (req,res,next)=>{
    Thing.find()
    .then(pic => res.json(pic))
    .catch(err => res.json(err))
})

module.exports = router;