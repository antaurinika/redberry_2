import React, { useState } from "react";
import FetchDegrees from "../components/FetchDegrees";
import InputCss from "../styles/InputField.module.css";
import PageCss from "../styles/Page.module.css";

export default function EducationForm({ educationValue, formikObj, data }) {
  const [formList, setFormList] = useState([{ form: "" }]);

  // const addForm = () => {
  //   setFormList([...formList, { form: "" }]);
  // };

  const displayForm = () => {
    return formList.map((eachForm, index) => (
      <div key={index}>
        <div className={InputCss.containerLong}>
          <label htmlFor="institute" className={InputCss.label}>
            სასწავლებელი
          </label>
          <input
            type="text"
            className={InputCss.inputFieldLong}
            name="institute"
            placeholder="სასწავლებელი"
            value={educationValue.institute}
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
          />
          <p className={InputCss.error}>მინიმუმ 2 სიმბოლი</p>
        </div>
        <div className={InputCss.shortInputContainer}>
          <div>
            <FetchDegrees
              formikObj={formikObj}
              handleChange={formikObj.handleChange}
              educationValue={educationValue}
              data={data}
            />
          </div>
          <div className={InputCss.input}>
            <label htmlFor="due_date" className={InputCss.label}>
              დამთავრების რიცხვი
            </label>
            <input
              className={InputCss.inputFieldShort}
              type="date"
              name="due_date"
              value={educationValue.due_date}
              onChange={formikObj.handleChange}
              onBlur={formikObj.handleBlur}
              required
            />
          </div>
        </div>
        <div className={InputCss.containerLong}>
          <label htmlFor="description" className={InputCss.label}>
            აღწერა
          </label>
          <textarea
            className={`${InputCss.inputFieldLong} ${InputCss.textarea} ${InputCss.scroll}`}
            name="description"
            placeholder="განათლების აღწერა"
            value={educationValue.description}
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
          ></textarea>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {displayForm()}
      <button type="button" className={InputCss.addMore}>
        მეტი სასწავლებლის დამატება
      </button>
    </div>
  );
}
