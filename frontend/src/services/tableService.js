const BASE_URL = "http://localhost:8080/manager/tables";

export const getAllTables = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};

export const addTable = async (table) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(table),
  });
  if (!res.ok) throw new Error("Add failed");
};

export const updateTable = async (tableId, table) => {
  const res = await fetch(`${BASE_URL}/${tableId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(table),
  });
  if (!res.ok) throw new Error("Update failed");
};

export const updateTableStatus = async (tableId, status) => {
  const res = await fetch(`${BASE_URL}/${tableId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Status update failed");
};

export const deleteTable = async (tableId) => {
  const res = await fetch(`${BASE_URL}/${tableId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete failed");
};
