import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeaderCss from "../styles/Header.module.css";

export default function Header({ title, pageCount }) {
  const navigate = useNavigate();
  return (
    <header className={HeaderCss.header}>
      <button
        className={HeaderCss.backBtn}
        onClick={() => {
          sessionStorage.clear();
          navigate("/");
          window.location.reload(true);
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
