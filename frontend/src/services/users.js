import axios from 'axios'
import { config } from './config'

export async function register(name, email, phone, password, city) {
    try {
        // url to send the request
        const url = `${config.server}/users/signup`
        // create a body object
        const body = {name, email, password, phone, city}
        //send post request
        const response = await axios.post(url, body)
        console.log("Register payload:", response.data);

        // return response body
        return response.data
    } catch(ex) {
        console.log(`exception: `, ex)
    }
}

export async function login(email, password) {
    try {
        // create url
        const url = `${config.server}/users/signin`
        // create body
        const body = {email, password}
        //send the post request
        const response = await axios.post(url, body)
        //return response body
        return response.data
    }catch(ex) {
        console.log(`exception: `, ex)
        console.log("Login error:", ex.response?.data || ex.message);
        return { status: "error", error: "Invalid credentials or unauthorized" };
    }
}

export const getUserProfile = async (userId) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${config.server}/users/profile/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

export const updateUserProfile = async (userId, data) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${config.server}/users/profile/${userId}`, data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${config.server}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};