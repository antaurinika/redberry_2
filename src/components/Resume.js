import React, { useEffect, useState } from "react";
import { FaAt, FaPhone } from "react-icons/fa";
import logo from "../Assets/images/LOGO-12 1.png";
import ResumeCss from "../styles/Resume.module.css";
import PageCss from "../styles/Page.module.css";
import InputCss from "../styles/InputField.module.css";

export default function Resume({ showResume, formData2, formData3 }) {
  const formData = JSON.parse(sessionStorage.getItem("formData"));
  const serverData = JSON.parse(sessionStorage.getItem("serverData"));
  const base64 = sessionStorage.getItem("base64");
  const [formatNumber, setFormatNumber] = useState();

  useEffect(() => {
    let number = serverData ? serverData?.phone_number : formData?.phone_number;
    setFormatNumber(
      `${number?.slice(0, 4)} ${number?.slice(4, 7)} ${number?.slice(
        7,
        9
      )} ${number?.slice(9, 11)} ${number?.slice(11, 13)}`
    );
  }, []);

  return (
    <>
      <div
        className={`${PageCss.resume} ${InputCss.scroll}`}
        style={showResume ? { display: "block" } : { display: "none" }}
      >
        <div className={ResumeCss.ResumeFlex}>
          <div className={ResumeCss.leftSide}>
            <h1 className={ResumeCss.username}>
              {serverData?.name || formData?.name}
              {serverData?.surname || formData?.surname}
            </h1>
            <div>
              <p className={ResumeCss.email}>
                <span className={ResumeCss.icon}>
                  <FaAt />
                </span>
                {serverData?.email || formData?.email}
              </p>
              <p className={ResumeCss.phone}>
                <span className={ResumeCss.icon}>
                  <FaPhone />
                </span>
                {(serverData || formData?.phone_number) && formatNumber}
              </p>
            </div>

            <p className={ResumeCss.title}>ჩემს შესახებ</p>
            <p className={ResumeCss.aboutMe}>
              {serverData?.about_me || formData?.about_me}
            </p>
          </div>

          <img
            src={
              serverData
                ? `https://resume.redberryinternship.ge${serverData?.image}`
                : base64
            }
            className={ResumeCss.userImage}
            alt="user"
          />
        </div>
        <span className={ResumeCss.underline}></span>
        {(serverData || formData2?.position) && (
          <h2 className={ResumeCss.title}>გამოცდილება</h2>
        )}
        <p className={ResumeCss.position_employer}>
          {serverData?.experiences[0]?.position || formData2?.position},
          {serverData?.experiences[0]?.employer || formData2?.employer}
        </p>
        <div className={ResumeCss.date}>
          {serverData?.experiences[0]?.start_date || formData2?.start_date} -
          {serverData?.experiences[0]?.due_date || formData2?.due_date}
        </div>
        <p className={ResumeCss.description}>
          {serverData?.experiences[0]?.description || formData2?.description}
        </p>
        {(serverData || formData3?.institute) && (
          <span className={ResumeCss.underline}></span>
        )}
        {(serverData || formData3?.institute) && (
          <h3 className={ResumeCss.title}>განათლება</h3>
        )}
        <p className={ResumeCss.position_employer}>
          {serverData?.educations[0]?.institute || formData3?.institute}
          {serverData?.educations[0]?.degree || formData3?.degree}
        </p>

        <p className={ResumeCss.date}>
          {serverData?.educations[0]?.due_date || formData3?.due_date}
        </p>

        <p className={ResumeCss.description}>
          {serverData?.educations[0]?.description || formData3?.description}
        </p>
        <img src={logo} className={ResumeCss.footer} alt="logo" />
      </div>
    </>
  );
}
