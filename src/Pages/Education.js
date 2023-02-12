import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Resume from "../components/Resume";
import { PostData } from "../components/PostData";
import EducationForm from "../components/EducationForm";
import PageCss from "../styles/Page.module.css";
import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";
import EducationValidation from "../components/validationRules/EducationValidation";

const initialValues = {
  institute: "",
  degree: "",
  due_date: "",
  description: "",
};

export default function Education() {
  const formData3 = JSON.parse(sessionStorage.getItem("formData3"));
  const formData2 = JSON.parse(sessionStorage.getItem("formData2"));
  const formData = JSON.parse(sessionStorage.getItem("formData"));

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [educationValue, setEducationValue] = useState(initialValues);
  const [imageFile, setImageFile] = useState();

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
    }
    Object.assign(formik.values, formData3);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("formData3", JSON.stringify(educationValue));
  }, [educationValue]);

  // ---- convert base64 to file ----
  useEffect(() => {
    fetch(sessionStorage.getItem("base64"))
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
    if (JSON.stringify(formik.errors) === "{}") {
      delete educationValue.degree;
      PostData(formatData());
      setTimeout(() => navigate("/resumefinal"), 500);
    }
  };
  const formik = useFormik({
    initialValues: educationValue,
    onSubmit,
    validate: EducationValidation,
  });

  // --- get degree id for server ---
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    for (let option of data) {
      if (option.title === value) {
        sessionStorage.setItem("degree_id", option.id);
      }
    }
    setEducationValue((prev) => (prev = { ...prev, [name]: value }));
  };

  return (
    <div className={`${PageCss.window}`}>
      <div className={PageCss.container}>
        <Header title="განათლება" pageCount={3} formik={formik} />
        <form
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          className={PageCss.form}
        >
          <EducationForm
            formik={formik}
            setEducationValue={setEducationValue}
            educationValue={educationValue}
            data={data}
          />

          <BackButton />
          <NextButton title="დასრულება" />
        </form>
      </div>
      <Resume showResume={true} formData2={formData2} formData3={formData3} />
    </div>
  );
}
