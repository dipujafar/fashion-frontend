"use client";

import { useState } from "react";

const sizeChartData = {
  headers: [
    { id: "international", label: "International Size" },
    { id: "uk", label: "UK Size" },
    { id: "us", label: "US Size" },
    { id: "eu", label: "EU Size" },
    { id: "bustIn", label: "Bust (in)" },
    { id: "bustCm", label: "Bust (cm)" },
  ],
  sizes: [
    {
      international: "XXS",
      uk: "4",
      us: "0",
      eu: "32",
      bustIn: "31–32",
      bustCm: "78–81",
    },
    {
      international: "XS",
      uk: "6",
      us: "2",
      eu: "34",
      bustIn: "32–33",
      bustCm: "81–84",
    },
    {
      international: "S",
      uk: "8",
      us: "4",
      eu: "36",
      bustIn: "33–34",
      bustCm: "84–86",
    },
    {
      international: "S",
      uk: "10",
      us: "6",
      eu: "38",
      bustIn: "34–36",
      bustCm: "86–91",
    },
    {
      international: "M",
      uk: "12",
      us: "8",
      eu: "40",
      bustIn: "36–38",
      bustCm: "91–96",
    },
    {
      international: "M",
      uk: "14",
      us: "10",
      eu: "42",
      bustIn: "38–40",
      bustCm: "96–101",
    },
    {
      international: "L",
      uk: "16",
      us: "12",
      eu: "44",
      bustIn: "40–42",
      bustCm: "101–106",
    },
    {
      international: "L",
      uk: "18",
      us: "14",
      eu: "46",
      bustIn: "42–44",
      bustCm: "106–111",
    },
    {
      international: "XL",
      uk: "20",
      us: "16",
      eu: "48",
      bustIn: "44–46",
      bustCm: "111–116",
    },
  ],
};

const WomenSuitsJackets = () => {
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

  const rowTypes = ["uk", "us", "eu", "bustIn", "bustCm"];

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

export default WomenSuitsJackets;
