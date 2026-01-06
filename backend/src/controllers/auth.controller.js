const { models } = require("mongoose");
const userModel = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const foodPartnerModel = require('../models/foodpartner.models.js')

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  console.log("BODY:", req.body)


//   const isUserAlreadyExists = userModel.findOne({
//     email,
//   });

const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "user already exists",
    });
  }

  const hashedPassword =  await bcrypt.hash(password, 10)

  const user = await userModel.create({
    fullName,email,password:hashedPassword
  })
  console.log(user)

  const token = await jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  console.log(token)

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.status(201).json({
    message:"User Registered  successfully",
    fullName:user.fullName,
  email:user.email,
  token,
  id:user._id
  }
  
)
}


async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password"
    });
  }

  // ✅ Use the correct field name from DB
  const isPasswordValid =  bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password"
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User login successfully",
    token,
    email: user.email,
    _id: user._id
  });
}

async function logoutUser(req,res) {
  res.clearCookie("token")

  res.status(200).json({
    message:"User logout successfully"
  })


  
}

async function registerFoodPartner(req,res) {
  console.log('registerFoodPartner payload:', req.body)
  const {businessName,email,password } = req.body

  // Validate required fields and return helpful 400 message
  if (!businessName || !email || !password ) {
    return res.status(400).json({ message: 'Missing required fields: businessName, contactName, phone, email, password, address' })
  }

  const isAccountAlreadyExists = await foodPartnerModel.findOne({ email })
  if(isAccountAlreadyExists){
    return res.status(400).json({
      message:"Account already exists"
    })
  } 

  const hashedPassword = await bcrypt.hash(password,10)

  const foodPartner = await foodPartnerModel.create({
    businessName, 
    email,
    password:hashedPassword,
    

  })

  const token = await jwt.sign(
    {_id:foodPartner._id},
    process.env.JWT_SECRET
  )

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.status(200).json({
    message:"foodPartner registered successfully",
    _id:foodPartner._id,
    token,
    businessName:foodPartner.businessName,
    email:foodPartner.email,
    
    
  })
}









async function loginFoodPartner(req, res) {
  try {
    const { email, password } = req.body;

    // 🔎 Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 🔍 Check account
    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 🔐 Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foodPartner.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 🔑 Generate JWT
    const token = jwt.sign(
      { _id: foodPartner._id, role: "partner" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🍪 Set cookie
    res.cookie("token", token, 
      {httpOnly: true,
      
      maxAge: 7 * 24 * 60 * 60 * 1000},
    );

    // ✅ Success response
    return res.status(200).json({
      message: "Login successful",
      _id: foodPartner._id,
      businessName: foodPartner.businessName,
      email: foodPartner.email,
      
      role: "partner",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}


function logoutFoodPartner (req, res){
  res.clearCookie("token")

  res.status(201).json({
    message :"food Partner logout successfully"
  })
}


module.exports = { registerUser, loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner };
