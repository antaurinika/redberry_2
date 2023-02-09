import React from "react";

import InputCss from "../styles/InputField.module.css";

export default function FetchDegrees({
  handleChange,
  educationValue,
  data,
  formikObj,
}) {
  const setOptions = () => {
    return data.map((degree) => (
      <option key={degree.id} id={degree.id} value={degree.title}>
        {degree.title}
      </option>
    ));
  };

  return (
    <div className={InputCss.input}>
      <label htmlFor="" className={InputCss.label}>
        ხარისხი
      </label>
      <select
        className={`${InputCss.inputFieldShort} ${InputCss.select}`}
        name="degree"
        placeholder="აირჩიეთ ხარისხი"
        onChange={handleChange}
        onBlur={formikObj.handleBlur}
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
