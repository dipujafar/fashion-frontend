"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { ITEM_TYPES, CONDITIONS, WASHED_OPTIONS, GENDERS } from "./schema";
import { cn } from "@/lib/utils"


interface FormProps {
  form: any
  itemCount?: number
}

export default function SingleItemForm({ form, itemCount = 1 }: FormProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedGenders, setSelectedGenders] = useState<string[]>([])

  const toggleItemType = (type: string) => {
    const updated = selectedTypes.includes(type) ? selectedTypes.filter((t) => t !== type) : [...selectedTypes, type]
    setSelectedTypes(updated)
    form.setValue("singleItems.0.itemType", updated)
  }

  const toggleGender = (gender: string) => {
    const updated = selectedGenders.includes(gender)
      ? selectedGenders.filter((g) => g !== gender)
      : [...selectedGenders, gender]
    setSelectedGenders(updated)
    form.setValue("singleItems.0.gender", updated[0] || "")
  }

  return (
    <div className="space-y-5">
      {/* What are you donating */}
      <FormField
        control={form.control}
        name="singleItems.0.itemType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">What are you donating?</FormLabel>
            <FormDescription>Select the type of item.</FormDescription>
            <div className="mt-3 space-y-3">
              <div className="flex flex-wrap gap-2">
                {selectedTypes.map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="cursor-pointer gap-2 pl-2 "
                    onClick={() => toggleItemType(type)}
                  >
                    {type}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
              {selectedTypes.length === 0 && <p className="text-sm text-muted-foreground">Select the type of item.</p>}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Item Type Selection Grid */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {ITEM_TYPES.map((type) => (
          <Button
            key={type}
            type="button"
            variant={selectedTypes.includes(type) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleItemType(type)}
            className={cn("text-xs", !selectedTypes.includes(type) && "bg-gray-100")}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Who is it for */}
      <FormField
        control={form.control}
        name="singleItems.0.gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Who is it for? <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
            </FormLabel>
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((gender) => (
                <Button
                  key={gender}
                  type="button"
                  variant={selectedGenders.includes(gender) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleGender(gender)}
                  className={cn("text-xs", !selectedTypes.includes(gender) && "bg-gray-100")}
                >
                  {gender}
                </Button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Brand */}
      <FormField
        control={form.control}
        name="singleItems.0.brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Brand <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter brand" {...field} className="bg-gray-100 py-5" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Condition */}
      <FormField
        control={form.control}
        name="singleItems.0.condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full bg-gray-100 py-5">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {CONDITIONS.map((condition) => (
                  <SelectItem key={condition} value={condition}>
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
        name="singleItems.0.washed"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Washed?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full bg-gray-100 py-5">
                  <SelectValue placeholder="Select wash status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {WASHED_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
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
        name="singleItems.0.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Item description <span className="text-sm font-normal text-muted-foreground ">(Optional)</span>
            </FormLabel>
            <FormControl>
              <Textarea className="bg-gray-100" placeholder="Colour, size, fit, anything else helpful..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Photos */}
      <FormField
        control={form.control}
        name="singleItems.0.photos"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Photos <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
            </FormLabel>
            <FormControl>
              <div className="rounded-lg border-2 border-dashed border-primary p-6 text-center bg-gray-100">
                <Input type="file" multiple accept="image/*" className="hidden" id="photos" />
                <label htmlFor="photos" className="cursor-pointer">
                  <div className="text-primary">+ Add photos</div>
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}