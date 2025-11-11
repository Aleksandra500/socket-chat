import axios from 'axios';
console.log("API_URL:", import.meta.env.VITE_API_URL);
const API_URL = `${import.meta.env.VITE_API_URL}/api/messages`;

export const getMessages = async () => {
	const res = await axios.get(API_URL);
	return res.data;
};

export const sendMessage = async (message) => {
	const res = await axios.post(API_URL, message);
	return res.data;
};
