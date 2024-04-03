import { UserContext } from "../../context/UserContext";
import jwt from "jsonwebtoken";

const ServerFirstNameEditPage = async (firstname: string, token: string) => {
  try {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken?.userId;

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    const response = await fetch(`/api/users/firstname/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstname }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.firstname;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default ServerFirstNameEditPage;
