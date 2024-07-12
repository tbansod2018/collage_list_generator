const express = require("express")
const { addCollege} = require("../contollers/ScoreController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.use(requireAuth)

router.post('/',addCollege)

module.exports = router