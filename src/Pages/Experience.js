import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Resume from "../components/Resume";
import Header from "../components/Header";
import InputCss from "../styles/InputField.module.css";
import PageCss from "../styles/Page.module.css";
import Flexbox from "../styles/Flexbox.module.css";
const initialValues = {
  experiences: {
    position: "",
    employer: "",
    start_date: "",
    due_date: "",
    description: "",
  },
};

const validate = (values) => {
  let errors = {};
  if (!values.position) {
    errors.position = "გამოცდილება სავალდებულოა";
  } else if (values.position.length < 2) {
    errors.position = "მინიმუმ 2 სიმბოლო";
  }
  if (!values.employer) {
    errors.employer = "სავალდებულოა";
  } else if (values.employer.length < 2) {
    errors.employer = "მინიმუმ 2 სიმბოლო";
  }
  if (!values.start_date) {
    errors.start_date = "სავალდებულოა";
  }
  if (!values.due_date) {
    errors.start_date = "სავალდებულოა";
  }
  if (!values.description) {
    errors.description = "სავალდებულოა";
  }
  return errors;
};

export default function Experience() {
  const navigate = useNavigate();
  const [value, setValue] = useState(initialValues.experiences);
  const formData2 = JSON.parse(sessionStorage.getItem("formData2"));
  useEffect(() => {
    if (
      value.position === "" &&
      value.employer === "" &&
      value.start_date === "" &&
      value.due_date === "" &&
      value.description === ""
    ) {
      setValue((prev) => (prev = { ...prev, ...formData2 }));
      Object.assign(formik.values, formData2);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("formData2", JSON.stringify(value));
    Object.assign(formik.values, formData2);
  }, [value]);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue((prev) => (prev = { ...prev, [name]: value }));
    Object.assign(formik.values, formData2);
  };

  const onSubmit = (values) => {
    navigate("/education");
    setValue((prev) => (prev = { ...prev, ...formData2 }));
  };

  const formik = useFormik({
    initialValues: value,
    onSubmit,
    validate,
  });
  console.log(formik.errors);

  return (
    <div className={`${PageCss.window}`}>
      <div className={PageCss.container}>
        <Header title="გამოცდილება" pageCount={2} />
        <form
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          className={PageCss.form}
        >
          <div className={InputCss.containerLong}>
            <label htmlFor="position" className={InputCss.label}>
              თანამდებობა
            </label>
            <input
              className={InputCss.inputFieldLong}
              type="text"
              name="position"
              id="position"
              placeholder="დეველოპერი, დიზაინერი, ა.შ."
              value={value.position}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className={InputCss.error}>მინიმუმ 2 სიმბოლი</p>
          </div>
          <div className={InputCss.containerLong}>
            <label htmlFor="employer" className={InputCss.label}>
              დამსაქმებელი
            </label>
            <input
              className={InputCss.inputFieldLong}
              type="text"
              name="employer"
              id="employer"
              placeholder="დამსაქმებელი"
              value={value.employer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className={InputCss.error}>მინიმუმ 2 სიმბოლი</p>
          </div>
          <div className={InputCss.shortInputContainer}>
            <div className={InputCss.input}>
              <label htmlFor="start_date" className={InputCss.label}>
                დაწყების რიცხვი
              </label>
              <input
                className={InputCss.inputFieldShort}
                type="date"
                name="start_date"
                id="start_date"
                value={value.start_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </div>
            <div className={InputCss.input}>
              <label htmlFor="due_date" className={InputCss.label}>
                დამთავრების რიცხვი
              </label>
              <input
                className={InputCss.inputFieldShort}
                type="date"
                name="due_date"
                id="due_date"
                value={value.due_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </div>
          </div>
          <div className={InputCss.containerLong}>
            <label htmlFor="description" className={InputCss.label}>
              აღწერა
            </label>
            <textarea
              className={`${InputCss.inputFieldLong} ${InputCss.textarea} ${InputCss.scroll}`}
              name="description"
              id="description"
              placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
              value={value.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>
          <span className={InputCss.underline}></span>
          <button type="button" className={InputCss.addMore}>
            მეტი გამოცდილების დამატება
          </button>
          <div>
            <button
              type="button"
              className={InputCss.backBtn}
              onClick={() => {
                navigate(-1);
              }}
            >
              უკან
            </button>
            <button type="submit" className={InputCss.nextBtn}>
              შემდეგი
            </button>
          </div>
        </form>
      </div>
      <Resume showResume={true} formData2={formData2} />
    </div>
  );
}
