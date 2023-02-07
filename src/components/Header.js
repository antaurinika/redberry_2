import React, { useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({ title, pageCount }) {
  const navigate = useNavigate();

  // const initialValues = {
  //   name: "",
  //   surname: "",
  //   email: "",
  //   image: "",
  //   about_me: "",
  //   phone: "",
  // };

  return (
    <header className="header">
      <button
        onClick={() => {
          navigate("/");
          sessionStorage.clear();
          // sessionStorage.setItem("formData", JSON.stringify(initialValues));
        }}
      >
        <FaAngleLeft />
      </button>
      <h1 className="title">{title}</h1>
      <p className="pageCount">{pageCount}/3</p>
    </header>
  );
}
