import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FetchDegrees from "../components/FetchDegrees";
import Header from "../components/Header";
import Resume from "../components/Resume";

import { PostData } from "../components/PostData";

const initialValues = {
  educations: {
    institute: "",
    degree: "",
    due_date: "",
    description: "",
  },
};
const validate = (values) => {
  let errors = {};
  if (!values.institute) {
    errors.institute = "სასწავლებელი სავალდებულოა";
  } else if (values.institute.length < 2) {
    errors.institute = "მინიმუმ 2 სიმბოლო";
  }
  if (values.degree === "") {
    errors.degree = "ხარისხი სავალდებულოა";
  }
  if (!values.due_date) {
    errors.due_date = "დამთავრების თარიღი სავალდებულოა";
  }
  if (!values.description) {
    errors.description = "აღწერა სავალდებულოა";
  }
  return errors;
};

export default function Education({ binaryImage }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [educationValue, setEducationValue] = useState(
    initialValues.educations
  );

  const formData3 = JSON.parse(sessionStorage.getItem("formData3"));
  const formData2 = JSON.parse(sessionStorage.getItem("formData2"));
  const formData = JSON.parse(sessionStorage.getItem("formData"));

  useEffect(() => {
    fetch("https://resume.redberryinternship.ge/api/degrees")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const onSubmit = (values) => {
    sessionStorage.setItem("formData3", JSON.stringify(values));
    setEducationValue((prev) => (prev = { ...prev, ...formData3 }));
    delete educationValue.degree;
    const dataToPost = {
      ...formData,
      // image: (formData.image),
      experiences: [formData2],
      educations: [
        {
          ...educationValue,
          degree_id: JSON.parse(sessionStorage.getItem("degree_id")),
        },
      ],
    };
    if (JSON.stringify(formik.errors) === "{}") {
      PostData(dataToPost);
      console.log(dataToPost);
    }
  };
  const formik = useFormik({
    initialValues: educationValue,
    onSubmit,
    validate,
  });
  useEffect(() => {
    if (
      educationValue.institute === "" &&
      educationValue.degree === "" &&
      educationValue.due_date === "" &&
      educationValue.description === ""
    ) {
      setEducationValue((prev) => (prev = { ...prev, ...formData3 }));
      Object.assign(formik.values, formData3);
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem("formData3", JSON.stringify(educationValue));
    Object.assign(formik.values, formData3);
  }, [educationValue]);

  // --- get degree id for server ---
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(formatData);
    for (let option of data) {
      if (option.title === value) {
        sessionStorage.setItem("degree_id", option.id);
      }
    }
    setEducationValue((prev) => (prev = { ...prev, [name]: value }));
  };

  return (
    <div>
      <Header title="განათლება" pageCount={3} />
      <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
        <div>
          <label htmlFor="institute">სასწავლებელი</label>
          <br />
          <input
            type="text"
            name="institute"
            id="institute"
            placeholder="სასწავლებელი"
            value={educationValue.institute}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p>მინიმუმ 2 სიმბოლი</p>
        </div>
        <div>
          <label htmlFor="">ხარისხი</label>
          <FetchDegrees
            formikObj={formik}
            educationValue={educationValue}
            data={data}
          />
        </div>
        <div>
          <label htmlFor="due_date">დამთავრების რიცხვი</label>
          <br />
          <input
            type="date"
            name="due_date"
            id="due_date"
            value={educationValue.due_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <label htmlFor="description">აღწერა</label>
          <textarea
            name="description"
            id="description"
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
