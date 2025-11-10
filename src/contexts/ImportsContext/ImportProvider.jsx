import React, { useContext, useEffect, useState } from "react";
import { ImportsContext } from "./ImportsContext";
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";

export const ImportsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImports = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/myImports?email=${user.email}`
      );
      const data = await res.json();
      setImports(data);
    } catch (err) {
      toast.error("Failed to load your imports");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImports();
  }, [user]);

  const addImport = (newImport) => {
    setImports((prev) => [newImport, ...prev]);
  };

  const removeImport = (id) => {
    setImports((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <ImportsContext
      value={{
        imports,
        loading,
        fetchImports,
        addImport,
        removeImport,
      }}
    >
      {children}
    </ImportsContext>
  );
};
