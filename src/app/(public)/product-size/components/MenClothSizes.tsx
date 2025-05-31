"use client";

import { useState } from "react";

const sizeChartData = {
  headers: [
    { id: "international", label: "International Size" },
    { id: "uk", label: "UK Size" },
    { id: "us", label: "US Size" },
    { id: "eu", label: "EU Size" },
    { id: "chest", label: "Chest (inches)" },
    { id: "waist", label: "Waist (inches)" },
    { id: "hip", label: "Hip (inches)" },
  ],
  sizes: [
    {
      international: "XS",
      uk: "34–36",
      us: "34–36",
      eu: "44–46",
      chest: "34–36",
      waist: "28–30",
      hip: "34–36",
    },
    {
      international: "S",
      uk: "36–38",
      us: "36–38",
      eu: "46–48",
      chest: "36–38",
      waist: "30–32",
      hip: "36–38",
    },
    {
      international: "M",
      uk: "38–40",
      us: "38–40",
      eu: "48–50",
      chest: "38–40",
      waist: "32–34",
      hip: "38–40",
    },
    {
      international: "L",
      uk: "40–42",
      us: "40–42",
      eu: "50–52",
      chest: "40–42",
      waist: "34–36",
      hip: "40–42",
    },
    {
      international: "XL",
      uk: "42–44",
      us: "42–44",
      eu: "52–54",
      chest: "42–44",
      waist: "36–38",
      hip: "42–44",
    },
    {
      international: "XXL",
      uk: "44–46",
      us: "44–46",
      eu: "54–56",
      chest: "44–46",
      waist: "38–40",
      hip: "44–46",
    },
    {
      international: "XXXL",
      uk: "46–48",
      us: "46–48",
      eu: "56–58",
      chest: "46–48",
      waist: "40–42",
      hip: "46–48",
    },
    {
      international: "4XL",
      uk: "48–50",
      us: "48–50",
      eu: "58–60",
      chest: "48–50",
      waist: "42–44",
      hip: "48–50",
    },
    {
      international: "5XL",
      uk: "50–52",
      us: "50–52",
      eu: "60–62",
      chest: "50–52",
      waist: "44–46",
      hip: "50–52",
    },
    {
      international: "6XL",
      uk: "52–54",
      us: "52–54",
      eu: "62–64",
      chest: "52–54",
      waist: "46–48",
      hip: "52–54",
    },
    {
      international: "7XL",
      uk: "54–56",
      us: "54–56",
      eu: "64–66",
      chest: "54–56",
      waist: "48–50",
      hip: "54–56",
    },
    {
      international: "8XL",
      uk: "56–58",
      us: "56–58",
      eu: "66–68",
      chest: "56–58",
      waist: "50–52",
      hip: "56–58",
    },
  ],
};

const MenClothSizes = () => {
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
            <tr className="bg-[#F7F7F7]">
              <td className="px-2 py-3 font-medium">International Size</td>
              {sizeChartData.sizes.map((size, index) => (
                <td
                  key={index}
                  className="border-r border-white px-2 py-3 text-center text-black"
                >
                  {size.international}
                </td>
              ))}
            </tr>
            {["uk", "us", "eu", "chest", "waist", "hip"].map((type) => (
              <tr key={type}>
                <td className="px-2 py-3 font-medium capitalize">
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
                          ? "bg-[#efebeb]"
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

export default MenClothSizes;
