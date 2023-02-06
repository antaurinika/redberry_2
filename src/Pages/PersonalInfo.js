import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Resume from "../components/Resume";
import Header from "../components/Header";

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  image: "",
  textarea: "",
  phone: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.fname) {
    errors.fname = "სახელი სავალდებულოა";
  } else if (values.fname.length < 2) {
    errors.fname = "მინიმუმ 2 სიმბოლო";
  } else if (!/^([\u10D0-\u10F0]+)$/.test(values.fname)) {
    errors.fname = "მხოლოდ ქართული სიმბოლოები";
  }
  if (!values.lname) {
    errors.lname = "გვარი სავალდებულოა";
  } else if (values.lname.length < 2) {
    errors.lname = "მინიმუმ 2 სიმბოლო";
  } else if (!/^([\u10D0-\u10F0]+)$/.test(values.lname)) {
    errors.lname = "მხოლოდ ქართული სიმბოლოები";
  }
  if (!values.email) {
    errors.email = "ელ. ფოსტა სავალდებულოა";
  } else if (!/\S+@\bredberry\b.\bge\b/.test(values.email)) {
    errors.email = "ელ. ფოსტა უნდა მთავრდებოდეს @redberry.ge-თი";
  }
  if (!values.phone) {
    errors.phone = "ტელეფონის ნომერი სავალდებულოა";
  } else if (!/^((\+)995)[5](\d{2})(\d{3})(\d{3})$/.test(values.phone)) {
    errors.phone = "უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს";
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
  const imageUrl = sessionStorage.getItem("imageUrl");
  const showResume = JSON.parse(sessionStorage.getItem("showResume"));

  useEffect(() => {
    if (
      value.fname === "" &&
      value.lname === "" &&
      value.image === "" &&
      value.email === "" &&
      value.phone === "" &&
      value.textarea === ""
    ) {
      // console.log(formData);
      setValue((prev) => (prev = { ...prev, ...formData, image: imageUrl }));
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
    setValue((prev) => (prev = { ...prev, ...formData, image: imageUrl }));
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
        image.target.src = fileReader.result;
      }
    };
    fileReader.readAsDataURL(image.target.files[0]);
  };

  return (
    <div>
      <Header title="პირადი ინფო" pageCount={1} />
      <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
        <div>
          <label htmlFor="fname">სახელი</label>
          <br />
          <input
            type="text"
            name="fname"
            id="fname"
            value={value.fname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <p>მინიმუმ 2 ასო, ქართული ასოები</p>
        </div>
        <br />
        <div>
          <label htmlFor="lname">გვარი</label>
          <br />
          <input
            type="text"
            name="lname"
            id="lname"
            value={value.lname}
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
          <label htmlFor="textarea">ჩემ შესახებ</label>
          <br />
          <textarea
            name="textarea"
            id="textarea"
            value={value.textarea}
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
          <label htmlFor="phone">მობილურის ნომერი</label>
          <br />
          <input
            type="phone"
            name="phone"
            id="phone"
            value={value.phone}
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
