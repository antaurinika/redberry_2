import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Resume from "../components/Resume";
import Header from "../components/Header";

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

export default function PersonalInfo({ setBinaryImage }) {
  const [value, setValue] = useState(initialValues);
  const navigate = useNavigate();

  const formData = JSON.parse(sessionStorage.getItem("formData"));
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
      // console.log(formData);
      setValue((prev) => (prev = { ...prev, ...formData }));
      Object.assign(formik.values, formData);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(value));
    // setValue((prev) => (prev = { ...prev, ...formData, image: imageUrl }));
    // Object.assign(formik.values, formData);
    // Object.assign(formik.values, formData);
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
    sessionStorage.setItem("formData", JSON.stringify(values));
    sessionStorage.setItem("showResume", true);
    setValue((prev) => (prev = { ...prev, ...formData }));
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
        setBinaryImage(image.target.files[0]);
        sessionStorage.setItem(
          "fileImage",
          JSON.stringify(image.target.files[0])
        );
      }
    };
    fileReader.readAsDataURL(image.target.files[0]);
  };

  return (
    <div>
      <Header title="პირადი ინფო" pageCount={1} />
      <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
        <div>
          <label htmlFor="name">სახელი</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            value={value.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <p>მინიმუმ 2 ასო, ქართული ასოები</p>
        </div>
        <br />
        <div>
          <label htmlFor="surname">გვარი</label>
          <br />
          <input
            type="text"
            name="surname"
            id="surname"
            value={value.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <label htmlFor="image">პირადი ფოტოს ატვირთვა</label>
          <br />

          <input
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpg"
            // defaultValue={value.image}
            src={value.image}
          />
        </div>
        <div>
          <label htmlFor="about_me">ჩემ შესახებ</label>
          <br />
          <textarea
            name="about_me"
            id="about_me"
            value={value.about_me}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>
        <div>
          <label htmlFor="email">ელ. ფოსტა</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            value={value.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <label htmlFor="phone_number">მობილურის ნომერი</label>
          <br />
          <input
            type="phone_number"
            name="phone_number"
            id="phone_number"
            value={value.phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <button type="submit">submit</button>
      </form>
      <Resume showResume={showResume} formData={formData} />
    </div>
  );
}
