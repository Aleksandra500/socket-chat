const express = require('express')
const messageController = require('../controllers/messageController')


const router = express.Router()


router.get("/test", (req, res) => {
  res.send("Ruta radi ✅");
});

router.route('/').get(messageController.getAllMessages)
router.route('/').post(messageController.addMessage)


module.exports = router;