const foodPartnerModel = require('../models/foodpartner.models.js')
const foodModel = require('../models/food.model.js')

async function getFoodPartnerById(req, res) {
    try {
        const foodPartnerId = req.params.id
        console.log('getFoodPartnerById: id=', foodPartnerId)
       


        const foodPartner = await foodPartnerModel.findById(foodPartnerId)
        console.log('getFoodPartnerById: found=', !!foodPartner)

        if (!foodPartner) {
            return res.status(404).json({
                message: "Food partner not found"
            })
        }

        const foodItemsByFoodPartner = await foodModel.find({
            foodPartner: foodPartnerId
        })

        res.status(200).json({
            message: "Food Partner retrieved successfully",
            foodPartner:{  
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

async function getFoodPartnerMe(req, res) {
    try {
        const foodPartner = req.foodPartner

        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" })
        }

        const foodItemsByFoodPartner = await foodModel.find({
            foodPartner: foodPartner._id
        })

        res.status(200).json({
            message: "Food Partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = { getFoodPartnerById, getFoodPartnerMe }
