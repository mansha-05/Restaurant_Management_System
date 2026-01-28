import axios from "axios";
import { config } from "./config";

export async function createManager(data) {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(`${config.server}/admin/create-manager`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
    return { status: "error", error: "Failed to create manager" };
  }
}

export async function fetchAllUsers() {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${config.server}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Fetch users error:", error);
    return [];
  }
}

