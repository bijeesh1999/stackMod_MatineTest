

const question = require("../dataBase/model/questionSchema")

const createQuestion = async (req , res) =>{
    try {

        const {...data} = req.body;
        console.log(data);

        if(data){
            const quiestion = await question.create(data)
            if(quiestion){
                res.status(200).json(quiestion)
            }else{
                res.status(400).json("error")
            }
        }
        
    } catch (error) {
        console.log(error);
    }

    


}

const getAllQuestion = async (req , res) =>{

    try {
        const allQ = await question.find()
        if(allQ){
            res.status(200).json(allQ)
        }
        
    } catch (error) {
        console.log(error);
    }

    
}



module.exports = {createQuestion , getAllQuestion} 