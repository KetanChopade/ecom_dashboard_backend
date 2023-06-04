# ecom_dashboard_backend

> create app 
npx create-react-app gfg

> install bootstrap
> install jquery popper.js

npm install bootstrap jquery popper.js

> add bundle to index.js 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';

>  install react-router-dom
npm i react-router-dom

> app.js Stracture (must be else screen white )

import { BrowserRouter, Routes, Route } from "react-router-dom";

 <div className="App">
      <NavBar />
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
	
--------------------------------------------------------------------------------

	minimal ecom website referance- https://clauem2.arrowtheme.com/en/
	reactjs bootstrap website link - https://react-bootstrap.github.io/


---------------------------------------------------------------------------------------------------
 React and node JS(MERN) project Started (Mern stack e-comm dashboard complete project)
---------------------------------------------------------------------------------------------------

 >>>>Get input field value from html

> create html input field

 <Form.Group className="mb-3" controlId="Name">
	<Form.Label className="text-center">Name</Form.Label>
	<Form.Control type="text" placeholder="Enter Name" />
 </Form.Group>

> create useState hook to get data

const [name, setName] = useState("");

> Add value to useState

	<Form.Group className="mb-3" controlId="Name">
		<Form.Label className="text-center">Name</Form.Label>
		<Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />
	</Form.Group>

> Create function to get all input values and store in one function

    const collectData =()=> {
        console.log(name,email,password)
    }

--------------------------------------------------------------------------------

>>>>>> backend for register user


> install express , nodemon , mongoose

> nodemon 
"scripts": {
    "start": "nodemon"
  },
  
> create index.js 

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('./db/Config')
const app = express();
const User = require('./db/User');

// just for testing // route
// app.get('/', (req, res) => {
//     res.send("backend working...")
// });

app.use(express.json());
app.use(cors());
app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
});

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`app is running at ${port} port`))

> create db
> connect db 
 create db folder and inside that create config.js and add code 
 const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://chopadaketan:ESeHzhlR44kxF07E@cluster0.k1w4vqj.mongodb.net/?retryWrites=true&w=majority');
> create schema for database (table =myUsers)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required: true
  },
});

module.exports = mongoose.model("myUsers", UserSchema);

--------------------------------------------------------------------------------

>>> connect frontend to database ( integrate api) and if success redirect to home page 

    const collectData = async ()=> {
        let result = await fetch('http://localhost:5000/register', {
          method:'post',
          body:JSON.stringify({name,email,password}),
          headers:{
            'Content-Type': 'application/json'
          },
        });
        result =await result.json()
        console.log(result)
		
		// redirect to home
        if (result){
          navigate('/')
        }
    }

--------------------------------------------------------------------------------

keep user data in local storage 

localStorage.setItem("user",JSON.stringify(result));

--------------------------------------------------------------------------------

>>>> Private Component

>create Private Component and add logic

const PrivateComponent = () => {
    const auth = localStorage.getItem('user');
  return auth?<Outlet/>:<Navigate to='/logout'/>
}

> add component inside private component which you want to make private

	 <BrowserRouter>
      <Navbarr/>
      <Routes>

      <Route exact element={<PrivateComponent/>}>
      <Route  path="/" element={<Home />} />
      <Route  path="/shop" element={<h1>Shop</h1>} />
      <Route  path="/contact" element={<h1>Contact</h1>} />
      <Route  path="/profile" element={<h1>Profile</h1>} />
      </Route>

      <Route  path="/logout" element={<LogRegi/>} />
      </Routes>
      <Footers/>
     </BrowserRouter>
	 
--------------------------------------------------------------------------------

>>>> logout functioniality

> make a function for logout, clear local Storage to create logout and redirect user to signup

  const logout = ()=> {
    localStorage.clear();
  }
  <Nav.Link onClick={logout} href="logout">Logout</Nav.Link>

> 

--------------------------------------------------------------------------------

>>> Login functioniality (node)

> Make route for api 
  inside backend index.js , pass data from postman , fetch data from DB and Remove password from and login api
	// Login endpoint
	// pass data from postman
	app.post('/login', async (req, res) => {
  // fetch data from DB
    let user = await User.findOne(req.body).select('-password'); // Remove password from and login api
    if (req.body.email && req.body.password) {
        if (user) {
            res.send(user)
        } else {
             // Return an error if user not found
             res.status(401).json({ error: 'Invalid username or password' });
        }
    }  else {
        // Return an error if user not found
        res.status(401).json({ error: 'Invalid username or password' });
   }

});
    
--------------------------------------------------------------------------------

>>> Login functioniality (react) // React and node JS project in Hindi #15 Login Component UI

> make login component
> make login Route
> make input field
> get input data state

--------------------------------------------------------------------------------
#16

> test api with postman
	http://localhost:5000/login
	body>row>json
	{
    "email": "ketan12344@gmail.com",
    "password": "ketan1234"
}
	
> call api on login button click
 let result = await fetch('http://localhost:5000/login', {
          method:'post',
          body:JSON.stringify({email,password}),
          headers:{
            'Content-Type': 'application/json'
          },
        });
        result = await result.json()
        
> set localStorage > redirect page > Update navbar
if (result){
          localStorage.setItem("user",JSON.stringify(result));
          navigate('/')

        }

--------------------------------------------------------------------------------

# React and node JS project in Hindi #18 Add Product API

>> Make collection for products
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    // required: true
  },
  price: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    // required: true
  },
  userId: {
    type: String,
    // required: true
  },
  company: {
    type: String,
    // required: true
  },
});

module.exports = mongoose.model("Products", ProductSchema); 

>> Define model for add products
	> now add to index.js in backend
			const Product = require('./db/Product');
			
>> make route for add products
	// Add Product
	app.post("/add-Product", async (req, resp) => {
	  let product = new Product(req.body);
	  let result = await product.save();
	  resp.send(result);
	});
	
>> Send data from postman
	> http://localhost:5000/add-Product
	> {
    "name": "m 10",
    "price": "10",
    "category": "mobile",
    "userId": "ketan1234",
    "company": "samsung"
}

--------------------------------------------------------------------------------
	
	React and node JS project in Hindi #19 Add Product Component UI

>> Make new component
	> addProduct
>> Define input field
	> <>
      <div className="container">
        <div className="row justify-content-center my-4">
          <div className="col-6 add-product">
            <h1 className="text-center">Add Product</h1>
            <input
              type="type"
              className="form-control"
              placeholder="Enter Product Name"
              name="name"
              onChange={(e)=>{setName(e.target.value)}}
              value={name}
            />
            <input
              type="type"
              className="form-control"
              placeholder="Enter Product Price"
              name="price"
              onChange={(e)=>{setPrice(e.target.value)}}
              value={price}
            />
            <input
              type="type"
              className="form-control"
              placeholder="Enter Product Category"
              name="category"
              onChange={(e)=>{setCategory(e.target.value)}}
              value={category}
            />
            <input
              type="type"
              className="form-control"
              placeholder="Enter Product Company"
              name="company"
              onChange={(e)=>{setCompany(e.target.value)}}
              value={company}
            />
            <div className="row justify-content-center">
              <Button onClick={addProduct} className="col-3">Add Product</Button>
            </div>
          </div>
        </div>
      </div>
    </>
>> Add style to fields
>> Get Data from input field
	 > 
	 const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    const addProduct = () => {
        console.warn(name,price,category,company)
    }

--------------------------------------------------------------------------------

React and node JS project in Hindi #20 Call Add Product API

>> Get Use id from local storage
	> const userId = JSON.parse(localStorage.getItem('user'))._id;
	
>> call api to add product
	> let result = await fetch('http://localhost:5000/add-Product', {
          method:'post',
          body:JSON.stringify({name,price,category,company,userId}),
          headers:{
            'Content-Type': 'application/json'
          },
        });
		
>> Get the result and test flow
	result = await result.json();
        console.log(result)

--------------------------------------------------------------------------------

React and node JS project in Hindi #21 React js Form validation

>> check empty state

if(!name || !price || !company || !category) {
        setError(true)
        return false;
      }
	  
>> Show error message
 { error && !name &&  <span className="errorClass">Enter Valid name</span>}
>> Add style
>> test flow with input field

--------------------------------------------------------------------------------

>> make router for product List api  #22
// get all Products
app.get("/products", async (req, resp) => {
  let products = await Product.find();
  if(products.length>0){
    resp.send(products);
  }else {
    resp.send({result:"result not found"});
  }
});
>> Fatch data from api
http://localhost:5000/products
>> Test api with postman

--------------------------------------------------------------------------------

React and node JS project in Hindi #23 Integrate Product List API

>> Make function and define state
 const [products, setProducts] = useState([]);
>> call api for product list
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };
>> Render product list
     <div className="productList my-4">
        <ul>
          <li>S. No</li>
          <li>Name</li>
          <li>Price</li>
          <li>Company</li>
          <li>Category</li>
        </ul>
        {
          products.map((item, index) => 
          <ul>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.company}</li>
            <li>{item.category}</li>
          </ul>
      )
      }
      </div>
	  
--------------------------------------------------------------------------------
 
 React and node JS project in Hindi #24 Delete Product API
 
 >> Make Route for API
 // Delete Product
		app.delete("/product/:id", async (req, resp) => {
		let result = await Product.deleteOne({_id:req.params.id})
		resp.send(result);
});
 >> Get Id with params in api url
 http://localhost:5000/product/645c8a64628ce0844217e47d
 
 --------------------------------------------------------------------------------
 
 React and node JS project in Hindi #25 Integrate Delete Product API
 
 >> Add Delete column 
	<li><button className="delete-product" onClick={()=>deleteProduct(item._id)}>Delete</button></li>
	
 >> Make function for delete api call and Call delete product api
	const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method:'delete'
    });
    result = await result.json()
    if (result){
      getProducts();
    }
  };
 
 --------------------------------------------------------------------------------
 
 React and node JS project in Hindi #26 Update Product Component UI
 
  >> Add Link for update product 
	  <button className="update-product">
		  <Link to={`/updateProduct/${item._id}`}>Update</Link>
	  </button>
  >> Make component for update product
  > same as add product
  >> Make input field for update product
   > same as add product
  >> Colect input field data
   > same as add product
   
--------------------------------------------------------------------------------

React and node JS project in Hindi #27 API for get single product

>> Make api route and Fetch data from database
// get single Product
app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({_id:req.params.id})
  if(result){
    resp.send(result);
  }else {
    resp.send({result:"No result found"});
  }
});

--------------------------------------------------------------------------------

React and node JS project in Hindi #28 Prefill update form

>> Get id from url params and >> fetch product data

const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.warn(result); 
        setName(result.name)
        setName(result.price)
        setName(result.category)
        setName(result.company)
    }
	
>> set data in input field
	const params = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
	
--------------------------------------------------------------------------------

 React and node JS project in Hindi #29 Update Product API

>> Make a new route for api and Write code for update DB
	// update single Product
	app.put("/product/:id", async (req, resp) => {
	  let result = await Product.updateOne({_id:req.params.id},
		{
		  $set : req.body
		}
	  )
	  resp.send(result);
	});

--------------------------------------------------------------------------------

 React and node JS project in Hindi #30 Update Product API
 
 >> Use Fetch method for api integration and Send data with the put method
     const updateProduct = async () => {
        console.warn(name,price,category,company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
          method:'put',
          body:JSON.stringify({name,price,category,company}),
          headers:{
            'Content-Type': 'application/json'
          },
        });
        result = await result.json()
        console.warn(result)
        
    }
 >> 
 >> Redirect to product list page
 navigate('/shop')
 
--------------------------------------------------------------------------------

 React and node JS project in Hindi #31 Search API for Product
 
 >> Make a new route for api and Write code for Search and fetch data from DB
 
	 // Search Product
	app.get("/search/:key", async (req, resp) => {
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
	
--------------------------------------------------------------------------------

 React and node JS project in Hindi #32 Search API for Product
 
 >> Make input field for search
 <h4 className="text-center">
        <input
          className="text-center"
          type="text"
          placeholder="Search Product"
          onChange={searchHandle}
        />
      </h4>
 >> make search handle function and call api for search product
	  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  
 >> If no search result found then give text
 {products.length>0? products.map((item, index) => : <h1 className="text-center mt-3">No Result Found</h1>
 
--------------------------------------------------------------------------------

React and node JS project in Hindi #33 JWT token Authentication

>> Add jwt package
	npm i jsonwebtoken
>> Define the key for token
	const Jwt = require("jsonwebtoken");
	const JwtKey = 'e-comm';
>> Add token with login and registraion
>   if (user) {
     Jwt.sign({user},JwtKey,{expiresIn:'2h'},(err,token) => {
      if (err){
        resp.send({result:'somthing went wrong ,please try again'});
      }
      resp.send({user,auth:token});
     })
>
  Jwt.sign({result},JwtKey,{expiresIn:'2h'},(err,token) => {
    if (err){
      resp.send({result:'somthing went wrong ,please try again'});
    }
    resp.send({result,auth:token});
   })
   
--------------------------------------------------------------------------------

	React and node JS project in Hindi #34 Handle Auth Token in React js
	
>> Get token from api (Login and register)

	    if (result.auth){
          localStorage.setItem("user",JSON.stringify(result.user));
          localStorage.setItem("token",JSON.stringify(result.auth));
          navigate('/')

        }
		
>> store token in localStorage

	localStorage.setItem("user",JSON.stringify(result.user));
    localStorage.setItem("token",JSON.stringify(result.auth));
		  
>> update api request for testing token
	if (result.auth){
          localStorage.setItem("user",JSON.stringify(result.user));
          localStorage.setItem("token",JSON.stringify(result.auth));
          navigate('/')

        }
 if (result){
          localStorage.setItem("user",JSON.stringify(result.result));
          localStorage.setItem("token",JSON.stringify(result.auth));
          navigate('/')

        }

--------------------------------------------------------------------------------

 React and node JS project in Hindi #35 Verify Jwt Auth Token in Node js
 
 >> send token with postman
 authorization> bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0MzNmNGY3OTNlMjhkNjU3MmNkNThmMyIsIm5hbWUiOiJrZXRhbiIsImVtYWlsIjoia2V0YW5AZ21haWwuY29tIiwiX192IjowfSwiaWF0IjoxNjg0MTQ2NzI1LCJleHAiOjE2ODQxNTM5MjV9.2fhwrx7O6yrqDcWQ3hCE3qDOMA7iFZvO55Z9oKA934E
 >> make middleware for verifying token 
 > Add verifyToken to all api's (example)
	app.get("/search/:key", verifyToken, async (req, resp) => {
 
 > Create function 
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
 >> verify token and send response
 
--------------------------------------------------------------------------------

React and node JS project in Hindi #36 Send Auth Token from React js

>> Check API Response without token
>> Send Token in All API
 headers:{
           
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
          },
		  
> example in addProduct 
let result = await fetch('http://localhost:5000/add-Product', {
          method:'post',
          body:JSON.stringify({name,price,category,company,userId}),
          headers:{
            'Content-Type': 'application/json',
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
          },
        });
>> Test All API with token


--------------------------------------------------------------------------------

Done ! Now You have learned everything ;)


--------------------------------------------------------------------------------

Form validation

Complete React Form Validation using Formik & Yup in Hindi\
https://www.youtube.com/watch?v=0S-pyTJ2ZvU&t=980s

--------------------------------------------------------------------------------
code available insie react > react-form-validation

>> create project
>> Install formik and yup
	> npm i formik yup
>> import formik
	> import { useFormik } from 'formik';

>> Define initialValues must be same as form name element
	> const initialValues = {
    name:'',
    email:'',
    pswd:'',
    cpswd:''
}

>> Create formik funtion
	> const { values , errors , touched, handleBlur , handleChange,handleSubmit } = useFormik({
		initialValues:initialValues,
		onSubmit : (values) => {
			console.warn(values)
		}
	})
	console.warn(Formik)

>> add values name , onChange={handleChange}, onBlur={handleBlur} inside input
	> <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

>> Add on onSubmit funtion in form
	> <form onSubmit={handleSubmit}>
	
>> Create schema 

	> import * as yup from 'yup';

	export  const SignupSchema = yup.object({
		name:yup.string().min(2).max(20).required("Please enter your name"),
		email:yup.string().email().required("Please enter your email"),
		pswd:yup.string().min(6).required("Please enter your password"),
		cpswd:yup.string().required("Please enter confirm password").oneOf([yup.ref("pswd"),null],"password must match"),
	});
	
>> export SignupSchema  
	> import { SignupSchema } from "../schema";

>> Fetch schema inside formik function after initialValues
	> validationSchema:SignupSchema,
	
>> add error code in p tag after input field
	> { errors.email && touched.email ? ( <p> {errors.email} </p> ) :null }
	
>> to clear form after submition create action parameters and use in onsubmit
	> onSubmit : (values,action) => {
			console.warn(values)
			action.resetForm()
		}

--------------------------------------------------------------------------------
