import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { Formik, Form, Field, FieldArray } from 'formik';
import axios from "axios";

function QuestionPage() {
  const [question, setQuestion] = useState([]);
  const [singleQ, setSingleQ] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [qindex, setQIndex] = useState(0);


  const formik = useFormik({
    initialValues: {
        answers:[],

    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });




  const getAllQuestions = async () => {
    const arr = [];
    const answer = [];
    const questions = await axios.get("http://localhost:8086/question");
    const allanswer = await axios.get("http://localhost:8086/answer");
    if (questions) {
      arr.push(questions.data);
    }
    if (allanswer) {
      answer.push(allanswer.data);
    }
    setQuestion(arr);
    setAnswer(answer);
  };


  console.log(answer);

  useEffect(() => {
    getAllQuestions();
  }, []);

  const handleIndex = (index) => {
    setQIndex(index);
  };

  useEffect(() => {
    question[0]?.map((data, index) => {
      if (index === qindex) {
        setSingleQ(data);
       const newarr =  [...formik.values.answers]
        newarr.push({answer:""})

      }
    });
  }, [qindex]);




  return (
    <>
      <h2>Question{qindex+1}</h2>
      <h4>find {singleQ?.Question}</h4>
      <p>Please select your answer:</p>
      <div className="options">
        {answer[0]?.map((data , index) => (
          <label className="label" key={index}>
            <input type="radio" name="answer" value="Option1" />
            <h4>{data?.answer}</h4>
          </label>
        ))}
      </div>
      <div className="buttons">
        <button
          type="button"
          id="prevBtn"
          onClick={() => handleIndex(qindex - 1)}
        >
          Previous
        </button>
        <button
          type="submit"
          id="nextBtn"
          onClick={() => handleIndex(qindex + 1)}
        >
          Next
        </button>
      </div>
      {/* </form> */}
    </>
  );
}

export default QuestionPage;
