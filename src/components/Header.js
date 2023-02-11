import React, { useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeaderCss from "../styles/Header.module.css";

export default function Header({ title, pageCount, formik }) {
  const navigate = useNavigate();
  // console.log(formik.values);
  return (
    <header className={HeaderCss.header}>
      <button
        className={HeaderCss.backBtn}
        onClick={() => {
          sessionStorage.clear();
          formik.resetForm();
          navigate("/");
        }}
      >
        <FaAngleLeft />
      </button>
      <div className={HeaderCss.headerText}>
        <h1 className={HeaderCss.title}>{title}</h1>
        <p className={HeaderCss.pageCount}>{pageCount}/3</p>
      </div>
    </header>
  );
}
