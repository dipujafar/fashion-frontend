"use client";

import { useState } from "react";

const sizeChartData = {
  headers: [
    { id: "eu", label: "EU Size" },
    { id: "uk", label: "UK Size" },
    { id: "us", label: "US Size" },
  ],
  sizes: [
    { eu: "34", uk: "1", us: "3" },
    { eu: "34.5", uk: "1.5", us: "3.5" },
    { eu: "35", uk: "2", us: "4" },
    { eu: "35.5", uk: "2.5", us: "4.5" },
    { eu: "36", uk: "3", us: "5" },
    { eu: "36.5", uk: "3.5", us: "5.5" },
    { eu: "37", uk: "4", us: "6" },
    { eu: "37.5", uk: "4.5", us: "6.5" },
    { eu: "38", uk: "5", us: "7" },
    { eu: "38.5", uk: "5.5", us: "7.5" },
    { eu: "39", uk: "6", us: "8" },
    { eu: "39.5", uk: "6.5", us: "8.5" },
    { eu: "40", uk: "7", us: "9" },
    { eu: "40.5", uk: "7.5", us: "9.5" },
    { eu: "41", uk: "8", us: "10" },
  ],
};

const WomenShoeSize = () => {
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
                          ? "bg-[#efebeb]"
                          : "bg-white hover:bg-gray-50"
                      } `}
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

export default WomenShoeSize;
