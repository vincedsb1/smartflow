import { UserContext } from "../../context/UserContext";
import jwt from "jsonwebtoken";

const ServerBirthdayEditPage = async (birthday: string, token: string) => {
  try {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken?.userId;

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    if (!birthday) {
      throw new Error("Birthday is required");
    }

    const response = await fetch(`/api/users/birthday/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ birthday }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.birthday;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default ServerBirthdayEditPage;
