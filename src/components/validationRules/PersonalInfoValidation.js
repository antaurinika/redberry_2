export default function PersonalInfoValidation(values) {
  let errors = {};

  if (!values.name) {
    errors.name = "სახელი სავალდებულოა";
  } else if (values.name.length < 2) {
    errors.name = "მინიმუმ 2 სიმბოლო";
  } else if (!/^([\u10D0-\u10F0]+)$/.test(values.name)) {
    errors.name = "მხოლოდ ქართული სიმბოლოები";
  }
  if (!values.surname) {
    errors.surname = "გვარი სავალდებულოა";
  } else if (values.surname.length < 2) {
    errors.surname = "მინიმუმ 2 სიმბოლო";
  } else if (!/^([\u10D0-\u10F0]+)$/.test(values.surname)) {
    errors.surname = "მხოლოდ ქართული სიმბოლოები";
  }
  if (!values.email) {
    errors.email = "ელ. ფოსტა სავალდებულოა";
  } else if (!/\S+@\bredberry\b.\bge\b/.test(values.email)) {
    errors.email = "ელ. ფოსტა უნდა მთავრდებოდეს @redberry.ge-თი";
  }
  if (!values.phone_number) {
    errors.phone_number = "ტელეფონის ნომერი სავალდებულოა";
  } else if (!/^((\+)995)[5](\d{2})(\d{3})(\d{3})$/.test(values.phone_number)) {
    errors.phone_number =
      "უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს";
  }
  if (!values.image) {
    errors.image = "სურათი სავალდებულოა";
  }
  return errors;
}
