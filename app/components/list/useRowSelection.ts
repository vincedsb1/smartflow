import { useState } from "react";

const useRowSelection = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowSelection = (index: number) => {
    setSelectedRow(index);
  };

  return { selectedRow, handleRowSelection };
};

export default useRowSelection;
