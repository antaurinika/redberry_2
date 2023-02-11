import axios from "axios";

export const PostData = async (body) => {
  const url = "https://resume.redberryinternship.ge/api/cvs";
  try {
    const res = await axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    sessionStorage.setItem("serverData", JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};
