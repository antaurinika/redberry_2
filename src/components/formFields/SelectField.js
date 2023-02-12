import React from "react";
import InputCss from "../../styles/InputField.module.css";
import ErrorCss from "../../styles/Errors.module.css";

export default function SelectField({ educationValue, data, formik }) {
  const setOptions = () => {
    return data.map((degree) => (
      <option key={degree.id} id={degree.id} value={degree.title}>
        {degree.title}
      </option>
    ));
  };

  const toggleBorder = () => {
    if (formik.touched.degree && formik.errors.degree) {
      return `${InputCss.inputFieldShort} ${InputCss.select} ${ErrorCss.errorBorder}`;
    } else if (formik.touched.degree && !formik.errors.degree) {
      return `${InputCss.inputFieldShort} ${InputCss.select} ${ErrorCss.successBorder}`;
    } else {
      return `${InputCss.inputFieldShort} ${InputCss.select}`;
    }
  };

  return (
    <div className={InputCss.input}>
      <label
        htmlFor=""
        className={`${InputCss.label} ${
          formik.touched.degree && formik.errors.degree
            ? ErrorCss.errorLabel
            : null
        }`}
      >
        ხარისხი
      </label>
      <select
        className={toggleBorder()}
        name="degree"
        placeholder="აირჩიეთ ხარისხი"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={educationValue.degree}
      >
        <option name="degree" value="">
          აირჩიეთ ხარისხი
        </option>
        {setOptions()}
      </select>
    </div>
  );
}
