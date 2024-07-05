import { useState, useEffect } from "react";

const useRowSelection = (initialIndex: number | null) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(initialIndex);

  useEffect(() => {
    setSelectedRow(initialIndex);
  }, [initialIndex]);

  const handleRowSelection = (index: number) => {
    setSelectedRow(index);
  };

  return { selectedRow, handleRowSelection };
};

export default useRowSelection;
