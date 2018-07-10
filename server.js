var express = require("express"),
  app = express();
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  jwt= require('jsonwebtoken');
app.use(cors({ origin: "http://localhost:4200" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.Promise = require("q").Promise;
mongoose.connect("mongodb://localhost:27017/customers");
require("./models/customers.js");
const Customers = mongoose.model("customers");
var db = mongoose.connection;
db.on("error", function() {
  console.log("error happened");
});
db.on("open", function() {
  console.log("connection established");
});
c
app.post("/register", function(req, res) {
  console.log(req.body);
  var newCustomer= {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location
  };
  new Customers(newCustomer).save().then(function(customers) {
    res.send({
      isRegisterIn: true
    });
  });
});
app.use(function(req,res,next){
  var token= req.body.authtoken || req.query.authtoken || req.headers['authtoken'];
jwt.verify(token,'secret-key',function(err,decoded){
  if(err){
    res.send({err :true,
    msg : 'invalid request'
    });
  }else{
    req.decoded = decoded;
    next();
  }

});
});
app.get("/getproducts", function(req, res) {
console.log(req.decoded);
  res.send([
    {
      productId: 1,
      productName: "Leaf Rake",
      productCode: "GDN-0011",
      releaseDate: "March 19, 2016",
      description: "Leaf rake with 48-inch wooden handle.",
      price: 19.95,
      starRating: 3.2,
      imageUrl:
        "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    },
    {
      productId: 2,
      productName: "Garden Cart",
      productCode: "GDN-0023",
      releaseDate: "March 18, 2016",
      description: "15 gallon capacity rolling garden cart",
      price: 32.99,
      starRating: 4.2,
      imageUrl:
        "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
    },
    {
      productId: 5,
      productName: "Hammer",
      productCode: "TBX-0048",
      releaseDate: "May 21, 2016",
      description: "Curved claw steel hammer",
      price: 8.9,
      starRating: 4.8,
      imageUrl:
        "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
    },
    {
      productId: 8,
      productName: "Saw",
      productCode: "TBX-0022",
      releaseDate: "May 15, 2016",
      description: "15-inch steel blade hand saw",
      price: 11.55,
      starRating: 3.7,
      imageUrl:
        "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
    },
    {
      productId: 10,
      productName: "Video Game Controller",
      productCode: "GMG-0042",
      releaseDate: "October 15, 2015",
      description: "Standard two-button video game controller",
      price: 35.95,
      starRating: 4.6,
      imageUrl:
        "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
    }
  ]);
});
app.listen(3000, function() {
  console.log("server runnnig @localhost:3000");
});
