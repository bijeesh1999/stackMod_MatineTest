 
const express=require("express") 
const {createQuestion , getAllQuestion} =require('../controller/questionControlle')
const router=express.Router() 


router.route("/").get(getAllQuestion).post(createQuestion)


// router.route("/:id").get().put()




module.exports=router