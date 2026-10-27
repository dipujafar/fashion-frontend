"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera, Pencil, X } from "lucide-react";
import { ITEM_TYPES, CONDITIONS, WASHED_OPTIONS, GENDERS } from "./schema";
import { cn } from "@/lib/utils";
import Image from "next/image";

const MAX_PHOTOS = 8;
const SINGLE_PHOTO_INPUT_ID = "single-donation-photo-uploader";

interface SingleItemFormProps {
  form: any;
  images: File[];
  onAddFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditImage: (index: number) => void;
  onRemoveImage: (index: number) => void;
}

export default function SingleItemForm({
  form,
  images,
  onAddFiles,
  onEditImage,
  onRemoveImage,
}: SingleItemFormProps) {
  const selectedTypes: string[] = form.watch("itemTypes") || [];
  const selectedGenders: string[] = form.watch("personTypes") || [];
  const selectedBrands: string[] = form.watch("brands") || [];

  // Single selection: only 1 item type can be selected at a time
  const selectSingleItemType = (type: string) => {
    const updated = selectedTypes.includes(type) ? [] : [type];
    form.setValue("itemTypes", updated, { shouldValidate: true });
  };

  // Single selection: only 1 gender can be selected at a time
  const selectSingleGender = (gender: string) => {
    const updated = selectedGenders.includes(gender) ? [] : [gender];
    form.setValue("personTypes", updated, { shouldValidate: true });
  };

  const visibleSlots = Math.min(images.length + 1, MAX_PHOTOS);
  const boxes = Array.from({ length: visibleSlots });

  return (
    <div className="space-y-5">
      {/* What are you donating (Single selection) */}
      <FormField
        control={form.control}
        name="itemTypes"
        render={() => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              What are you donating?
            </FormLabel>
            <FormDescription>Select one item type.</FormDescription>

            {selectedTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedTypes.map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="cursor-pointer gap-1.5 pl-2.5 pr-2 py-1 rounded bg-black text-white hover:bg-neutral-800"
                    onClick={() => selectSingleItemType(type)}
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
                    onClick={() => selectSingleItemType(type)}
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

      {/* Who is it for (Single selection) */}
      <FormField
        control={form.control}
        name="personTypes"
        render={() => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              Who is it for?
            </FormLabel>
            <div className="flex flex-wrap gap-2 pt-1">
              {GENDERS.map((gender) => {
                const isSelected = selectedGenders.includes(gender);
                return (
                  <Button
                    key={gender}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => selectSingleGender(gender)}
                    className={cn(
                      "text-xs rounded shadow-none cursor-pointer transition-colors h-9 px-4",
                      !isSelected &&
                        "bg-white border-[#e1e1e1] text-gray-800 hover:bg-gray-50 hover:border-primary-black"
                    )}
                  >
                    {gender}
                  </Button>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Brand (Single custom input) */}
      <FormField
        control={form.control}
        name="brands"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              Brand{" "}
              <span className="text-sm font-normal text-muted-foreground">
                (Optional)
              </span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter brand"
                value={selectedBrands[0] || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  field.onChange(val ? [val] : []);
                }}
                className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Condition */}
      <FormField
        control={form.control}
        name="condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              Condition
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3 w-full cursor-pointer focus-within:border-primary-black">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="p-0 rounded-none">
                {CONDITIONS.map((condition) => (
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

      {/* Item Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-900">
              Item description{" "}
              <span className="text-sm font-normal text-muted-foreground">
                (Optional)
              </span>
            </FormLabel>
            <FormControl>
              <Textarea
                className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base px-3"
                placeholder="Colour, size, fit, anything else helpful..."
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
          id={SINGLE_PHOTO_INPUT_ID}
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
                htmlFor={SINGLE_PHOTO_INPUT_ID}
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

// ─── Photo Box Item (matching AddProductForm) ────────────────────────────────

export function DonationPhotoBoxItem({
  file,
  index,
  onEdit,
  onRemove,
}: {
  file: File | Blob;
  index: number;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}) {
  const [objectUrl, setObjectUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="group relative aspect-square rounded border border-gray-200 transition-colors overflow-hidden bg-white shadow-xs">
      {objectUrl && (
        <Image
          src={objectUrl}
          alt={`Donation photo ${index + 1}`}
          className="w-full h-full object-cover"
          height={500}
          width={500}
          unoptimized
        />
      )}

      {/* Top right remove button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
        className="absolute top-1.5 right-1.5 bg-black text-white hover:bg-neutral-800 rounded-full w-6 h-6 flex items-center justify-center shadow-md transition-opacity cursor-pointer z-10"
        aria-label="Remove photo"
      >
        <X size={13} strokeWidth={2.5} />
      </button>

      {/* Primary photo indicator on index 0 */}
      {index === 0 && (
        <span className="absolute top-1.5 left-1.5 bg-black text-white text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm z-10 pointer-events-none">
          Cover
        </span>
      )}

      {/* Adjust photo button */}
      <button
        type="button"
        onClick={() => onEdit(index)}
        className="text-white px-2.5 py-1 text-xs font-medium flex items-center gap-1 shadow-md transition-transform cursor-pointer absolute bottom-0 left-0 bg-black/70 w-full justify-center"
        title="Edit photo"
      >
        <Pencil size={12} strokeWidth={2} />
        <span>Adjust Photo</span>
      </button>
    </div>
  );
}