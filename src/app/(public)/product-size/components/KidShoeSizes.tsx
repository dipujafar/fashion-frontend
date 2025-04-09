"use client";

import { useState } from "react";

const sizeChartData = {
  headers: [
    { id: "eu", label: "EU Size" },
    { id: "uk", label: "UK Size" },
    { id: "us", label: "US Size" },
  ],
  sizes: [
    { eu: "16", uk: "0.5", us: "1" },
    { eu: "17", uk: "1.5", us: "2" },
    { eu: "18", uk: "2", us: "2.5" },
    { eu: "19", uk: "3", us: "3.5" },
    { eu: "20", uk: "3.5", us: "4.5" },
    { eu: "21", uk: "4.5", us: "5" },
    { eu: "22", uk: "5.5", us: "6" },
    { eu: "23", uk: "6", us: "6.5" },
    { eu: "24", uk: "7", us: "7.5" },
    { eu: "25", uk: "7.5", us: "8" },
    { eu: "26", uk: "8.5", us: "9" },
    { eu: "27", uk: "9", us: "9.5" },
    { eu: "28", uk: "10", us: "10.5" },
    { eu: "29", uk: "11", us: "11" },
    { eu: "30", uk: "11.5", us: "12.5" },
  ],
};

const KidShoeSizes = () => {
  const [selectedSizes, setSelectedSizes] = useState<
    { type: string; value: string }[]
  >([]);

  const isSelected = (type: string, value: string) =>
    selectedSizes.some((s) => s.type === type && s.value === value);

  const handleSizeClick = (type: string, value: string) => {
    setSelectedSizes((prev) => {
      const exists = isSelected(type, value);
      return exists
        ? prev.filter((s) => !(s.type === type && s.value === value))
        : [...prev, { type, value }];
    });
  };

  return (
    <div className="w-full mx-auto">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse xl:text-xl text-base">
          <tbody>
            {sizeChartData.headers.map((header) => (
              <tr key={header.id}>
                <td className="px-2 py-3 font-medium">{header.label}</td>
                {sizeChartData.sizes.map((size, index) => {
                  const value = size[header.id as keyof typeof size];
                  return (
                    <td
                      key={index}
                      onClick={() => handleSizeClick(header.id, value)}
                      className={`border-r px-2 py-3 text-center cursor-pointer transition-colors text-primary-gray/90 ${
                        isSelected(header.id, value)
                          ? "bg-primary-pink"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KidShoeSizes;
