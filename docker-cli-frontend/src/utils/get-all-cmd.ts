import { config } from "@/config";

// === get all cmd func ===
export const getAllCmd = async () => {
  const response = await fetch(`${config.API_BASE_URL}/commands`, {
    method: "GET",
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
