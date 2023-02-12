import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Resume from "../components/Resume";
import Header from "../components/Header";
import PageCss from "../styles/Page.module.css";
import InputCss from "../styles/InputField.module.css";
import InputField from "../components/formFields/InputField";
import ImageField from "../components/formFields/ImageField";
import NextButton from "../components/NextButton";
import TextAreaField from "../components/formFields/TextAreaField";
import PersonalInfoValidation from "../components/validationRules/PersonalInfoValidation";

const initialValues = {
  name: "",
  surname: "",
  email: "",
  image: "",
  about_me: "",
  phone_number: "",
};

export default function PersonalInfo() {
  const formData = JSON.parse(sessionStorage.getItem("formData"));
  const formData2 = JSON.parse(sessionStorage.getItem("formData2"));
  const formData3 = JSON.parse(sessionStorage.getItem("formData3"));
  const base64 = sessionStorage.getItem("base64");
  const showResume = JSON.parse(sessionStorage.getItem("showResume"));

  const [value, setValue] = useState(initialValues);

  const navigate = useNavigate();
  useEffect(() => {
    if (
      value.name === "" &&
      value.surname === "" &&
      value.image === "" &&
      value.email === "" &&
      value.phone_number === "" &&
      value.about_me === ""
    ) {
      setValue((prev) => (prev = { ...prev, ...formData, image: base64 }));
    }
    Object.assign(formik.values, formData);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(value));
  }, [value]);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "image") {
      getBase64(e);
    }
    setValue((prev) => (prev = { ...prev, [name]: value }));
  };

  const onSubmit = (values) => {
    navigate("/experience");
    sessionStorage.setItem("showResume", true);
    setValue((prev) => (prev = { ...prev, ...formData }));
    sessionStorage.setItem("formData", JSON.stringify(values));
  };
  const formik = useFormik({
    initialValues: value,
    onSubmit,
    validate: PersonalInfoValidation,
  });

  const getBase64 = (image) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        formik.setFieldValue("image", fileReader.result);
        sessionStorage.setItem("base64", fileReader.result);
      }
    };
    if (image.target.files[0]) {
      fileReader.readAsDataURL(image.target.files[0]);
    }
  };
  // console.log(formik.values);

  return (
    <div className={`${PageCss.window}`}>
      <div className={PageCss.container}>
        <Header title="პირადი ინფო" pageCount={1} formik={formik} />
        <form
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          className={PageCss.form}
        >
          <div className={InputCss.shortInputContainer}>
            <InputField
              formik={formik}
              label="სახელი"
              type="text"
              name="name"
              placeholder="ანზორ"
              inputSize="inputFieldShort"
              errorMessage="მინიმუმ 2 ასო, ქართული ასოები"
            />

            <InputField
              formik={formik}
              label="გვარი"
              type="text"
              name="surname"
              placeholder="მუმლაძე"
              inputSize="inputFieldShort"
              errorMessage="მინიმუმ 2 ასო, ქართული ასოები"
            />
          </div>
          <div className={InputCss.imageContainer}>
            <ImageField base64={base64} formik={formik} />
          </div>

          <TextAreaField
            name="about_me"
            label="   ჩემ შესახებ (არასავალდებულო)"
            formik={formik}
            placeholder="ზოგადი ინფო შენ შესახებ"
          />
          <InputField
            formik={formik}
            label="ელ.ფოსტა"
            type="email"
            name="email"
            placeholder="anzorr666@redberry.ge"
            inputSize="inputFieldLong"
            errorMessage="უნდა მთავრდებოდეს @redberry.ge-ით"
          />
          <InputField
            formik={formik}
            label="მობილურის ნომერი"
            type="tel"
            name="phone_number"
            placeholder="+995 551 12 34 56"
            inputSize="inputFieldLong"
            errorMessage="  უნდა აკმაყოფილებდეს ქართული მობილური ნომრის ფორმატს"
          />
          <NextButton title="შემდეგი" />
        </form>
      </div>
      <Resume
        showResume={showResume}
        formData2={formData2}
        formData3={formData3}
      />
    </div>
  );
}
