const { createUser, showUser, updateUser,deleteUser,storeinPdfs, login} = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validations')

router.post("/",createUser);
router.get("/showUser",showUser);
router.post("/updateUser",checkToken,updateUser);
router.delete("/deleteUser/:id",deleteUser);
router.get("/storeinPdfs",checkToken,storeinPdfs);
router.post("/login", login)

module.exports = router; 
