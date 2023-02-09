import React, { useState } from "react";
import { GrClose } from "react-icons/gr";

export default function Popup() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div style={showPopup ? { display: "block" } : { display: "none" }}>
      <div className="close-popup" onClick={() => setShowPopup(false)}>
        <GrClose />
      </div>
      <div className="popup">რეზიუმე წარმატებით გაიგზავნა 🎉</div>
    </div>
  );
}
