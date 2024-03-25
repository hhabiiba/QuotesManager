import axios from 'axios';
const baseURL = '/api/login';

const loginUser = async (user) => {
  try {
    const response = await axios.post(`${baseURL}`, user);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error login users:', error);
    throw error;
  }
};

export default loginUser;