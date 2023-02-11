import React from "react";
import InputCss from "../styles/InputField.module.css";
import { useNavigate } from "react-router-dom";
export default function BackButton() {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        className={InputCss.backBtn}
        onClick={() => {
          navigate(-1);
        }}
      >
        უკან
      </button>
    </>
  );
}
