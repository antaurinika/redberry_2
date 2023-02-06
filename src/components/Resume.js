import React, { useEffect, useState } from "react";

export default function Resume({ showResume, formData2, formData3 }) {
  // const [value, setValue] = useState("");
  // const [showResume, setShowResume] = useState(true);

  const formData = JSON.parse(sessionStorage.getItem("formData"));
  // useEffect(() => {
  //   // setValue({ ...formData, ...formData2 });
  //   setValue(formData);
  //   // console.log(formData.fname);
  // }, []);
  // const value =
  // console.log(value);
  // console.log(formData3);
  return (
    <div
      className="resume"
      style={showResume ? { display: "block" } : { display: "none" }}
    >
      <h1 className="userName">
        {formData?.fname} {formData?.lname}
      </h1>
      <div>
        <p className="email">{formData?.email}</p>
        <p className="phone"> {formData?.phone}</p>
      </div>
      <div className="aboutme">
        <p className="title">ჩემს შესახებ</p>
        <p>{formData?.textarea}</p>
      </div>
      <img src={formData?.image} alt="user" />

      {formData2 && <h2>გამოცდილება</h2>}
      <p>
        {formData2?.position} {formData2?.employer}
      </p>
      <div>
        <p>{formData2?.hireDate}</p>
        <p>{formData2?.leaveDate}</p>
      </div>
      <p>{formData2?.description}</p>

      {formData3 && <h3>განათლება</h3>}
      <p>
        {formData3?.school} {formData3?.degree}
      </p>

      <p>{formData3?.graduation}</p>

      <p>{formData3?.desc}</p>
    </div>
  );
}
