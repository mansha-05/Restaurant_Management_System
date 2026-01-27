import axios from "axios";
import { config } from "./config";

export async function getCategories() {
  const url = `${config.server}/category`;
  const response = await axios.get(url);
  return response.data;
}