"use client";

import { useState } from "react";

const sizeChartData = {
  headers: [
    { id: "international", label: "International Size" },
    { id: "uk", label: "UK Size" },
    { id: "us", label: "US Size" },
    { id: "eu", label: "EU Size" },
    { id: "height", label: "Height (inches)" },
    { id: "chest", label: "Chest (inches)" },
    { id: "hip", label: "Hip (inches)" },
  ],
  sizes: [
    {
      international: "New-born",
      uk: "0–3",
      us: "0–3",
      eu: "56–62",
      height: "18–23",
      chest: "16–17",
      hip: "17–18",
    },
    {
      international: "2–6 mon",
      uk: "3–6",
      us: "3–6",
      eu: "62–68",
      height: "23–26",
      chest: "17–18",
      hip: "18–19",
    },
    {
      international: "6–12 mon",
      uk: "6–12",
      us: "6–12",
      eu: "68–80",
      height: "26–30",
      chest: "18–19",
      hip: "19–20",
    },
    {
      international: "12–18 mon",
      uk: "12–18",
      us: "12–18",
      eu: "80–86",
      height: "30–33",
      chest: "19–20",
      hip: "20–21",
    },
    {
      international: "18–24 mon",
      uk: "18–24",
      us: "18–24",
      eu: "86–92",
      height: "33–36",
      chest: "20–21",
      hip: "21–22",
    },
    {
      international: "2T",
      uk: "2",
      us: "2T",
      eu: "92",
      height: "33–35",
      chest: "21–22",
      hip: "22–23",
    },
    {
      international: "3T",
      uk: "3",
      us: "3T",
      eu: "98",
      height: "35–37",
      chest: "22–23",
      hip: "23–24",
    },
    {
      international: "4T",
      uk: "4",
      us: "4T",
      eu: "104",
      height: "37–39",
      chest: "23–24",
      hip: "24–25",
    },
    {
      international: "Kids (6)",
      uk: "6",
      us: "6",
      eu: "116",
      height: "41–45",
      chest: "24–25",
      hip: "25–26",
    },
    {
      international: "Kids (8)",
      uk: "8",
      us: "8",
      eu: "128",
      height: "45–49",
      chest: "25–26",
      hip: "26–27",
    },
    {
      international: "Kids (10)",
      uk: "10",
      us: "10",
      eu: "134",
      height: "49–51",
      chest: "26–27",
      hip: "26–27",
    },
    {
      international: "Kids (12)",
      uk: "12",
      us: "12",
      eu: "140",
      height: "51–53",
      chest: "27–28",
      hip: "27–28",
    },
    {
      international: "Kids (14)",
      uk: "14",
      us: "14",
      eu: "146",
      height: "53–55",
      chest: "28–29",
      hip: "28–29",
    },
    {
      international: "Kids (16)",
      uk: "16",
      us: "16",
      eu: "152",
      height: "55–57",
      chest: "29–30",
      hip: "29–30",
    },
  ],
};

const KidClothSizes = () => {
  const [selectedSizes, setSelectedSizes] = useState<
    { type: string; value: string }[]
  >([]);

  const isSelectable = (type: string) => ["uk", "us", "eu"].includes(type);

  const isSelected = (type: string, value: string) =>
    selectedSizes.some((s) => s.type === type && s.value === value);

  const handleSizeClick = (type: string, value: string) => {
    if (!isSelectable(type)) return;
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
            {sizeChartData.headers
              .filter((h) => h.id !== "international")
              .map((header) => (
                <tr key={header.id}>
                  <td className="px-2 py-3 font-medium">{header.label}</td>
                  {sizeChartData.sizes.map((size, index) => {
                    const value = size[header.id as keyof typeof size];
                    return (
                      <td
                        key={index}
                        onClick={() =>
                          handleSizeClick(header.id, value.toString())
                        }
                        className={`border-r px-2 py-3 text-center transition-colors ${
                          isSelectable(header.id)
                            ? "cursor-pointer text-primary-gray/90"
                            : "cursor-default text-gray-500"
                        } ${
                          isSelectable(header.id) &&
                          isSelected(header.id, value.toString())
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

export default KidClothSizes;
