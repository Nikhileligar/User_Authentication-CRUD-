const {createUser,getUsersById,getUsers,updateUsers,deleteUserById,login} = require("./user.controller");

const router = require("express").Router();

const {checkToken } = require("../../auth/tokenValidation");


router.post("/",checkToken,createUser); //if anyone is accessing this route
                            //pass the user to the createUser
router.get("/",checkToken,getUsers);

router.get("/:id",checkToken,getUsersById);

router.patch("/",checkToken,updateUsers);

router.delete("/",checkToken,deleteUserById);

router.post("/login",login); //except login we will not have checkToken method because from login itself we have created 

module.exports=router;                            