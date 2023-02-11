import React from "react";
import InputCss from "../styles/InputField.module.css";

export default function AddMoreButton({ title }) {
  return (
    <>
      <button type="button" className={InputCss.addMore}>
        მეტი {title} დამატება
      </button>
    </>
  );
}
