import React from "react";
import InputCss from "../styles/InputField.module.css";

export default function NextButton({ title }) {
  return (
    <>
      <button type="submit" className={InputCss.nextBtn}>
        {title}
      </button>
    </>
  );
}
