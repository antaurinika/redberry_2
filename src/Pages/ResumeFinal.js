import React from "react";
import Popup from "../components/Popup";
import Resume from "../components/Resume";
import ResumeCss from "../styles/Resume.module.css";
import InputCss from "../styles/InputField.module.css";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ResumeFinal() {
  window.history.pushState(null, null, document.URL);
  window.addEventListener("popstate", function (event) {
    window.location.replace("/");
    sessionStorage.clear();
  });
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
          <Resume showResume={true} />
        </div>
      </div>
      <Popup />
    </div>
  );
}
