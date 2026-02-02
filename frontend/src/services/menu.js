import axios from 'axios'
import { config } from './config'

export async function getMenu() {
  try {
    const token = localStorage.getItem("token")

    const url = `${config.server}/menu`

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function getAllMenuManager() {
  const token = localStorage.getItem("token")

  const url = `${config.server}/menu/manager`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function saveMenuItem(menuItem) {
  const token = localStorage.getItem("token")

  const url = `${config.server}/menu/add`;

  const formData = new FormData();
  formData.append("item_name", menuItem.item_name);
  formData.append("description", menuItem.description);
  formData.append("price", menuItem.price);
  formData.append("categoryId", menuItem.categoryId);
  formData.append("imageFile", menuItem.imageFile);

  const response = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updateMenuItem(menuItem) {
  const token = localStorage.getItem("token")

  const url = `${config.server}/menu/update`;

  const formData = new FormData();
  formData.append("id", menuItem.id);
  formData.append("item_name", menuItem.item_name);
  formData.append("description", menuItem.description);
  formData.append("price", menuItem.price);
  formData.append("categoryId", menuItem.categoryId);

  if (menuItem.imageFile) {
    formData.append("imageFile", menuItem.imageFile);
  }

  const response = await axios.put(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function toggleMenuStatus(id) {
  const token = localStorage.getItem("token")

  const url = `${config.server}/menu/toggleStatus/${id}`;
  const response = await axios.put(url, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}