import React ,{useEffect, useState}from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./sucess.css"

function Sucess() {
  const navigate = useNavigate()
  const [id , setId] = useState(localStorage.getItem("userId"))
  const [data , setData]= useState('')
  const [status , setstatus]= useState("")

  const getSingleResult = async (id) =>{
    console.log(id);
    const singledata = await axios.get(`http://localhost:8086/result/${id}`)
    await setData(singledata.data[0])
  }

  useEffect(()=>{
    getSingleResult(id)
  },[id])

  useEffect(()=>{
    if(data.correctAnswerCount < data.wrongAnswerCount){
      setstatus("You failed try again")
    }else{
      setstatus("You have successfully passed the exam")

    }
  },[data])

  const retry = () =>{
    localStorage.removeItem("name")
    localStorage.removeItem("userId")
    localStorage.removeItem("email")
    setTimeout(() => {
      navigate("/")
    }, 500);
  }

  console.log(data);
  return (
    <>
      <div className="success-message">
        <h2>Congratulations {data.userName} you've completed the exam!</h2>
        <p>
          Your score: <span id="score">{data.totalMark}</span>
        </p>
        <p style={{color:"green"}}>
          Correct answers: <span id="score">{data.correctAnswerCount}</span>
        </p>
        <p style={{color:"red"}}>
          Wrong answers: <span id="score">{data.wrongAnswerCount}</span>
        </p>
        <p>{status}</p>
        <button onClick={retry}>Take Exam Again</button>
      </div>
    </>
  );
}

export default Sucess
 
