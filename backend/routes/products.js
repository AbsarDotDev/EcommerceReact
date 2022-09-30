const express= require('express')
const multer= require('multer')
const fs = require('fs')
const Products=require('../models/Products')
const router=express.Router();
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,

  fileFilter: fileFilter
});

// const fetchUser=require('../middleware/fetchuser')
router.post( '/addproduct',upload.single('images'),async (req, res)=>{
  
       try {

         product = await Products.create({
            title:req.body.title,
            desc:req.body.desc,
            price:req.body.price,
            images:req.file.path

        });
           res.json({"product":product})
       } catch (error) {
        res.json(
          { error: 'asdasdasd', message: error.message}
         )
       } 
        }
    )
    router.get('/allproducts', function (req, res) {
      let product = Products.find({}, function(err, product){
          if(err){
              console.log(err);
          }
          else {
              res.json(product);
          }
      });
  }
  ), 
    router.put('/updateproduct/:id',upload.single('images'), async (req, res) => {
      const { title, desc, price } = req.body;
      // Create a newProduct object 
      const  newProduct = {};
      if (title) { newProduct.title = title }
      if (desc) { newProduct.desc = desc };
      if (price) { newProduct.price = price };

      // Find the note to be updated and update it
      let product = await Products.findById(req.params.id);
      fs.unlinkSync(product.images)

      if (!product) { return res.status(404).send("Not Found") }
      product = await Products.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
      res.json(newProduct);
    }
    )
    router.delete('/deleteproduct/:id',async (req, res) => {
    
      // Find the note to be updated and update it
      let product = await Products.findById(req.params.id);
      fs.unlinkSync(product.images)
      if (!product) { return res.status(404).send("Not Found") }

      product = await Products.findByIdAndDelete(req.params.id)
      res.json("Success:Product has been deleted");
    
    }
    )
    module.exports=router;