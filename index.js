const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./db/Config");
const app = express();
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const JwtKey = 'e-comm';

// just for testing // route
// app.get('/', (req, res) => {
//     res.send("backend working...")
// });
app.use(express.json());
app.use(cors());


// register endpoint
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({result},JwtKey,{expiresIn:'2h'},(err,token) => {
    if (err){
      res.send({result:'somthing went wrong ,please try again'});
    }
    res.send({result,auth:token});
   })
});

// Login endpoint
app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
     Jwt.sign({user},JwtKey,{expiresIn:'2h'},(err,token) => {
      if (err){
        resp.send({result:'somthing went wrong ,please try again'});
      }
      resp.send({user,auth:token});
     })
    } else {
      resp.send({ result: "No User found" });
    }
  } else {
    resp.send({ result: "No User found" });
  }
});

// Add Product
app.post("/add-Product", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

// get all Products
app.get("/products", verifyToken , async (req, resp) => {
  let products = await Product.find();
  if(products.length>0){
    resp.send(products);
  }else {
    resp.send({result:"result not found"});
  }
});

// Delete Product
app.delete("/product/:id", verifyToken , async (req, resp) => {
  let result = await Product.deleteOne({_id:req.params.id})
  resp.send(result);
});

// get single Product
app.get("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.findOne({_id:req.params.id})
  if(result){
    resp.send(result);
  }else {
    resp.send({result:"No result found"});
  }
});

// update single Product
app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne({_id:req.params.id},
    {
      $set : req.body
    }
  )
  resp.send(result);
});

// Search Product
app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
      "$or" : [
        { name: { $regex:req.params.key } },
        { price: { $regex:req.params.key } },
        { category: { $regex:req.params.key } },
        { company: { $regex:req.params.key } },
      ]
    }
  );
  resp.send(result)
});

function verifyToken(req,resp,next) {
  let token = req.headers['authorization'];
  if(token){
    token = token.split(' ')[1];
    Jwt.verify(token,JwtKey,(err,valid) =>{
      if(err){
        resp.status(401).send({result:"Please Provide valid token"});
      }else{
        next();
      }
    })
  }else{
    resp.status(403).send({result:"Please Add token with header"});
  }
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app is running at ${port} port`));
