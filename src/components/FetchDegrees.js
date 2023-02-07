import React, { useEffect, useState } from "react";

export default function FetchDegrees({ formikObj, educationValue, data }) {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("https://resume.redberryinternship.ge/api/degrees")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));

  //   getOptionData(data);
  // }, []);

  const setOptions = () => {
    return data.map((degree) => (
      <option key={degree.id} id={degree.id} value={degree.title}>
        {degree.title}
      </option>
    ));
  };

  return (
    <div>
      <select
        name="degree"
        placeholder="აირჩიეთ ხარისხი"
        onChange={formikObj.handleChange}
        onBlur={formikObj.handleBlur}
        value={educationValue.degree}
      >
        <option name="degree" value="">
          აირჩიეთ ხარისხი
        </option>
        {setOptions()}
      </select>
    </div>
  );
}
