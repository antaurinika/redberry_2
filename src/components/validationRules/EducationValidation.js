export default function EducationValidation(values) {
  let errors = {};
  if (!values.institute) {
    errors.institute = "სასწავლებელი სავალდებულოა";
  } else if (values.institute.length < 2) {
    errors.institute = "მინიმუმ 2 სიმბოლო";
  }
  if (values.degree === "") {
    errors.degree = "ხარისხი სავალდებულოა";
  }
  if (!values.due_date) {
    errors.due_date = "დამთავრების თარიღი სავალდებულოა";
  }
  if (!values.description) {
    errors.description = "აღწერა სავალდებულოა";
  }
  return errors;
}
