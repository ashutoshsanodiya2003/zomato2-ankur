const foodModel = require('../models/food.model.js')
const storageService = require('../services/storage.service.js')
const {v4:uuid} = require('uuid')
const likeModel = require('../models/likes.model.js')


async function createFood(req,res) {
    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file)
    console.log("foodPartner:", req.foodPartner);


const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid())


const foodItem = await foodModel.create({
    name:req.body.name,
    description:req.body.description,
    video: fileUploadResult,

    foodPartner:req.foodPartner._id
})

    res.status(201).json({
        message:"food created successfully",
        food:foodItem
    })
}


async function getFoodItems(req,res) {
    
    const foodItems = await foodModel.find({}) 

    res.status(200).json({
        message:"Food items fetched successfully",
        foodItems
    })
}



async function likeFood (req,res){

const {foodId} = req.body
const user = req.user

const isAlreadyLiked = await likeModel.findOne({
    user:user._id,
    food:foodId
})

if(isAlreadyLiked){
    await likeModel.deleteOne({
        user:user._id,
        food:foodId
    })
    return res.status(200).json({
        message:"Food Unliked successfully"
    })
}


const like = await likeModel.create({
    user:user._id,
    food:foodId
})

res.status(201).json({
    message:"food liked successfully",
    like
})
}



module.exports= {createFood, getFoodItems,likeFood}