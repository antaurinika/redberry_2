import React, { useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({ title, pageCount }) {
  const navigate = useNavigate();

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    image: "",
    textarea: "",
    phone: "",
  };
  // useEffect(() => {
  //   sessionStorage.clear();
  //   console.log("rendered");
  // }, []);

  return (
    <header className="header">
      <button
        onClick={() => {
          navigate("/");
          // sessionStorage.setItem("showResume", false);
          // sessionStorage.removeItem("formData");
          sessionStorage.clear();
          // sessionStorage.removeItem("formData2");
          sessionStorage.setItem("formData", JSON.stringify(initialValues));
          //   //   localStorage.removeItem("imageUrl");
        }}
      >
        <FaAngleLeft />
      </button>
      <h1 className="title">{title}</h1>
      <p className="pageCount">{pageCount}/3</p>
    </header>
  );
}
