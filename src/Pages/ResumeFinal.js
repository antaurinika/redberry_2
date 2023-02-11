import React from "react";
import Popup from "../components/Popup";
import Resume from "../components/Resume";
import ResumeCss from "../styles/Resume.module.css";
import InputCss from "../styles/InputField.module.css";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ResumeFinal() {
  const formData3 = JSON.parse(sessionStorage.getItem("formData3"));
  const formData2 = JSON.parse(sessionStorage.getItem("formData2"));
  const formData = JSON.parse(sessionStorage.getItem("formData"));
  const navigate = useNavigate();

  return (
    <div>
      <button
        className={ResumeCss.backBtn}
        onClick={() => {
          sessionStorage.clear();
          navigate("/");
        }}
      >
        <FaAngleLeft />
      </button>
      <div
        style={{
          display: " flex",
          justifyContent: "center",
        }}
      >
        <div className={`${ResumeCss.finalResumeContainer} ${InputCss.scroll}`}>
          <Resume
            formData={formData}
            formData2={formData2}
            formData3={formData3}
            showResume={true}
          />
        </div>
      </div>
      <Popup />
    </div>
  );
}
