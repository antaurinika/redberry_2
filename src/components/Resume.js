import React, { useEffect, useState } from "react";
import { FaAt, FaPhone } from "react-icons/fa";
import logo from "../images/LOGO-12 1.png";
import ResumeCss from "../styles/Resume.module.css";
import PageCss from "../styles/Page.module.css";
import Flexbox from "../styles/Flexbox.module.css";
import InputCss from "../styles/InputField.module.css";

export default function Resume({ showResume, formData2, formData3 }) {
  const formData = JSON.parse(sessionStorage.getItem("formData"));
  const imageUrl = sessionStorage.getItem("imageUrl");
  // const [format, setFormat] = useState();

  // const formatNumber = () => {
  //   const number = formData?.phone_number;
  //   setFormat(
  //     `${formData?.phone_number.slice(0, 4)} ${formData?.phone_number.slice(
  //       4,
  //       7
  //     )} ${number.slice(7, 9)} ${formData?.phone_number.slice(
  //       9,
  //       11
  //     )} ${formData?.phone_number.slice(11, 13)}`
  //   );
  // };
  // useEffect(() => {
  //   formatNumber();
  // }, []);

  return (
    <div>
      <div
        className={`${PageCss.resume} ${InputCss.scroll}`}
        style={showResume ? { display: "block" } : { display: "none" }}
      >
        <div className={Flexbox.resumeContainer}>
          <div>
            <h1 className={ResumeCss.username}>
              {formData?.name} {formData?.surname}
            </h1>
            <div>
              <p className={ResumeCss.email}>
                <span className={ResumeCss.icon}>
                  <FaAt />
                </span>
                {formData?.email}
              </p>
              <p className={ResumeCss.phone}>
                <span className={ResumeCss.icon}>
                  <FaPhone />
                </span>
                {formData?.phone_number}
              </p>
            </div>

            <p className={ResumeCss.title}>ჩემს შესახებ</p>
            <p className={ResumeCss.aboutMe}>{formData?.about_me}</p>
          </div>

          <img src={imageUrl} className={ResumeCss.userImage} alt="user" />
        </div>
        <span className={ResumeCss.underline}></span>
        {formData2?.position && (
          <h2 className={ResumeCss.title}>გამოცდილება</h2>
        )}
        <p className={ResumeCss.position_employer}>
          {formData2?.position}, {formData2?.employer}
        </p>
        <div className={ResumeCss.date}>
          {formData2?.start_date} - {formData2?.due_date}
        </div>
        <p className={ResumeCss.description}>{formData2?.description}</p>
        {formData3?.institute && <span className={ResumeCss.underline}></span>}
        {formData3?.institute && <h3 className={ResumeCss.title}>განათლება</h3>}
        <p className={ResumeCss.position_employer}>
          {formData3?.institute} {formData3?.degree}
        </p>

        <p className={ResumeCss.date}>{formData3?.due_date}</p>

        <p className={ResumeCss.description}>{formData3?.description}</p>
        <img src={logo} className={ResumeCss.footer} alt="logo" />
      </div>
    </div>
  );
}
