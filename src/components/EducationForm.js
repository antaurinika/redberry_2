import React, { useState } from "react";
import SelectField from "./formFields/SelectField";
import InputCss from "../styles/InputField.module.css";
import AddMoreButton from "./AddMoreButton";
import InputField from "./formFields/InputField";
import TextAreaField from "./formFields/TextAreaField";
export default function EducationForm({ educationValue, formik, data }) {
  const [formList, setFormList] = useState([{ form: "" }]);

  // const addForm = () => {
  //   setFormList([...formList, { form: "" }]);
  // };

  const displayForm = () => {
    return formList.map((eachForm, index) => (
      <div key={index}>
        <InputField
          formik={formik}
          label="სასწავლებელი"
          type="text"
          name="institute"
          placeholder="სასწავლებელი"
          inputSize="inputFieldLong"
          errorMessage="მინიმუმ 2 სიმბოლი"
        />
        <div className={InputCss.shortInputContainer}>
          <>
            <SelectField
              formik={formik}
              educationValue={educationValue}
              data={data}
            />
          </>

          <InputField
            formik={formik}
            label="დამთავრების რიცხვი"
            type="date"
            name="due_date"
            inputSize="inputFieldShort"
            required={true}
          />
        </div>
        <TextAreaField
          name="description"
          label="აღწერა"
          formik={formik}
          placeholder="განათლების აღწერა"
        />
        <span className={InputCss.underline}></span>
      </div>
    ));
  };

  return (
    <div>
      {displayForm()}
      {/* <div onClick={addForm}> */}
      <AddMoreButton title="სასწავლებლის" />
      {/* </div> */}
    </div>
  );
}
