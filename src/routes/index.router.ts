import * as express from 'express'
const router = express.Router()
const { lastPosted, frequentWords } = require("../controller/index.controller")
router.route("/last/posted").get(lastPosted)
router.route("/words").get(frequentWords)

module.exports = router