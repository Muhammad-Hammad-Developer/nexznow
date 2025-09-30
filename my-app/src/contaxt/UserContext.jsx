import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("Current user:", result.data);
    } catch (error) {
      setUserData(null);
      console.error("Error fetching current user:", error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
      setUserData(null); // ✅ clear context
      localStorage.removeItem("user"); // ✅ optional if storing locally
      console.log("User logged out");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [serverUrl]);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
    logoutUser,  // ✅ expose logout
    loading,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
