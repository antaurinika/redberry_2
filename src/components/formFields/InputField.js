import React from "react";
import InputCss from "../../styles/InputField.module.css";
import ErrorCss from "../../styles/Errors.module.css";

export default function InputField({
  formik,
  type,
  name,
  placeholder,
  label,
  inputSize,
  errorMessage,
  required,
}) {
  const toggleBorder = () => {
    if (formik.touched[name] && formik.errors[name]) {
      return `${InputCss[inputSize]} ${ErrorCss.errorBorder}`;
    } else if (formik.touched[name] && !formik.errors[name]) {
      return `${InputCss[inputSize]} ${ErrorCss.successBorder}`;
    } else {
      return `${InputCss[inputSize]}`;
    }
  };

  const toggleIcon = () => {
    if (formik.touched[name] && formik.errors[name]) {
      return <span className={ErrorCss.errorIcon}></span>;
    } else if (
      formik.touched[name] &&
      !formik.errors[name] &&
      type !== "date"
    ) {
      return <span className={ErrorCss.successIcon}></span>;
    } else {
      return;
    }
  };
  return (
    <div
      className={`${
        inputSize === "inputFieldShort"
          ? InputCss.input
          : InputCss.containerLong
      }`}
    >
      <label
        htmlFor={name}
        className={`${InputCss.label} ${
          formik.touched[name] && formik.errors[name]
            ? ErrorCss.errorLabel
            : null
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={formik.values[name]}
        placeholder={placeholder}
        className={toggleBorder()}
        required={required}
        onChange={(e) => {
          formik.handleChange(e);
        }}
        onBlur={(e) => {
          formik.handleBlur(e);
        }}
      />
      {toggleIcon()}
      <p className={InputCss.error}>{errorMessage}</p>
    </div>
  );
}
