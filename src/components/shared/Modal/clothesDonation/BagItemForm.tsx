"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { ITEM_TYPES, BAG_CONTENTS, WASHED_OPTIONS } from "./schema";
import { cn } from "@/lib/utils";



interface FormProps {
  form: any
  itemCount?: number
}
export default function BagItemForm({ form }: FormProps) {
  const [selectedContents, setSelectedContents] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const toggleContent = (content: string) => {
    const updated = selectedContents.includes(content)
      ? selectedContents.filter((c) => c !== content)
      : [...selectedContents, content]
    setSelectedContents(updated)
    form.setValue("bagItems.bagContents", updated)
  }

  const toggleItemType = (type: string) => {
    const updated = selectedTypes.includes(type) ? selectedTypes.filter((t) => t !== type) : [...selectedTypes, type]
    setSelectedTypes(updated)
    form.setValue("bagItems.itemTypes", updated)
  }

  return (
    <div className="space-y-5">
      {/* What is in the bag */}
      <FormField
        control={form.control}
        name="bagItems.bagContents"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">What is in the bag?</FormLabel>
            <div className="mt-3 space-y-3">
              <div className="flex flex-wrap gap-2">
                {selectedContents.map((content) => (
                  <Badge
                    key={content}
                    variant="secondary"
                    className="cursor-pointer gap-2 pl-2"
                    onClick={() => toggleContent(content)}
                  >
                    {content}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {BAG_CONTENTS.map((content) => (
                <Button
                  key={content}
                  type="button"
                  variant={selectedContents.includes(content) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleContent(content)}
                  className={cn("text-xs", !selectedContents.includes(content) && "bg-gray-100")}
                >
                  {content}
                </Button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Item Type Selection */}
      <FormField
        control={form.control}
        name="bagItems.itemTypes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Item type</FormLabel>
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
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Main Brands */}
      <FormField
        control={form.control}
        name="bagItems.mainBrands"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Main brands <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
            </FormLabel>
            <FormControl>
              <Input className="bg-gray-100 py-5" placeholder="Enter main brands" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Approx Number of Items */}
      <FormField
        control={form.control}
        name="bagItems.approxItems"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Approx. number of items</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-gray-100 py-5 w-full">
                  <SelectValue placeholder="Select number of items" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="5-10">5-10 items</SelectItem>
                <SelectItem value="10-20">10-20 items</SelectItem>
                <SelectItem value="20-30">20-30 items</SelectItem>
                <SelectItem value="30-50">30-50 items</SelectItem>
                <SelectItem value="50+">50+ items</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Overall Condition */}
      <FormField
        control={form.control}
        name="bagItems.condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Overall condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-gray-100 py-5 w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="mixed-some-good-some-worn">Mixed - some good, some worn</SelectItem>
                <SelectItem value="mostly-good">Mostly good</SelectItem>
                <SelectItem value="mostly-worn">Mostly worn</SelectItem>
                <SelectItem value="like-new">Like new</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Washed */}
      <FormField
        control={form.control}
        name="bagItems.washed"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Washed?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger  className="bg-gray-100 py-5 w-full">
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

      {/* Bag Description */}
      <FormField
        control={form.control}
        name="bagItems.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Bag description <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
            </FormLabel>
            <FormControl>
              <Textarea  className="bg-gray-100  w-full" placeholder="Colours, size, fit, anything else helpful..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Photos */}
      <FormField
        control={form.control}
        name="bagItems.photos"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Photos <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
            </FormLabel>
            <FormControl>
              <div className="rounded-lg border-2 border-dashed border-primary p-6 text-center bg-gray-100">
                <Input  type="file" multiple accept="image/*" className="hidden" id="bag-photos" />
                <label htmlFor="bag-photos" className="cursor-pointer">
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
