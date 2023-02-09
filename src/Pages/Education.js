import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Resume from "../components/Resume";
import { PostData } from "../components/PostData";
import EducationForm from "../components/EducationForm";
import PageCss from "../styles/Page.module.css";
import InputCss from "../styles/InputField.module.css";
import Flexbox from "../styles/Flexbox.module.css";

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

export default function Education() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [educationValue, setEducationValue] = useState(
    initialValues.educations
  );
  const [imageFile, setImageFile] = useState();

  const formData3 = JSON.parse(sessionStorage.getItem("formData3"));
  const formData2 = JSON.parse(sessionStorage.getItem("formData2"));
  const formData = JSON.parse(sessionStorage.getItem("formData"));

  useEffect(() => {
    fetch("https://resume.redberryinternship.ge/api/degrees")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

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

  // ---- convert base64 to file ----
  useEffect(() => {
    fetch(sessionStorage.getItem("imageUrl"))
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "image/png" });
        setImageFile(file);
      });
  }, []);
  // ---- format data to post ---
  const formatData = () => {
    const dataToPost = {
      ...formData,
      image: imageFile,
      experiences: [formData2],
      educations: [
        {
          ...educationValue,
          degree_id: JSON.parse(sessionStorage.getItem("degree_id")),
        },
      ],
    };
    return dataToPost;
  };

  const onSubmit = (values) => {
    console.log(formatData());
    if (JSON.stringify(formik.errors) === "{}") {
      delete educationValue.degree;
      PostData(formatData());
      console.log(formatData());
      navigate("/resumefinal");
    }
  };
  const formik = useFormik({
    initialValues: educationValue,
    onSubmit,
    validate,
  });

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

  console.log(formik.values);
  return (
    <div className={`${PageCss.window}`}>
      <div className={PageCss.container}>
        <Header title="განათლება" pageCount={3} />
        <form
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          className={PageCss.form}
        >
          <EducationForm
            formikObj={formik}
            setEducationValue={setEducationValue}
            educationValue={educationValue}
            data={data}
          />

          <button
            className={InputCss.backBtn}
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            უკან
          </button>
          <button type="submit" className={InputCss.nextBtn}>
            დასრულება
          </button>
        </form>
      </div>
      <Resume showResume={true} formData2={formData2} formData3={formData3} />
    </div>
  );
}
