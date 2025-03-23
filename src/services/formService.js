import axios from 'axios';

export const submitFormData = async (payload) => {
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.post(`${API_URL}/form`, payload);
    return response.data;
  } catch (error) {
    console.error("Error submitting form data:", error);
    throw new Error("An error occurred while submitting the form.");
  }
};

export const uploadFile = async (file) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/upload-salary-slip`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.uuid;
  } catch (error) {
    console.error("File upload failed:", error);
    throw new Error("Failed to upload salary slip.");
  }
};
