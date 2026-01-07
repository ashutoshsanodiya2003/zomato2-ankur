
const express = require ('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes.js')
const foodRoutes = require('./routes/food.routes.js')
const foodPartnerRoutes = require('../src/routes/food-partner.routes.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"https://zomato2-ankur-fye1.vercel.app",
    credentials:true
}))

app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)

app.use('/api/food', foodRoutes)

app.use('/api/food-partner',foodPartnerRoutes)

module.exports = app;