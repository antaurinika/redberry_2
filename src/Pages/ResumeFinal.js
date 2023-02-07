import React from "react";
import Resume from "../components/Resume";
export default function ResumeFinal() {
  const formData2 = JSON.parse(sessionStorage.getItem("formData2"));
  const formData3 = JSON.parse(sessionStorage.getItem("formData3"));
  return (
    <div>
      <Resume showResume={true} formData2={formData2} formData3={formData3} />
    </div>
  );
}
