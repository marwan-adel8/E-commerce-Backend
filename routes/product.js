import express from "express";
const api = process.env.API_URL;
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const router = express.Router();


//"https:localhost:3000/api/v1/"
router.get(`/`,async (req, res) => {

    let filter = {};
    if(req.query.categories){
        filter.category = req.query.category
    }
    const productList = await Product.find(filter).populate("category");
    if(!productList){
        res.status(500).json({
            success: false,
            message: "No products found"
        });
    }

    res.send(productList);
});

router.get(`/count`,async (req, res) => {
    const productCount = await Product.find().countDocuments();
    if(!productCount){
        res.status(500).json({
            success: false,
            message: "No products found"
        });
    }

    res.send({
        productCount: productCount
    });
});

router.get(`/featured`,async (req, res) => {
    const product = await Product.find({isFeatured:true});
    if(!product){
        res.status(500).json({
            success: false,
            message: "No products found"
        });
    }

    res.send(product);
});

router.get(`/:id`,async (req, res) => {
        const product = await Product.findById(req.params.id).populate("category");
    if(!product){
        res.status(500).json({
            success: false,
            message: "No products found"
        });
    }

    res.send(product);
    });

router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category);
    if(!category) {
       res.status(400).send("Invalid Category"); 
    } 
    // استخدمت let علشان عرفتها تحت تاني 
    let product = new Product({
        name: req.body.name,
        image: req.body.image,
        stock: req.body.stock,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        isFeatured: req.body.isFeatured,
    });

product = await product.save();

if(!product){
     res.status(500).send("The product cannot be created")

    }
    res.send(product)
});


router.put(`/:id`,async (req, res) => {
    const category = await Category.findById(req.body.category);
    if(!category) {
       res.status(400).send("Invalid Category"); 
    } 
    
    const product = await Product.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        image: req.body.image,
        stock: req.body.stock,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        isFeatured: req.body.isFeatured,
    },{new: true},);


     if(!product){
     return res.status(500).json({
            success: false,
            message: "product cannot be updated"
        });
    }
   return res.send(product);


});



router.delete(`/:id`,(req, res) => {
    Product.findByIdAndDelete(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({
                success:true,
                message:"the product is deleted"
            })
        } else{
        return res.status(404).json({
            success:false,
            message:"product not found"})
        }
        }).catch(err=>{
            return res.status(400).json({
                success:false,
                error:err
            })
        })
    })

export default router;