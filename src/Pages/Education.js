import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Resume from "../components/Resume";

const initialValues = {
  school: "",
  degree: "",
  graduation: "",
  desc: "",
};
const validate = (values) => {
  let errors = {};
  if (!values.school) {
    errors.school = "სასწავლებელი სავალდებულოა";
  } else if (values.school.length < 2) {
    errors.school = "მინიმუმ 2 სიმბოლო";
  }
  if (!values.degree) {
    errors.degree = "ხარისხი სავალდებულოა";
  }
  if (!values.graduation) {
    errors.graduation = "დამთავრების თარიღი სავალდებულოა";
  }
  if (!values.desc) {
    errors.desc = "აღწერა სავალდებულოა";
  }
  return errors;
};

export default function Education() {
  const navigate = useNavigate();
  const [educationValue, setEducationValue] = useState(initialValues);
  const formData3 = JSON.parse(sessionStorage.getItem("formData3"));
  const formData2 = JSON.parse(sessionStorage.getItem("formData2"));

  const onSubmit = (values) => {
    navigate("/resumefinal");
    sessionStorage.setItem("formData3", JSON.stringify(values));
    setEducationValue((prev) => (prev = { ...prev, ...formData3 }));
  };
  const formik = useFormik({
    initialValues: educationValue,
    onSubmit,
    validate,
  });
  useEffect(() => {
    if (
      educationValue.school === "" &&
      educationValue.degree === "" &&
      educationValue.graduation === "" &&
      educationValue.desc === ""
    ) {
      setEducationValue((prev) => (prev = { ...prev, ...formData3 }));
      Object.assign(formik.values, formData3);
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem("formData3", JSON.stringify(educationValue));
    Object.assign(formik.values, formData3);
  }, [educationValue]);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEducationValue((prev) => (prev = { ...prev, [name]: value }));
  };
  console.log(formik.errors);

  return (
    <div>
      <Header title="განათლება" pageCount={3} />
      <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
        <div>
          <label htmlFor="school">სასწავლებელი</label>
          <br />
          <input
            type="text"
            name="school"
            id="school"
            placeholder="სასწავლებელი"
            value={educationValue.school}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p>მინიმუმ 2 სიმბოლი</p>
        </div>
        <div>
          <label htmlFor="">ხარისხი</label>
          <select
            name="degree"
            placeholder="აირჩიეთ ხარისხი"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={educationValue.degree}
          >
            <option name="degree" value="">
              აირჩიეთ ხარისხი
            </option>
            <option value="ბაკალავრიატი">ბაკალავრიატი</option>
            <option value="მაგისტრატურა">მაგისტრატურა</option>
            <option value="დოქტორანტურა">დოქტორანტურა</option>
          </select>
        </div>
        <div>
          <label htmlFor="graduation">დამთავრების რიცხვი</label>
          <br />
          <input
            type="date"
            name="graduation"
            id="graduation"
            value={educationValue.graduation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <label htmlFor="desc">აღწერა</label>
          <textarea
            name="desc"
            id="desc"
            placeholder="განათლების აღწერა"
            value={educationValue.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          <button>მეტი სასწავლებლის დამატება</button>
        </div>

        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          უკან
        </button>
        <button type="submit">submit</button>
      </form>
      <Resume showResume={true} formData2={formData2} formData3={formData3} />
    </div>
  );
}
