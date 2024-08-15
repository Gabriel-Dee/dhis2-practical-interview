"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [dataElements, setDataElements] = useState<DataElement[]>([]);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataElements = async () => {
      try {
        const response = await fetch("/api/dhis2");

        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setDataElements(data.dataElements || []);
        setTableData(
          (data.dataElements || []).map((de: DataElement) => ({
            name: de.name,
            value: 0,
            percent: 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching data elements:", error);

        // Narrowing the error type
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setError(errorMessage);
      }
    };

    fetchDataElements();
  }, []);

  const handleValueChange = (index: number, value: number) => {
    const newTableData = [...tableData];
    newTableData[index].value = value;
    newTableData[index].percent = (value / 40) * 100;
    setTableData(newTableData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Data Capture Form with Percentage Calculation
      </h1>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Data Element Name</th>
            <th className="border border-gray-300 p-2">Value</th>
            <th className="border border-gray-300 p-2">
              Percent = (Value/40)*100
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{row.name}</td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={row.value}
                  onChange={(e) =>
                    handleValueChange(index, Number(e.target.value))
                  }
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                {row.percent.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
