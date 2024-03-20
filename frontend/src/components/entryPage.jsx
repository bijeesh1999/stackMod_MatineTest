import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import "./entry.css";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

function Entry() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      localStorage.setItem("userId", uuidv4());
      localStorage.setItem("name", values.name);
      localStorage.setItem("email", values.email);
      setTimeout(() => {
        navigate("/question");
      }, 1000);
    },
  });

  console.log(formik.values);

  return (
    <>
      <form id="registrationForm" onSubmit={formik.handleSubmit}>
        <h2>Exam Registration</h2>
        <div className="inputBlock">
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="inputBlock">
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <button type="submit">Start Exam</button>
      </form>
    </>
  );
}

export default Entry;
