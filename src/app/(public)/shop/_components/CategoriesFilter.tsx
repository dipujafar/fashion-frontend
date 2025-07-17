"use client";

import { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { filterData, FilterOption } from "./data/filterOptions";

// Each filter item is now an object with optional description


type FilterKey = keyof typeof filterData;
type SelectedFilters = Record<FilterKey, string[]>;

export default function CategoryFilter() {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    () => {
      const initialState: Partial<SelectedFilters> = {};
      for (const key in filterData) {
        initialState[key as FilterKey] = [];
      }
      return initialState as SelectedFilters;
    }
  );
  const [priceRange, setPriceRange] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });

  const [searchTerms, setSearchTerms] = useState<Record<FilterKey, string>>(
    () => {
      const initial: Partial<Record<FilterKey, string>> = {};
      for (const key in filterData) {
        initial[key as FilterKey] = "";
      }
      return initial as Record<FilterKey, string>;
    }
  );

  const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);

  const handleFilterChange = (
    category: FilterKey,
    value: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value),
    }));
  };

  const removeFilter = (category: FilterKey, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }));
  };

  const clearAllFilters = () => {
    const cleared: Partial<SelectedFilters> = {};
    for (const key in filterData) {
      cleared[key as FilterKey] = [];
    }
    setSelectedFilters(cleared as SelectedFilters);
  };

  const getFilteredOptions = (category: FilterKey): FilterOption[] => {
    const searchTerm = searchTerms[category].toLowerCase();
    return filterData[category].filter((option) =>
      option.label.toLowerCase().includes(searchTerm)
    );
  };

  const formatCategoryName = (category: FilterKey) => {
    return (
      category.charAt(0).toUpperCase() +
      category.slice(1).replace(/([A-Z])/g, " $1")
    );
  };

  const getAllSelectedFilters = () => {
    const allSelected: Array<{ category: FilterKey; option: FilterOption }> =
      [];

    Object.entries(selectedFilters).forEach(([categoryKey, values]) => {
      const category = categoryKey as FilterKey;
      values.forEach((val) => {
        const option = filterData[category].find((o) => o.value === val);
        if (option) {
          allSelected.push({ category, option });
        }
      });
    });

    return allSelected;
  };

  const FilterDropdown = ({ category }: { category: FilterKey }) => (
    <DropdownMenu
      open={openDropdown === category}
      onOpenChange={(open) => setOpenDropdown(open ? category : null)}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 justify-between bg-transparent rounded-full"
        >
          {formatCategoryName(category)}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-0" align="start">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search for ${category}`}
              value={searchTerms[category]}
              onChange={(e) =>
                setSearchTerms((prev) => ({
                  ...prev,
                  [category]: e.target.value,
                }))
              }
              className="pl-9"
            />
          </div>
        </div>
        {category !== "colour" ? category === "price" ? <div></div>: (
          <div className="max-h-64 overflow-y-auto">
            {getFilteredOptions(category).map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-3 p-3 hover:bg-muted/50"
              >
                <Checkbox
                  className="border border-primary-gray/80"
                  id={`${category}-${option.value}`}
                  checked={selectedFilters[category].includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      category,
                      option.value,
                      checked as boolean
                    )
                  }
                />
                <label
                  htmlFor={`${category}-${option.value}`}
                  className="flex-1 text-sm cursor-pointer"
                >
                  {option.label}
                  {option.description && (
                    <div className="text-xs text-muted-foreground">
                      {option.description}
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto">
            {getFilteredOptions(category).map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-3 p-3 hover:bg-muted/50"
              >
                <label
                  htmlFor={`${category}-${option.value}`}
                  className="flex-1 text-sm cursor-pointer"
                >
                  <div className="flex items-center gap-x-1.5">
                    <div
                      className="size-7 rounded-full"
                      style={{ backgroundColor: option?.value }}
                    ></div>
                    <p className="text-lg">{option?.label}</p>
                  </div>
                </label>
                <Checkbox
                  className="border border-primary-gray/80"
                  id={`${category}-${option.value}`}
                  checked={selectedFilters[category].includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      category,
                      option.value,
                      checked as boolean
                    )
                  }
                />
              </div>
            ))}
             <div
                key={"multi"}
                className="flex items-center space-x-3 p-3 hover:bg-muted/50"
              >
                <label
                  htmlFor={`${category}-${"Multi"}`}
                  className="flex-1 text-sm cursor-pointer"
                >
                  <div className="flex items-center gap-x-1.5">
                    <div className="w-6 h-6 rounded-full bg-conic from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-red-500"></div>
                    <p className="text-lg">Multi</p>
                  </div>
                </label>
                <Checkbox
                  className="border border-primary-gray/80"
                  id={`${category}-${"Multi"}`}
                  checked={selectedFilters[category].includes("Multi")}
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      category,
                      "Multi",
                      checked as boolean
                    )
                  }
                />
              </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="w-full">
      {/* Filter Dropdowns */}
      <div className="py-0 rounded-lg mb-4">
        <div className="flex flex-wrap gap-3">
          {(Object.keys(filterData) as FilterKey[]).map((category) => (
            <FilterDropdown key={category} category={category} />
          ))}
        </div>
      </div>

      {/* Selected Filters Tags */}
      {getAllSelectedFilters().length > 0 && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex flex-wrap gap-2">
              {getAllSelectedFilters().map(({ category, option }, index) => (
                <div
                  key={`${category}-${option.value}-${index}`}
                  className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-sm"
                >
                  <span>{option.label}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeFilter(category, option.value)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="border-gray-200 hover:bg-gray-50 hover:border-gray-300 font-medium bg-transparent cursor-pointer"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
