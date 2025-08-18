"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { navigationData } from "@/lib/navigation-data";

interface SelectedOption {
  type: "all" | "category" | "subcategory" | "item";
  mainCategory?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  itemName?: string;
  timestamp: number;
}

interface SellerProfileCategoryFilterProps {
  onSelectionChange?: (selection: SelectedOption) => void;
  className?: string;
}

export function SellerProfileCategoryFilter({
  onSelectionChange,
  className = "",
}: SellerProfileCategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    type: "all",
    timestamp: Date.now(),
  });
  const [currentView, setCurrentView] = useState<
    "main" | "subcategories" | "items"
  >("main");
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);

  // Function to get the display text for current selection
  const getDisplayText = useCallback(() => {
    switch (selectedOption.type) {
      case "all":
        return "All";
      case "category":
        return selectedOption.mainCategory || "All";
      case "subcategory":
        return selectedOption.subcategoryName || "All";
      case "item":
        return selectedOption.itemName || "All";
      default:
        return "All";
    }
  }, [selectedOption]);

  // Handle selection and track last selected option
  const handleSelection = useCallback(
    (selection: Omit<SelectedOption, "timestamp">) => {
      const newSelection: SelectedOption = {
        ...selection,
        timestamp: Date.now(),
      };

      setSelectedOption(newSelection);
      onSelectionChange?.(newSelection);
      setIsOpen(false);

      // Reset view state
      setCurrentView("main");
      setSelectedMainCategory("");
      setSelectedSubcategory(null);
    },
    [onSelectionChange]
  );

  // Handle "All" selection
  const handleAllSelection = () => {
    handleSelection({ type: "all" });
  };

  // Handle main category selection
  const handleMainCategoryClick = (categoryKey: string) => {
    const categoryData =
      navigationData[categoryKey as keyof typeof navigationData];

    if (
      categoryData.subcategories.length === 1 &&
      categoryData.subcategories[0].id === "all"
    ) {
      // If only "All" subcategory exists, select the main category
      handleSelection({
        type: "category",
        mainCategory: categoryKey,
      });
    } else {
      // Show subcategories
      setSelectedMainCategory(categoryKey);
      setCurrentView("subcategories");
    }
  };

  // Handle subcategory selection
  const handleSubcategoryClick = (subcategory: any) => {
    if (subcategory.id === "all") {
      // Select all items in this main category
      handleSelection({
        type: "category",
        mainCategory: selectedMainCategory,
      });
    } else if (subcategory.categories.length === 0) {
      // No items, select the subcategory itself
      handleSelection({
        type: "subcategory",
        mainCategory: selectedMainCategory,
        subcategoryId: subcategory.id,
        subcategoryName: subcategory.name,
      });
    } else {
      // Show items
      setSelectedSubcategory(subcategory);
      setCurrentView("items");
    }
  };

  // Handle item selection
  const handleItemClick = (itemName: string) => {
    if (itemName === "All") {
      // Select all items in this subcategory
      handleSelection({
        type: "subcategory",
        mainCategory: selectedMainCategory,
        subcategoryId: selectedSubcategory.id,
        subcategoryName: selectedSubcategory.name,
      });
    } else {
      // Select specific item
      handleSelection({
        type: "item",
        mainCategory: selectedMainCategory,
        subcategoryId: selectedSubcategory.id,
        subcategoryName: selectedSubcategory.name,
        itemName: itemName,
      });
    }
  };

  // Go back to previous view
  const handleBack = () => {
    if (currentView === "items") {
      setCurrentView("subcategories");
      setSelectedSubcategory(null);
    } else if (currentView === "subcategories") {
      setCurrentView("main");
      setSelectedMainCategory("");
    }
  };

  // Check if an option is selected
  const isSelected = (type: string, value?: string) => {
    switch (type) {
      case "all":
        return selectedOption.type === "all";
      case "category":
        return (
          selectedOption.type === "category" &&
          selectedOption.mainCategory === value
        );
      case "subcategory":
        return (
          selectedOption.type === "subcategory" &&
          selectedOption.subcategoryId === value
        );
      case "item":
        return (
          selectedOption.type === "item" && selectedOption.itemName === value
        );
      default:
        return false;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors border-none"
      >
        <span className="text-sm font-medium text-muted-foreground">Category:</span>
        <span className="text-sm text-gray-900">{getDisplayText()}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="max-h-96 overflow-y-auto">
            {/* Main Categories View */}
            {currentView === "main" && (
              <div className="p-2">
                {/* All Option */}
                <button
                  onClick={handleAllSelection}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${
                    isSelected("all")
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {isSelected("all") && (
                      <div className="w-3 h-3 bg-black rounded-full" />
                    )}
                  </div>
                  <span className="text-sm font-medium">All</span>
                </button>

                {/* Category Options */}
                {Object.entries(navigationData).map(
                  ([categoryKey, categoryData]) => (
                    <button
                      key={categoryKey}
                      onClick={() => handleMainCategoryClick(categoryKey)}
                      className={` w-full flex items-center justify-between jue gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${
                        isSelected("category", categoryKey)
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="text-sm">
                        {categoryKey.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <div>
                        <ChevronRight className="w-4 h-4 text-gray-400 0" />
                      </div>
                    </button>
                  )
                )}
              </div>
            )}

            {/* Subcategories View */}
            {currentView === "subcategories" && selectedMainCategory && (
              <div className="p-2">
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md mb-2"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to Categories
                </button>

                {/* Subcategory Options */}
                {navigationData[
                  selectedMainCategory as keyof typeof navigationData
                ].subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => handleSubcategoryClick(subcategory)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${
                      isSelected("subcategory", subcategory.id)
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      {subcategory.icon && (
                        <subcategory.icon className="w-4 h-4" />
                      )}
                      {isSelected("subcategory", subcategory.id) && (
                        <div className="w-3 h-3 bg-black rounded-full" />
                      )}
                    </div>
                    <span className="text-sm">{subcategory.name}</span>
                    {subcategory.categories.length > 0 && (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Items View */}
            {currentView === "items" && selectedSubcategory && (
              <div className="p-2">
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md mb-2"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to {selectedSubcategory.name}
                </button>

                {/* Items */}
                {selectedSubcategory.categories.map(
                  (category: any, categoryIndex: number) => (
                    <div key={categoryIndex} className="mb-4">
                      {category.title && (
                        <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {category.title}
                        </div>
                      )}
                      {category.items.map((item: string) => (
                        <button
                          key={item}
                          onClick={() => handleItemClick(item)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${
                            isSelected("item", item)
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          <div className="w-5 h-5 flex items-center justify-center">
                            {isSelected("item", item) && (
                              <div className="w-3 h-3 bg-black rounded-full" />
                            )}
                          </div>
                          <span className="text-sm">{item}</span>
                        </button>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Hook to get the last selected option
export function useLastSelectedOption() {
  const [lastSelected, setLastSelected] = useState<SelectedOption | null>(null);

  const updateLastSelected = useCallback((selection: SelectedOption) => {
    setLastSelected(selection);
  }, []);

  return { lastSelected, updateLastSelected };
}
