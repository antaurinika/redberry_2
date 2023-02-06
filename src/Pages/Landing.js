import React, { useEffect, useState, useRef, useLocation } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>redberry</h1>
      <button
        onClick={() => {
          // setRemoveStorage(true);
          navigate("/personalinfo");
          sessionStorage.clear();
          // Object.assign(form)
        }}
      >
        შემდეგი
      </button>
    </div>
  );
}
