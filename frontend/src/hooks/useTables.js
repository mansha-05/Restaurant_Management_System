import { useEffect, useState } from "react";
import {
  getAllTables,
  addTable,
  updateTable,
  updateTableStatus,
  deleteTable
} from "../services/tableService";

export const useTables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTables = async () => {
    setLoading(true);
    const data = await getAllTables();
    setTables(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return {
    tables,
    loading,
    addTable: async (t) => { await addTable(t); fetchTables(); },
    updateTable: async (id, t) => { await updateTable(id, t); fetchTables(); },
    updateTableStatus: async (id, s) => { await updateTableStatus(id, s); fetchTables(); },
    deleteTable: async (id) => { await deleteTable(id); fetchTables(); }
  };
};
