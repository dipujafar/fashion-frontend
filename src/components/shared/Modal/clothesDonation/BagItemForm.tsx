"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera, X } from "lucide-react";
import {
  ITEM_TYPES,
  BAG_CONTENTS,
  BAG_CONDITIONS,
  ITEMS_COUNT_OPTIONS,
  WASHED_OPTIONS,
} from "./schema";
import { cn } from "@/lib/utils";
import { DonationPhotoBoxItem } from "./SingleItemForm";

const MAX_PHOTOS = 8;
const BAG_PHOTO_INPUT_ID = "bag-donation-photo-uploader";

interface BagItemFormProps {
  form: any;
  images: File[];
  onAddFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditImage: (index: number) => void;
  onRemoveImage: (index: number) => void;
}

export default function BagItemForm({
  form,
  images,
  onAddFiles,
  onEditImage,
  onRemoveImage,
}: BagItemFormProps) {
  const selectedContents: string[] = form.watch("personTypes") || [];
  const selectedTypes: string[] = form.watch("itemTypes") || [];
  const selectedBrands: string[] = form.watch("brands") || [];

  const toggleContent = (content: string) => {
    const updated = selectedContents.includes(content)
      ? selectedContents.filter((c) => c !== content)
      : [...selectedContents, content];
    form.setValue("personTypes", updated, { shouldValidate: true });
  };

  const toggleItemType = (type: string) => {
    const updated = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    form.setValue("itemTypes", updated, { shouldValidate: true });
  };

  const visibleSlots = Math.min(images.length + 1, MAX_PHOTOS);
  const boxes = Array.from({ length: visibleSlots });

  return (
    <div className="space-y-5">
      {/* What is in the bag (Multiple selection) */}
      <FormField
        control={form.control}
        name="personTypes"
        render={() => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              What is in the bag?
            </FormLabel>

            {selectedContents.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedContents.map((content) => (
                  <Badge
                    key={content}
                    variant="secondary"
                    className="cursor-pointer gap-1.5 pl-2.5 pr-2 py-1 rounded bg-black text-white hover:bg-neutral-800"
                    onClick={() => toggleContent(content)}
                  >
                    {content}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 pt-1">
              {BAG_CONTENTS.map((content) => {
                const isSelected = selectedContents.includes(content);
                return (
                  <Button
                    key={content}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleContent(content)}
                    className={cn(
                      "text-xs rounded shadow-none cursor-pointer transition-colors h-9",
                      !isSelected &&
                        "bg-white border-[#e1e1e1] text-gray-800 hover:bg-gray-50 hover:border-primary-black"
                    )}
                  >
                    {content}
                  </Button>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Item Type Selection (Multiple selection) */}
      <FormField
        control={form.control}
        name="itemTypes"
        render={() => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              Item type
            </FormLabel>

            {selectedTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedTypes.map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="cursor-pointer gap-1.5 pl-2.5 pr-2 py-1 rounded bg-black text-white hover:bg-neutral-800"
                    onClick={() => toggleItemType(type)}
                  >
                    {type}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 pt-1">
              {ITEM_TYPES.map((type) => {
                const isSelected = selectedTypes.includes(type);
                return (
                  <Button
                    key={type}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleItemType(type)}
                    className={cn(
                      "text-xs rounded shadow-none cursor-pointer transition-colors h-9",
                      !isSelected &&
                        "bg-white border-[#e1e1e1] text-gray-800 hover:bg-gray-50 hover:border-primary-black"
                    )}
                  >
                    {type}
                  </Button>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Main Brands (Comma-separated tag input like AddProductForm) */}
      <FormField
        control={form.control}
        name="brands"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              Main brands{" "}
              <span className="text-sm font-normal text-muted-foreground">
                (Optional)
              </span>
            </FormLabel>
            <FormControl>
              <BrandTagInput
                value={selectedBrands}
                onChange={field.onChange}
                placeholder="Type brand and press comma or Enter..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Approx. Number of Items */}
      <FormField
        control={form.control}
        name="itemsCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              Approx. number of items
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3 w-full cursor-pointer focus-within:border-primary-black">
                  <SelectValue placeholder="Select number of items" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="p-0 rounded-none">
                {ITEMS_COUNT_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="rounded-none cursor-pointer py-2.5 px-3 text-base"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Overall Condition */}
      <FormField
        control={form.control}
        name="condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              Overall condition
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3 w-full cursor-pointer focus-within:border-primary-black">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="p-0 rounded-none">
                {BAG_CONDITIONS.map((condition) => (
                  <SelectItem
                    key={condition}
                    value={condition}
                    className="rounded-none cursor-pointer py-2.5 px-3 text-base"
                  >
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Washed */}
      <FormField
        control={form.control}
        name="washedType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              Washed?
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3 w-full cursor-pointer focus-within:border-primary-black">
                  <SelectValue placeholder="Select wash status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="p-0 rounded-none">
                {WASHED_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="rounded-none cursor-pointer py-2.5 px-3 text-base"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Bag Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              Bag description{" "}
              <span className="text-sm font-normal text-muted-foreground">
                (Optional)
              </span>
            </FormLabel>
            <FormControl>
              <Textarea
                className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base px-3"
                placeholder="Colours, size, fit, anything else helpful..."
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Photos (1 by 1 like AddProductForm) */}
      <div className="space-y-2">
        <div>
          <p className="text-base font-semibold text-gray-900">Photos</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Add up to {MAX_PHOTOS} photos in JPEG or PNG format.
          </p>
        </div>

        <input
          id={BAG_PHOTO_INPUT_ID}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={onAddFiles}
        />

        <div className="mt-3 grid grid-cols-3 md:grid-cols-4 gap-3">
          {boxes.map((_, i) => {
            const file = images[i];

            if (file) {
              return (
                <DonationPhotoBoxItem
                  key={i}
                  file={file}
                  index={i}
                  onEdit={onEditImage}
                  onRemove={onRemoveImage}
                />
              );
            }

            return (
              <label
                key={i}
                htmlFor={BAG_PHOTO_INPUT_ID}
                className="aspect-square rounded border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 transition-all cursor-pointer hover:border-black hover:text-black hover:bg-gray-50"
              >
                <Camera size={22} strokeWidth={1.75} />
                <span className="text-[11px] font-medium mt-1 text-gray-500">
                  {i === 0 ? "Add Photo" : "Add More"}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Brand Tag Input (like TagInput in AddProductForm, supporting comma & Enter) ─

function BrandTagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (brands: string[]) => void;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState("");

  const addBrandsFromString = (raw: string) => {
    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (parts.length === 0) return;

    const next = [...value];
    for (const part of parts) {
      if (!next.includes(part)) {
        next.push(part);
      }
    }
    onChange(next);
    setInputValue("");
  };

  const removeBrand = (brand: string) => {
    onChange(value.filter((b) => b !== brand));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.includes(",")) {
      addBrandsFromString(val);
    } else {
      setInputValue(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addBrandsFromString(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeBrand(value[value.length - 1]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-1 px-3 bg-white border border-[#e1e1e1] focus-within:border-primary-black rounded focus-visible:border-primary-black !text-base">
      {value.map((brand, i) => (
        <span
          key={i}
          className="flex items-center bg-black text-white px-2 py-0.5 rounded-full gap-1 text-sm"
        >
          {brand}
          <button
            type="button"
            onClick={() => removeBrand(brand)}
            className="text-white/80 hover:text-red-500 duration-500 cursor-pointer"
          >
            <X size={14} />
          </button>
        </span>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (inputValue.trim()) {
            addBrandsFromString(inputValue);
          }
        }}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 bg-transparent outline-none text-sm py-2 min-w-[120px]"
      />
    </div>
  );
}
