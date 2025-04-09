"use client";

import { useState } from "react";

const sizeChartData = {
  headers: [
    { id: "international", label: "International Size" },
    { id: "uk", label: "UK Size" },
    { id: "us", label: "US Size" },
    { id: "eu", label: "EU Size" },
    { id: "chestIn", label: "Chest (in)" },
    { id: "chestCm", label: "Chest (cm)" },
  ],
  sizes: [
    {
      international: "S",
      uk: "34",
      us: "34",
      eu: "44",
      chestIn: "34",
      chestCm: "86",
    },
    {
      international: "S",
      uk: "36",
      us: "36",
      eu: "46",
      chestIn: "36",
      chestCm: "91",
    },
    {
      international: "M",
      uk: "38",
      us: "38",
      eu: "48",
      chestIn: "38",
      chestCm: "96",
    },
    {
      international: "M",
      uk: "40",
      us: "40",
      eu: "50",
      chestIn: "40",
      chestCm: "101",
    },
    {
      international: "L",
      uk: "42",
      us: "42",
      eu: "52",
      chestIn: "42",
      chestCm: "106",
    },
    {
      international: "L",
      uk: "44",
      us: "44",
      eu: "54",
      chestIn: "44",
      chestCm: "111",
    },
    {
      international: "XL",
      uk: "46",
      us: "46",
      eu: "56",
      chestIn: "46",
      chestCm: "116",
    },
    {
      international: "XL",
      uk: "48",
      us: "48",
      eu: "58",
      chestIn: "48",
      chestCm: "121",
    },
    {
      international: "XXL",
      uk: "50",
      us: "50",
      eu: "60",
      chestIn: "50",
      chestCm: "127",
    },
  ],
};

const ManSuitsJacketsSizes = () => {
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

  const rowTypes = ["uk", "us", "eu", "chestIn", "chestCm"];

  return (
    <div className="w-full mx-auto">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse xl:text-xl text-base">
          <tbody>
            <tr className="bg-primary-pink">
              <td className="px-2 py-3 font-medium">International Size</td>
              {sizeChartData.sizes.map((size, index) => (
                <td
                  key={index}
                  className="border-r border-white px-2 py-3 text-center text-primary-red"
                >
                  {size.international}
                </td>
              ))}
            </tr>

            {rowTypes.map((type) => (
              <tr key={type}>
                <td className="px-2 py-3 font-medium">
                  {sizeChartData.headers.find((h) => h.id === type)?.label}
                </td>
                {sizeChartData.sizes.map((size, index) => {
                  const value = size[type as keyof typeof size];
                  return (
                    <td
                      key={index}
                      onClick={() => handleSizeClick(type, value)}
                      className={`border-r px-2 py-3 text-center cursor-pointer transition-colors text-primary-gray/90 ${
                        isSelected(type, value)
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

export default ManSuitsJacketsSizes;
