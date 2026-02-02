import axios from "axios";
import { config } from "./config";

export async function getCategories() {

  const url = `${config.server}/category`;
  const response = await axios.get(url);

  return response.data;
}

export async function getAllCategoriesAdmin() {
  const token = localStorage.getItem("token");

  const url = `${config.server}/category/admin`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function addCategory(data) {
  const token = localStorage.getItem("token");

  const url = `${config.server}/category/addCategory`;
  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function updateCategory(id, data) {
  const token = localStorage.getItem("token");

  const url = `${config.server}/category`;
  const response = await axios.put(`${url}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function toggleCategoryStatus(id) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${config.server}/category/${id}/toggle-status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to toggle category status", error);
    throw error;
  }
}