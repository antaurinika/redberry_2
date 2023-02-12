import React from "react";
import InputCss from "../../styles/InputField.module.css";
import ErrorCss from "../../styles/Errors.module.css";

export default function ImageField({ base64, formik }) {
  return (
    <div>
      <div className={InputCss.imageField}>
        <p
          className={`${InputCss.label} ${
            formik.touched.image && formik.errors.image
              ? ErrorCss.errorLabel
              : null
          } `}
        >
          პირადი ფოტოს ატვირთვა
        </p>
        <label htmlFor="image" className={InputCss.uploadBtn}>
          ატვირთვა
        </label>

        <input
          name="image"
          type="file"
          id="image"
          placeholder="ატვირთვა"
          accept="image/png, image/jpg"
          src={base64}
          onChange={(e) => {
            formik.handleChange(e);
          }}
        />
        {formik.touched.image && formik.errors.image ? (
          <span
            className={ErrorCss.errorIcon}
            style={{ top: "13px", right: "-40px" }}
          ></span>
        ) : null}
      </div>
    </div>
  );
}
