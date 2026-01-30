const BASE_URL = "http://localhost:8080/manager/tables";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getAllTables = async () => {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};

export const addTable = async (table) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(table),
  });
  if (!res.ok) throw new Error("Add failed");
};

export const updateTable = async (tableId, table) => {
  const res = await fetch(`${BASE_URL}/${tableId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(table),
  });
  if (!res.ok) throw new Error("Update failed");
};

export const updateTableStatus = async (tableId, status) => {
  const res = await fetch(`${BASE_URL}/${tableId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Status update failed");
};

export const deleteTable = async (tableId) => {
  const res = await fetch(`${BASE_URL}/${tableId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Delete failed");
};