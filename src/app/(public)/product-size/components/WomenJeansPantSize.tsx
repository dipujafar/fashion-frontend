"use client";

import { useState } from "react";

const sizeChartData = {
  headers: [
    { id: "international", label: "International Size" },
    { id: "uk", label: "UK Size" },
    { id: "us", label: "US Size" },
    { id: "eu", label: "EU Size" },
    { id: "waist", label: "Waist (inches)" },
    { id: "hip", label: "Hip (inches)" },
  ],
  sizes: [
    {
      international: "XXXS",
      uk: "2",
      us: "00",
      eu: "30",
      waist: "24–25",
      hip: "34–35",
    },
    {
      international: "XXS",
      uk: "4",
      us: "0",
      eu: "32",
      waist: "25–26",
      hip: "35–36",
    },
    {
      international: "XS",
      uk: "6",
      us: "2",
      eu: "34",
      waist: "26–27",
      hip: "36–37",
    },
    {
      international: "S",
      uk: "8",
      us: "4",
      eu: "36",
      waist: "27–28",
      hip: "37–38",
    },
    {
      international: "M",
      uk: "10",
      us: "6",
      eu: "38",
      waist: "28–29",
      hip: "38–39",
    },
    {
      international: "L",
      uk: "12",
      us: "8",
      eu: "40",
      waist: "29–30",
      hip: "39–40",
    },
    {
      international: "XL",
      uk: "14",
      us: "10",
      eu: "42",
      waist: "30–31",
      hip: "40–41",
    },
    {
      international: "XXL",
      uk: "16",
      us: "12",
      eu: "44",
      waist: "31–32",
      hip: "41–42",
    },
    {
      international: "XXXL",
      uk: "18",
      us: "14",
      eu: "46",
      waist: "32–33",
      hip: "42–43",
    },
    {
      international: "4XL",
      uk: "20",
      us: "16",
      eu: "48",
      waist: "33–34",
      hip: "43–44",
    },
    {
      international: "5XL",
      uk: "22",
      us: "18",
      eu: "50",
      waist: "34–35",
      hip: "44–45",
    },
    {
      international: "6XL",
      uk: "24",
      us: "20",
      eu: "52",
      waist: "35–36",
      hip: "45–46",
    },
    {
      international: "7XL",
      uk: "26",
      us: "22",
      eu: "54",
      waist: "36–37",
      hip: "46–47",
    },
    {
      international: "8XL",
      uk: "28",
      us: "24",
      eu: "56",
      waist: "37–38",
      hip: "47–48",
    },
    {
      international: "9XL",
      uk: "30",
      us: "26",
      eu: "58",
      waist: "38–39",
      hip: "48–49",
    },
  ],
};

const WomenJeansPantSize = () => {
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

  const rowTypes = ["uk", "us", "eu", "waist", "hip"];

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

export default WomenJeansPantSize;
