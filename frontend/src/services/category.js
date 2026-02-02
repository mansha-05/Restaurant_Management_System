import axios from "axios";
import { config } from "./config";

export async function getCategories() {
  const url = `${config.server}/category`;
  const response = await axios.get(url);
  return response.data;
}

export async function getAllCategoriesAdmin() {
  const url = `${config.server}/category/admin`;
  const response = await axios.get(url);
  return response.data;
}
export async function addCategory(data) {
  const url = `${config.server}/category/addCategory`;
  const response = await axios.post(url, data);
  return response;
}

export async function updateCategory(id, data) {
  const url = `${config.server}/category`;
  const response = await axios.put(`${url}/${id}`, data);
  return response;
}

export async function toggleCategoryStatus(id) {
  try {
    const response = await axios.put(`${config.server}/category/${id}/toggle-status`);
    return response.data;
  } catch (error) {
    console.error("Failed to toggle category status", error);
    throw error; 
  }
}

