import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import ResumeCss from "../styles/Resume.module.css";

export default function Popup() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div
      className={ResumeCss.popupContainer}
      style={showPopup ? { display: "block" } : { display: "none" }}
    >
      <div className={ResumeCss.closePopup} onClick={() => setShowPopup(false)}>
        <GrClose />
      </div>
      <div className="popup">რეზიუმე წარმატებით გაიგზავნა 🎉</div>
    </div>
  );
}
