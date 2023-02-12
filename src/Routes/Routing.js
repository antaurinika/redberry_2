import React from "react";
import { Route, Routes } from "react-router-dom";
import Experience from "../Pages/Experience";
import Landing from "../Pages/Landing";
import PersonalInfo from "../Pages/PersonalInfo";
import Education from "../Pages/Education";
import ResumeFinal from "../Pages/ResumeFinal";

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/personalinfo" element={<PersonalInfo />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/resumefinal" element={<ResumeFinal />} />
      </Routes>
    </div>
  );
}
