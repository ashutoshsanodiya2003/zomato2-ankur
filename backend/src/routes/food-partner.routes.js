const express = require('express')
const foodPartnerController = require('../controllers/food-partner.controller.js')
const authMiddleware = require('../middlewares/auth.middleware.js')
const router = express.Router()


router.get("/me", authMiddleware.authFoodPartnerMiddleware, foodPartnerController.getFoodPartnerMe)
// Public read: allow viewing partner by id without authentication
router.get("/:id", foodPartnerController.getFoodPartnerById)

module.exports = router