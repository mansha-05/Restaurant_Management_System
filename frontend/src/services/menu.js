import axios from 'axios'
import { config } from './config'

export async function getMenu() {
  try {
    // create url
    const url = `${config.server}/menu`

    // create headers with require token
    // send GET request and get the response
    const response = await axios.get(url
    //     , {
    //   headers: {
    //     token: localStorage.getItem('token'),
    //   },
    // }
    )

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}
export async function getAllMenuManager() {
  const url = `${config.server}/menu/manager`;
  const response = await axios.get(url);
  return response.data;
}

export async function saveMenuItem(menuItem) {
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
    },
  });

  return response.data;
}

// export async function saveMenuItem(menuItem) {
//   const url = `${config.server}/menu/addMenu`;
//   const response = await axios.post(url, menuItem);
//   return response.data;
// }

export async function updateMenuItem(menuItem) {
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
    },
  });

  return response.data;
}

// export async function updateMenuItem(menuItem) {
//   const url = `${config.server}/menu/updateMenu`;
//   const response = await axios.post(url, menuItem);
//   return response.data;
// }

export async function toggleMenuStatus(id) {
  const url = `${config.server}/menu/toggleStatus/${id}`;
  const response = await axios.put(url);
  return response.data;
}
