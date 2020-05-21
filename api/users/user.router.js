const { createUser, showUser, updateUser,deleteUser } = require('./user.controller');
const router = require('express').Router();

router.post("/",createUser);
router.get("/showUser",showUser);
router.post("/updateUser",updateUser);
router.delete("/deleteUser",deleteUser);

module.exports = router; 
