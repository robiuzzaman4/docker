import { config } from "@/config";
import type { ICommand } from "@/types";

// === add cmd func ===
export const addCmd = async (payload: ICommand) => {
  const response = await fetch(`${config.API_BASE_URL}/commands`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": config.API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
