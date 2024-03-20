import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

function QuestionPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(true);
  const [submit, setSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    radioField: Yup.string().required("Please select an option"),
  });

  const apiCall = async () => {
    const res = await axios.get("http://localhost:8086/question");
    setQuestions(res.data);
    setIndex(0);
  };
  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    setQuestion(Questions[index]?.Q);
    setAnswer(Questions[index]?.answer);
  }, [index]);

  const goToNextQuestion = () => {
    if (index < Questions.length - 1) {
      setIndex(index + 1);
      setPrev(false);
    }
    if (index === Questions.length - 1) {
      setNext(true);
      setSubmit(true);
    } else {
      setNext(false);
    }
  };
  const gotoPrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      setNext(false);
    }
    if (index === 1) {
      setPrev(true);
    } else {
      setPrev(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          userName: localStorage.getItem("name"),
          userId: localStorage.getItem("userId"),
          mark: [],
        }}
        onSubmit={(values, { resetForm }) => {
          axios.post("http://localhost:8086/result", values);
          setTimeout(() => {
            resetForm();
            navigate("/sucess");
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Form id="questionForm">
            <h3>{question}</h3>
            <FieldArray
              name="mark"
              render={(arrayHelpers) => (
                <>
                  <div className="options">
                    {answer?.map((ans, indx) => (
                      <div key={indx}>
                        <Field
                          type="radio"
                          name={`mark.${index}`}
                          value={ans._id}
                          required
                        />
                        {ans.a}
                      </div>
                    ))}
                  </div>

                  <div className="buttons">
                    <button
                      type="button"
                      onClick={gotoPrevious}
                      disabled={prev}
                    >
                      {"<< prev"}
                    </button>
                    <button
                      type="button"
                      onClick={goToNextQuestion}
                      disabled={next}
                    >
                      {"next >>"}
                    </button>
                    {submit ? <button type="submit">Submit</button> : null}
                  </div>
                </>
              )}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default QuestionPage;
