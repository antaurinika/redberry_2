import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Resume from "../components/Resume";
import Header from "../components/Header";
import PageCss from "../styles/Page.module.css";
import InputCss from "../styles/InputField.module.css";

const initialValues = {
  name: "",
  surname: "",
  email: "",
  image: "",
  about_me: "",
  phone_number: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "სახელი სავალდებულოა";
  } else if (values.name.length < 2) {
    errors.name = "მინიმუმ 2 სიმბოლო";
  } else if (!/^([\u10D0-\u10F0]+)$/.test(values.name)) {
    errors.name = "მხოლოდ ქართული სიმბოლოები";
  }
  if (!values.surname) {
    errors.surname = "გვარი სავალდებულოა";
  } else if (values.surname.length < 2) {
    errors.surname = "მინიმუმ 2 სიმბოლო";
  } else if (!/^([\u10D0-\u10F0]+)$/.test(values.surname)) {
    errors.surname = "მხოლოდ ქართული სიმბოლოები";
  }
  if (!values.email) {
    errors.email = "ელ. ფოსტა სავალდებულოა";
  } else if (!/\S+@\bredberry\b.\bge\b/.test(values.email)) {
    errors.email = "ელ. ფოსტა უნდა მთავრდებოდეს @redberry.ge-თი";
  }
  if (!values.phone_number) {
    errors.phone_number = "ტელეფონის ნომერი სავალდებულოა";
  } else if (!/^((\+)995)[5](\d{2})(\d{3})(\d{3})$/.test(values.phone_number)) {
    errors.phone_number =
      "უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს";
  }
  if (!values.image) {
    errors.image = "სურათი სავალდებულოა";
  }
  return errors;
};

export default function PersonalInfo() {
  const [value, setValue] = useState(initialValues);
  const navigate = useNavigate();

  const formData = JSON.parse(sessionStorage.getItem("formData"));
  const formData2 = JSON.parse(sessionStorage.getItem("formData2"));
  const imageUrl = sessionStorage.getItem("imageUrl");
  const showResume = JSON.parse(sessionStorage.getItem("showResume"));

  useEffect(() => {
    if (
      value.name === "" &&
      value.surname === "" &&
      value.image === "" &&
      value.email === "" &&
      value.phone_number === "" &&
      value.about_me === ""
    ) {
      setValue((prev) => (prev = { ...prev, ...formData, image: imageUrl }));
      Object.assign(formik.values, formData);
    }
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
    validate,
  });
  console.log(formik.errors);

  const getBase64 = (image) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        formik.setFieldValue("image", fileReader.result);
        sessionStorage.setItem("imageUrl", fileReader.result);
      }
    };
    if (image.target.files[0]) {
      fileReader.readAsDataURL(image.target.files[0]);
    }
  };

  return (
    <div className={`${PageCss.window}`}>
      <div className={PageCss.container}>
        <Header title="პირადი ინფო" pageCount={1} />
        <form
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
          className={PageCss.form}
        >
          <div className={InputCss.shortInputContainer}>
            <div className={InputCss.input}>
              <label htmlFor="name" className={InputCss.label}>
                სახელი
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={value.name}
                placeholder="ანზორ"
                className={InputCss.inputFieldShort}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <p className={InputCss.error}>მინიმუმ 2 ასო, ქართული ასოები</p>
            </div>
            <div className={InputCss.input}>
              <label htmlFor="surname" className={InputCss.label}>
                გვარი
              </label>
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="მუმლაძე"
                value={value.surname}
                className={InputCss.inputFieldShort}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className={InputCss.error}>მინიმუმ 2 ასო, ქართული ასოები</p>
            </div>
          </div>
          <div className={InputCss.imageField}>
            <p className={InputCss.label}> პირადი ფოტოს ატვირთვა</p>
            <label htmlFor="image" className={InputCss.uploadBtn}>
              ატვირთვა
            </label>

            <input
              name="image"
              type="file"
              id="image"
              placeholder="ატვირთვა"
              accept="image/png, image/jpg"
              src={imageUrl}
            />
          </div>
          <div className={InputCss.containerLong}>
            <label htmlFor="about_me" className={InputCss.label}>
              ჩემ შესახებ (არასავალდებულო)
            </label>
            <textarea
              name="about_me"
              id="about_me"
              value={value.about_me}
              className={`${InputCss.inputFieldLong} ${InputCss.textarea} ${InputCss.scroll}`}
              placeholder="ზოგადი ინფო შენ შესახებ"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>
          <div className={InputCss.containerLong}>
            <label htmlFor="email" className={InputCss.label}>
              ელ. ფოსტა
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="anzorr666@redberry.ge"
              className={InputCss.inputFieldLong}
              value={value.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className={InputCss.error}>უნდა მთავრდებოდეს @redberry.ge-ით</p>
          </div>
          <div className={InputCss.containerLong}>
            <label htmlFor="phone_number" className={InputCss.label}>
              მობილურის ნომერი
            </label>
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              placeholder="+995 551 12 34 56"
              className={InputCss.inputFieldLong}
              value={value.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className={InputCss.error}>
              უნდა აკმაყოფილებდეს ქართული მობილური ნომრის ფორმატს
            </p>
          </div>

          <button type="submit" className={InputCss.nextBtn}>
            შემდეგი
          </button>
        </form>
      </div>
      <Resume
        showResume={showResume}
        formData={formData}
        formData2={formData2}
      />
    </div>
  );
}
