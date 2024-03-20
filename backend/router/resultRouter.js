 
const express=require("express") 
const {getSingleAnswer , createAnswer} = require("../controller/ResulltController")
const router=express.Router() 


router.route("/").post(createAnswer)

router.route("/:id").get(getSingleAnswer)




module.exports=router