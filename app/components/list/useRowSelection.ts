import { useState } from "react";

function useRowSelection(initialIndex: number | null = null) {
  const [selectedRow, setSelectedRow] = useState<number | null>(initialIndex);

  const handleRowSelection = (index: number) => {
    setSelectedRow(index);
  };

  return { selectedRow, handleRowSelection };
}

export default useRowSelection;
