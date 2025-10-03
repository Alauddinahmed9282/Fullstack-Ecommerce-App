const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("HELLOW USER ROUTER");
});

module.exports = router;
