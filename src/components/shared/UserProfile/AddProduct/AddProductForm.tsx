"use client";;
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { X, PlusCircle, Plus, ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import {
  colors,
  productFormDefaultValues,
  productFormSchema,
  ProductFormValues,
  returnsPolicy,
  shippingDelivery,
} from "./schema";
import SelectDonationOption from "./SelectDonationOption";
import { ImageUploadGuide } from "./ImageUploadGuide";
import { cn } from "@/lib/utils";
import { TagInput } from "./FormComponent/TagInput";
import { CareInstructionsField } from "./FormComponent/CareInstructionsField";
import { useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import InputCharityDonationInput from "./InputCharityDonationInput";



export default function AddProductForm() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const fromEditPage = useSearchParams().get("edit");



  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: productFormDefaultValues(),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "donations",
  });

  function onSubmit(data: ProductFormValues) {
    console.log("Form submitted:", data);
    // Handle form submission here
  }

  const handleFileUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newFiles = Array.from(files).slice(0, 8 - images.length);
      const newPreviews: string[] = [];

      newFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            newPreviews.push(result);
            if (newPreviews.length === newFiles.length) {
              setImages((prev) => [...prev, ...newFiles]);
              setImagePreviews((prev) => [...prev, ...newPreviews]);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    },
    [images.length]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFileUpload(e.dataTransfer.files);
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    // Clean up object URL to prevent memory leaks
    if (imagePreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviews[index]);
    }
  };

  return (
    <div className="md:space-y-6 space-y-3">
      <Card className="py-0 border-none shadow-none">
        {fromEditPage && <h1 className="text-lg font-medium">Edit <Link href={"/individual-user/dashboard/uploaded-products-list/resell"} className="underline">158420</Link> item details for resell</h1>}
        <CardContent className="px-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:space-y-6 space-y-3"
            >
              {/* Product Images */}
              <div className="space-y-2 ">
                <label className="text-base font-medium">Product Images</label>
                <div
                  className={cn(
                    "grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 md:gap-4 gap-2 border-2 rounded border-dashed",
                    images?.length === 0 && " justify-center"
                  )}
                >
                  {imagePreviews?.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {images?.length < 8 && (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className={cn(
                        "aspect-square  border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer relative border",
                        images?.length === 0 &&
                        "col-span-2 md:col-span-4 2xl:col-span-5 aspect-video md:aspect-auto md:min-h-[300px]"
                      )}
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button className="group">
                        <Plus className="h-6 w-6  group-hover:animate-spin" /> Upload
                      </Button>

                      <span className="text-xs text-gray-500 text-center px-2 hidden md:block">
                        Drop images or click to upload
                      </span>
                    </div>
                  )}
                </div>

                {images.length > 0 && (
                  <div className="text-sm text-gray-600">
                    {images.length} of 8 images uploaded
                  </div>
                )}

                <ImageUploadGuide />
              </div>

              {/* Product Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product title"
                        {...field}
                        className="bg-[#f2f2f2] md:py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price and Discount */}
              <div className="grid grid-cols-2 md:gap-x-4 gap-x-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product price"
                          {...field}
                          className="bg-[#f2f2f2] md:py-5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountedPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discounted Price (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter discounted price in %"
                          {...field}
                          className="bg-[#f2f2f2] md:py-5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Product Details Section */}
              <div className="space-y-4">
                <h3 className="uppercase underline text-black/60 ">
                  Product Details
                </h3>

                {/* <FormField
                  control={form.control}
                  name="itemNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter item number"
                          {...field}
                          className="bg-[#f2f2f2] md:py-5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <div className="grid  grid-cols-2 md:gap-x-4 gap-x-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#f2f2f2] md:py-5 w-full">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="woman">Woman</SelectItem>
                            <SelectItem value="man">Man</SelectItem>
                            <SelectItem value="kids">Kids</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#f2f2f2] md:py-5 w-full">
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="like-new">Like New</SelectItem>
                            <SelectItem value="3-months-used">
                              3 Months Used
                            </SelectItem>
                            <SelectItem value="6-months-used">
                              6 Months Used
                            </SelectItem>
                            <SelectItem value="1-year-used">
                              1 Year Used
                            </SelectItem>
                            <SelectItem value="well-used">Well Used</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 md:gap-x-4 gap-x-2">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <TagInput
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Type and press Enter..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fabric"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fabric</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter fabric"
                            {...field}
                            className="bg-[#f2f2f2] md:py-5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#f2f2f2] md:py-5 w-full">
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="nike">Nike</SelectItem>
                            <SelectItem value="adidas">Adidas</SelectItem>
                            <SelectItem value="puma">Puma</SelectItem>
                            <SelectItem value="zara">Zara</SelectItem>
                            <SelectItem value="h&m">H&M</SelectItem>
                            <SelectItem value="uniqlo">Uniqlo</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availableSizes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Available Sizes
                          <Link href="/product-size" className="cursor-pointer">
                            <button
                              type="button"
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Select Size Guide
                            </button>
                          </Link>
                        </FormLabel>
                        <FormControl>
                          <Input
                            readOnly
                            placeholder="UK 10/ XL"
                            {...field}
                            className="bg-[#f2f2f2] md:py-5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            if (value === "custom") {
                              setShowCustomPicker(true);
                            } else {
                              setShowCustomPicker(false);
                              field.onChange(value);
                            }
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#f2f2f2] md:py-5 w-full">
                              <SelectValue placeholder="Select a color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[400px]">
                            {colors.map((color) => (
                              <SelectItem key={color.name} value={color.name}>
                                <div className="flex items-center gap-2">
                                  <div
                                    className="size-5 rounded-full border border-border "
                                    style={{
                                      background:
                                        color.name === "Multi"
                                          ? "linear-gradient(90deg, #FF0000, #00FF00, #0000FF)"
                                          : color.hex,
                                      border:
                                        color.name === "White" ||
                                          color.name === "Clear"
                                          ? "1px solid #e5e5e5"
                                          : "none",
                                    }}
                                  />
                                  <span className="text-lg">{color.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                            <SelectItem value="custom">
                              <div className="flex items-center gap-2">
                                <div className="size-5 rounded-full border border-border bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" />
                                <span className="text-lg">
                                  Select Custom Color
                                </span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        {showCustomPicker && (
                          <div className="mt-2 md:space-y-2 space-y-1">
                            <FormControl>
                              <Input
                                type="color"
                                {...field}
                                className="bg-[#f2f2f2] h-12 cursor-pointer"
                                onChange={(e) => {
                                  field.onChange(e.target.value);
                                }}
                              />
                            </FormControl>
                            <p className="text-sm text-muted-foreground">
                              Selected: {field.value || "None"}
                            </p>
                          </div>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="careInstructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Care Instructions</FormLabel>
                        <FormControl className="border border-blue-500 w-full">
                          <CareInstructionsField field={field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <InputCharityDonationInput form={form} fields={fields} append={append} remove={remove} />


                {/* Donation Privacy */}
                <FormField
                  control={form.control}
                  name="donationPrivacy"
                  render={({ field }) => (
                    <FormItem className="md:space-y-3 space-y-1">
                      <FormLabel>
                        Donation Privacy: Would you like to remain anonymous?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col md:space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="anonymous" id="anonymous" />
                            <label htmlFor="anonymous" className="text-sm">
                              Yes, keep my donation anonymous
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="show-name" id="show-name" />
                            <label htmlFor="show-name" className="text-sm">
                              No, show my name
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Product Description */}
                <FormField
                  control={form.control}
                  name="productDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. This tops is very smooth and fit..."
                          className="flex min-h-[120px] bg-[#f2f2f2] "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Delivery Policy */}
                {/* <FormField
                  control={form.control}
                  name="deliveryPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Policy</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. We deliver the product 5-7 days"
                          className="flex min-h-[100px] bg-[#f2f2f2]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* Shipping & Returns */}
                <FormField
                  control={form.control}
                  name="shippingDelivery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping & Delivery</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#f2f2f2] md:py-5 w-full">
                              <SelectValue placeholder="Select Shipping & Delivery" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shippingDelivery?.map((item, index) => (
                              <SelectItem value={item} key={index}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Returns Policy */}
                <FormField
                  control={form.control}
                  name="returnsPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Returns Policy</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#f2f2f2] md:py-5 w-full">
                              <SelectValue placeholder="Select Returns Policy" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {returnsPolicy?.map((item, index) => (
                              <SelectItem value={item} key={index}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Returns Policy */}
                {/* <FormField
                  control={form.control}
                  name="returnsPolicy"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Returns Policy</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="returns-yes" />
                            <label htmlFor="returns-yes" className="text-sm">
                              Yes
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="returns-no" />
                            <label htmlFor="returns-no" className="text-sm">
                              No
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* Duration Time */}
                {/* <FormField
                  control={form.control}
                  name="durationTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration Time</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Working time"
                          {...field}
                          className="bg-[#f2f2f2] md:py-5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* Return Description */}
                {/* <FormField
                  control={form.control}
                  name="returnDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        For seller return responsibility description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter return responsibility details..."
                          className="flex min-h-[80px] bg-[#f2f2f2]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* Allow Offers */}
                <FormField
                  control={form.control}
                  name="allowOffers"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-1 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Allow buyers to make an offer</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1 group cursor-pointer">
                  Submit <AnimatedArrow />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
