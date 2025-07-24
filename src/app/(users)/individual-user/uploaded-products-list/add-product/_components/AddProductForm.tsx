"use client";
import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useCallback } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";

const productFormSchema = z.object({
  title: z.string().min(2, {
    message: "Product title must be at least 2 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a valid positive number.",
  }),
  discountedPrice: z.string().refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    {
      message: "Discount must be between 0 and 100.",
    }
  ),
  itemNumber: z.string().min(1, {
    message: "Item number is required.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  tags: z.string().min(1, {
    message: "Please add at least one tag.",
  }),
  condition: z.string().min(1, {
    message: "Please select a condition.",
  }),
  fabric: z.string().min(1, {
    message: "Fabric information is required.",
  }),
  brand: z.string().min(1, {
    message: "Please select a brand.",
  }),
  availableSizes: z.string().min(1, {
    message: "Please specify available sizes.",
  }),
  color: z.string().min(1, {
    message: "Please select colors.",
  }),
  careInstructions: z.string().min(10, {
    message: "Care instructions must be at least 10 characters.",
  }),
  donateToCharity: z.string().optional(),
  donationAmount: z.string().optional(),
  donationPrivacy: z.enum(["anonymous", "show-name"], {
    required_error: "Please select donation privacy preference.",
  }),
  donateToCharity2: z.string().optional(),
  donationAmount2: z.string().optional(),
  productDescription: z.string().min(20, {
    message: "Product description must be at least 20 characters.",
  }),
  deliveryPolicy: z.string().min(10, {
    message: "Delivery policy must be at least 10 characters.",
  }),
  shippingReturns: z.string().min(10, {
    message: "Shipping & returns information must be at least 10 characters.",
  }),
  durationTime: z.string().min(1, {
    message: "Duration time is required.",
  }),
  returnsPolicy: z.enum(["yes", "no"], {
    required_error: "Please select returns policy.",
  }),
  returnDescription: z.string().optional(),
  allowOffers: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const defaultValues: Partial<ProductFormValues> = {
  title: "",
  price: "",
  discountedPrice: "0",
  itemNumber: "",
  category: "",
  tags: "",
  condition: "",
  fabric: "",
  brand: "",
  availableSizes: "",
  color: "",
  careInstructions: "",
  donateToCharity: "",
  donationAmount: "",
  donationPrivacy: undefined,
  donateToCharity2: "",
  donationAmount2: "",
  productDescription: "",
  deliveryPolicy: "",
  shippingReturns: "",
  durationTime: "",
  returnsPolicy: undefined,
  returnDescription: "",
  allowOffers: false,
};

export default function AddProductForm() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
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
    <div className="space-y-6">
      <Card className="py-0 border-none shadow-none">
        <CardContent className="px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Product Images */}
              <div className="space-y-4">
                <label className="text-base font-medium">Product Images</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
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

                  {images.length < 8 && (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer relative"
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500 text-center px-2">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <FormField
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
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma-separated)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Sweatshirt, Pant, Shirt"
                            className="bg-[#f2f2f2] md:py-5"
                            {...field}
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

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#f2f2f2] md:py-5 w-full">
                            <SelectValue placeholder="Select colors" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="red-black">Red, Black</SelectItem>
                          <SelectItem value="blue-white">
                            Blue, White
                          </SelectItem>
                          <SelectItem value="black">Black</SelectItem>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="multicolor">Multicolor</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <FormControl>
                        <Textarea
                          placeholder="e.g. Machine wash cold, tumble dry low, do not bleach"
                          className="flex min-h-[80px] bg-[#f2f2f2]  "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="donateToCharity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donate to charity</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#f2f2f2] md:py-5 w-full">
                              <SelectValue placeholder="Select charity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="save_the_children">
                              Save the Children
                            </SelectItem>
                            <SelectItem value="plant_more_trees">
                              Plant More Trees
                            </SelectItem>
                            <SelectItem value="women_for_women_international">
                              Women for Women International
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="donationAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (%)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="Enter Amount (%)"
                              {...field}
                              className="bg-[#f2f2f2] md:py-5"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Donation Privacy */}
                <FormField
                  control={form.control}
                  name="donationPrivacy"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        Donation Privacy: Would you like to remain anonymous?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
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

                {/* Additional Charity Donations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="donateToCharity2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donate to Charity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Save The Ocean"
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
                    name="donationAmount2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (%)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="0"
                              {...field}
                              className="bg-[#f2f2f2] md:py-5"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              %
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Mark as Dealer Button */}
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="bg-[#FAFAFA]"
                  >
                    Mark as Dealer
                  </Button>
                </div>

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
                <FormField
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
                />

                {/* Shipping & Returns */}
                <FormField
                  control={form.control}
                  name="shippingReturns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping & Returns</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. All orders are protected 5-7 days"
                          className="flex min-h-[100px] bg-[#f2f2f2]"
                          {...field}
                        />
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
                />

                {/* Duration Time */}
                <FormField
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
                />

                {/* Return Description */}
                <FormField
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
                />

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
