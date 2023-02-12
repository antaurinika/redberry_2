import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Resume from "../components/Resume";
import Header from "../components/Header";
import InputCss from "../styles/InputField.module.css";
import PageCss from "../styles/Page.module.css";
import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";
import AddMoreButton from "../components/AddMoreButton";
import InputField from "../components/formFields/InputField";
import TextAreaField from "../components/formFields/TextAreaField";
import ExperineceValidation from "../components/validationRules/ExperineceValidation";
const initialValues = {
  experiences: {
    position: "",
    employer: "",
    start_date: "",
    due_date: "",
    description: "",
  },
};

export default function Experience() {
  const formData2 = JSON.parse(sessionStorage.getItem("formData2"));
  const formData3 = JSON.parse(sessionStorage.getItem("formData3"));

  const navigate = useNavigate();
  const [value, setValue] = useState(initialValues.experiences);

  useEffect(() => {
    if (
      value.position === "" &&
      value.employer === "" &&
      value.start_date === "" &&
      value.due_date === "" &&
      value.description === ""
    ) {
      setValue((prev) => (prev = { ...prev, ...formData2 }));
    }
    Object.assign(formik.values, formData2);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("formData2", JSON.stringify(value));
  }, [value]);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue((prev) => (prev = { ...prev, [name]: value }));
  };

  const onSubmit = (values) => {
    navigate("/education");
    setValue((prev) => (prev = { ...prev, ...formData2 }));
  };

  const formik = useFormik({
    initialValues: value,
    onSubmit,
    validate: ExperineceValidation,
  });

  return (
    <div className={`${PageCss.window}`}>
      <div className={PageCss.container}>
        <Header title="გამოცდილება" pageCount={2} formik={formik} />
        <form
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          className={PageCss.form}
        >
          <InputField
            formik={formik}
            label="თანამდეობა"
            type="text"
            name="position"
            placeholder="დეველოპერი, დიზაინერი, ა.შ."
            inputSize="inputFieldLong"
            errorMessage="მინიმუმ 2 სიმბოლი"
          />
          <InputField
            formik={formik}
            label="დამსაქმებელი"
            type="text"
            name="employer"
            placeholder="დამსაქმებელი"
            inputSize="inputFieldLong"
            errorMessage="მინიმუმ 2 სიმბოლი"
          />
          <div className={InputCss.shortInputContainer}>
            <InputField
              formik={formik}
              label="დაწყების რიცხვი"
              type="date"
              name="start_date"
              inputSize="inputFieldShort"
              required={true}
            />
            <InputField
              formik={formik}
              label="დამთავრების რიცხვი"
              type="date"
              name="due_date"
              inputSize="inputFieldShort"
              required={true}
            />
          </div>
          <TextAreaField
            name="description"
            label="აღწერა"
            formik={formik}
            placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
          />
          <span className={InputCss.underline}></span>
          <AddMoreButton title="გამოცდილების" />
          <div>
            <BackButton title="გამოცდილების" />
            <NextButton title="შემდეგი" />
          </div>
        </form>
      </div>
      <Resume showResume={true} formData2={formData2} formData3={formData3} />
    </div>
  );
}
