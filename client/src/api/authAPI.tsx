import { UserLogin } from "../interfaces/UserLogin";

// Read the backend base URL from the Vite env var,
// falling back to '' for local dev (where Vite proxies /api to localhost:3001)
const BASE = import.meta.env.VITE_BACKEND_URL || "";

const login = async (userInfo: UserLogin) => {
  const response = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    // Attempt to parse JSON error, otherwise read text
    let message: string;
    try {
      const err = await response.json();
      message = err.message || JSON.stringify(err);
    } catch {
      message = await response.text();
    }
    throw new Error(message || "Login failed");
  }

  // Expect { token: string }
  const { token } = await response.json();
  return token;
};

export { login };
