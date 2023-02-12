export default function ExperineceValidation(values) {
  let errors = {};
  if (!values.position) {
    errors.position = "გამოცდილება სავალდებულოა";
  } else if (values.position.length < 2) {
    errors.position = "მინიმუმ 2 სიმბოლო";
  }
  if (!values.employer) {
    errors.employer = "სავალდებულოა";
  } else if (values.employer.length < 2) {
    errors.employer = "მინიმუმ 2 სიმბოლო";
  }
  if (!values.start_date) {
    errors.start_date = "სავალდებულოა";
  }
  if (!values.due_date) {
    errors.due_date = "სავალდებულოა";
  }
  if (!values.description) {
    errors.description = "სავალდებულოა";
  }
  return errors;
}
