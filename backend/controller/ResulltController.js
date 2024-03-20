const result = require ("../dataBase/model/resultSchema")
const question = require("../dataBase/model/questionSchema")
const { ObjectId } = require('mongodb');



const createAnswer = async (req , res) =>{

    var totalMark = 0;
    var wrongAnswer= 0;
    var correctAnswer = 0;

    try {

        const allQ = await question.find()
        const {...data}= req.body;
        console.log(data.userId);
        if(data){
            await data.mark.map( async (id , index)=>{
                await allQ.map( async (question , index) =>{
                    const filteredAnswers = question.answer.filter(answer => id === (answer.id));
                    if(filteredAnswers[0]?.bolean == true){
                        totalMark  += 5;
                        correctAnswer += 1;
                    }else if(filteredAnswers[0]?.bolean == false){
                        wrongAnswer += 1;
                    }
                    
                })
            })


            const singleResult = await result.create({
                userName:data.userName,
                userId:data.userId,
                totalMark:totalMark,
                wrongAnswerCount:wrongAnswer,
                correctAnswerCount:correctAnswer
            })
            if(singleResult){
                res.status(200).json(singleResult)
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}




const getSingleAnswer = async (req , res) =>{

    const {id} = req.params
    console.log(id);

    const singleData = await result.aggregate([{
        $match:{
            userId:id
        }
    }])

    if(singleData){
        res.status(200).json(singleData)
        console.log(singleData);
    }

    
}




module.exports = {createAnswer , getSingleAnswer} 