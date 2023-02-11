import React from "react";
import InputCss from "../styles/InputField.module.css";
import ErrorCss from "../styles/Errors.module.css";

export default function TextAreaField({ formik, name, label, placeholder }) {
  const toggleBorder = () => {
    if (formik.touched[name] && formik.errors[name]) {
      return `${InputCss.inputFieldLong} ${InputCss.textarea} ${InputCss.scroll} ${ErrorCss.errorBorder}`;
    } else if (formik.touched[name] && !formik.errors[name]) {
      return `${InputCss.inputFieldLong} ${InputCss.textarea} ${InputCss.scroll} ${ErrorCss.successBorder}`;
    } else {
      return `${InputCss.inputFieldLong} ${InputCss.textarea} ${InputCss.scroll}`;
    }
  };
  const toggleIcon = () => {
    if (formik.touched[name] && formik.errors[name]) {
      return <span className={ErrorCss.errorIcon}></span>;
    } else if (formik.touched[name] && !formik.errors[name]) {
      return <span className={ErrorCss.successIcon}></span>;
    } else {
      return;
    }
  };

  return (
    <div className={InputCss.containerLong}>
      <div
        className={`${InputCss.label} ${
          formik.touched[name] && formik.errors[name]
            ? ErrorCss.errorLabel
            : null
        }`}
      >
        <label htmlFor={name} className={InputCss.label}>
          {label}
        </label>
        <textarea
          className={toggleBorder()}
          name={name}
          id={name}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        {toggleIcon()}
      </div>
    </div>
  );
}
