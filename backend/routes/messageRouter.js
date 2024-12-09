const Router = require("express");
const router = new Router();

const MessageController = require("../controllers/MessageController");

router.post("/messages", MessageController.sendMessage);
router.get("/messages", MessageController.getMessages);
module.exports = router;