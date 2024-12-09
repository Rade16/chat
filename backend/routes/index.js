const Router = require("express");

const router = new Router();

const authRouter = require("./authRouter");
const messageRouter = require("./messageRouter");

router.use("/auth", authRouter);
router.use("/messages", messageRouter);

module.exports = router;
