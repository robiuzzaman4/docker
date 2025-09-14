import { config } from "@/config";

// === delete cmd func ===
export const deleteCmd = async (id: string) => {
  const response = await fetch(`${config.API_BASE_URL}/commands/${id}`, {
    method: "DELETE",
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
