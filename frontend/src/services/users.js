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