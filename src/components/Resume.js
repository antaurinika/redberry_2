import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

export default function Resume({ showResume, formData2, formData3 }) {
  // const [value, setValue] = useState("");
  // const [showResume, setShowResume] = useState(true);

  const formData = JSON.parse(sessionStorage.getItem("formData"));
  const imageUrl = sessionStorage.getItem("imageUrl");
  // useEffect(() => {
  //   // setValue({ ...formData, ...formData2 });
  //   setValue(formData);
  //   // console.log(formData.fname);
  // }, []);
  // const value =
  // console.log(value);
  // console.log(formData3);
  return (
    <div>
      <div
        className="resume"
        style={showResume ? { display: "block" } : { display: "none" }}
      >
        <h1 className="userName">
          {formData?.name} {formData?.surname}
        </h1>
        <div>
          <p className="email">{formData?.email}</p>
          <p className="phone"> {formData?.phone_number}</p>
        </div>
        <div className="aboutme">
          <p className="title">ჩემს შესახებ</p>
          <p>{formData?.about_me}</p>
        </div>
        <img src={imageUrl} alt="user" />

        {formData2?.position && <h2>გამოცდილება</h2>}
        <p>
          {formData2?.position} {formData2?.employer}
        </p>
        <div>
          <p>{formData2?.start_date}</p>
          <p>{formData2?.due_date}</p>
        </div>
        <p>{formData2?.description}</p>

        {formData3?.institute && <h3>განათლება</h3>}
        <p>
          {formData3?.institute} {formData3?.degree}
        </p>

        <p>{formData3?.due_date}</p>

        <p>{formData3?.description}</p>
      </div>
      <div className="close-popup">
        <GrClose />
      </div>
      <div className="popup">რეზიუმე წარმატებით გაიგზავნა 🎉</div>
    </div>
  );
}
