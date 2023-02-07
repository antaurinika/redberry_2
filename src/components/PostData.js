import axios from "axios";

export const PostData = async (e) => {
  const url = "https://resume.redberryinternship.ge/api/cvs";
  try {
    const res = await axios.post(url, e);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
