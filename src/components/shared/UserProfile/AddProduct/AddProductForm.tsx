"use client";;
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { X, Plus, Camera } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import {
  colors,
  conditionOptions,
  productFormDefaultValues,
  productFormSchema,
  ProductFormValues,
  returnsPolicy,
  shippingDelivery,
} from "./schema";
import { ImageUploadGuide } from "./ImageUploadGuide";
import { cn } from "@/lib/utils";
import { TagInput } from "./FormComponent/TagInput";
import { CareInstructionsField } from "./FormComponent/CareInstructionsField";
import { useRouter, useSearchParams } from "next/navigation";
import InputCharityDonationInput from "./InputCharityDonationInput";
import { useGetCategoryBrandsQuery, useGetCategoryQuery, useGetCategorySizeQuery } from "@/redux/api/categoryApi";
import CategorySelector, { Category } from "./Categories/CategorySelector";
import SizeSelector from "./Size/Sizeselector";
import BrandSelector from "./Brand/Brandselector";
import { getFirstErrorMessage } from "@/utils/modifyFormError";
import { toast } from "sonner";
import { useGetCharitiesQuery } from "@/redux/api/userApi";
import { formattedData } from "./utils";
import { useCreateProductMutation } from "@/redux/api/productApi";
import LoadingSpin from "@/components/ui/loading-spin";
import Image from "next/image";
import { useGetSizesQuery } from "@/redux/api/size.api";
import { useGetBrandsQuery } from "@/redux/api/brand.api";

const MAX_PHOTOS = 8;
const INPUT_ID = "photo-uploader-input";

export default function AddProductForm() {
  const [images, setImages] = useState<File[]>([]);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const fromEditPage = useSearchParams().get("edit");
  const router = useRouter();
  // ======================= category ===========================
  const { data: categoriesData } = useGetCategoryQuery(undefined);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  // ======================= category size ===========================
  const { data: sizeData } = useGetSizesQuery({ categoryId: selectedCategory?.id }, {
    skip: !selectedCategory
  });
  // ======================= category brand ===========================
  const { data: brandData } = useGetBrandsQuery({ categoryId: selectedCategory?.id }, {
    skip: !selectedCategory
  });
  // =============================== get charities =============================
  const { data: charitiesData } = useGetCharitiesQuery();
  // =============================== product api ==============================
  const [uploadProduct, { isLoading }] = useCreateProductMutation();


  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: productFormDefaultValues(),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "donations",
  });



  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files || []).filter(
      (f) => f.type === "image/jpeg" || f.type === "image/png"
    );
    if (incoming.length > 0) {
      setImages((prev) => {
        const room = MAX_PHOTOS - prev.length;
        return [...prev, ...incoming.slice(0, Math.max(room, 0))];
      });
    }
    // allow re-selecting the same file again later
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const boxes = Array.from({ length: 8 });


  // ====================================== set selected category data ============================
  function handleCategorySelect(cat: Category) {
    setSelectedCategory(cat);
    form.setValue("categoryId", cat.id, { shouldValidate: true });
  }
  const categories = categoriesData?.data || [];
  const sizes = sizeData?.data || [];
  const brands = brandData?.data || [];


  // ===================================== submitting error ===============================
  const onError = (errors: any) => {
    const firstErrorMessage = getFirstErrorMessage(errors);
    toast.error(firstErrorMessage);
  };

  // ====================================== submitting form ===============================
  async function onSubmit(data: ProductFormValues) {
    if (images?.length === 0) {
      toast.error("Please upload at least one product image");
    } else {
      const formData = new FormData();

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      const formattedValues = formattedData(data);

      formData.append("data", JSON.stringify(formattedValues));
      try {
        await uploadProduct(formData).unwrap();
        form.reset();
        toast.success("Product uploaded successfully!");
        // router.push("/")
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    }
  }


  return (
    <div className="md:space-y-6 space-y-3 max-w-2xl mx-auto">
      <h3 className="text-2xl lg:text-3xl font-bold mt-3 md:mt-4 lg:mt-5 py-3 lg:py-4 border-b border-gray-200 text-gray-800">List An Item</h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="md:space-y-10 space-y-6"
        >
          {/* ===================================== Product Images ===============================*/}
          <div className="">
            <div className="flex flex-col md:flex-row justify-between items-start gap-3">
              <div>
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Photos</h2>
                <p className="text-sm md:text-base mt-1 text-gray-500">Add up to 8 photos in JPEG or PNG format.</p>
              </div>
              <ImageUploadGuide />
            </div>

            <input
              id={INPUT_ID}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              className="hidden"
              onChange={handleFiles}
            />

            <div className="mt-6 grid grid-cols-3 md:grid-cols-4 gap-4">
              {boxes.map((_, i) => {
                const file = images[i];

                if (file) {
                  return (
                    <div
                      key={i}
                      className="group relative aspect-square rounded-lg border border-dashed border-gray-300 overflow-hidden"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="Product photo"
                        className="w-full h-full object-cover"
                        height={500}
                        width={500}
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center transition-opacity cursor-pointer"
                        aria-label="Remove photo"
                      >
                        <X size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                  );
                }

                const isFull = images.length >= 8;

                return (
                  <label
                    key={i}
                    htmlFor={isFull ? undefined : INPUT_ID}
                    className={`aspect-square rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 transition-colors ${isFull
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer hover:border-gray-400 hover:bg-gray-50 hover:text-gray-500"
                      }`}
                  >
                    <Camera size={22} strokeWidth={1.75} />
                  </label>
                );
              })}
            </div>
          </div>

          {/* ===================================== Product Title ================================ */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">Product Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product title"
                    {...field}
                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3"
                  />
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
                <FormLabel className="text-base font-semibold text-gray-900">Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. This tops is very smooth and fit..."
                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base px-3"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ========================================= Product Details Section  ==============================*/}
          <div className="space-y-4">
            <h3 className="text-lg lg:text-2xl font-bold text-gray-900">
              Product Info
            </h3>


            {/* ========================================== product category ================================ */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <CategorySelector
                      categories={categories}
                      value={selectedCategory?.id}
                      onSelect={handleCategorySelect}
                      placeholder="Select category"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* ========================================= product brand and size ================================ */}
            <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 items-start")}>
              <FormItem>
                <FormLabel>Size</FormLabel>
                <SizeSelector
                  control={form.control}
                  name="sizeId"
                  sizes={sizes}
                  selectedCategory={selectedCategory}  // null = disabled
                  placeholder="Select size"
                />
              </FormItem>

              <FormItem>
                <FormLabel>Brand</FormLabel>
                <BrandSelector
                  control={form.control}
                  name="brandId"
                  brands={brands}
                  selectedCategory={selectedCategory}
                  placeholder="Select brand"
                />
              </FormItem>
            </div>

            <div className="grid grid-cols-2 md:gap-x-4 gap-x-2 items-start">

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
                        className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
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
                        <SelectTrigger className="bg-white border-gray-200 rounded shadow-none focus-visible:border-primary-black focus-visible:ring-0 focus:ring-0 focus:border focus-within:border-primary-black text-base py-5 px-3 w-full cursor-pointer">
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[400px] !rounded-none !p-0">
                        {colors.map((color) => (
                          <SelectItem key={color.name} value={color.name} className="cursor-pointer">
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

              {/* ======================================== condition input ============================================== */}
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
                        <SelectTrigger className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3 w-full cursor-pointer focus-within:border-primary-black">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="p-0 rounded-none">

                        {conditionOptions.map((option) => (
                          <SelectItem
                            className="rounded-none cursor-pointer"
                            key={option.value}
                            value={option.value}
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
            </div>


            <div className="space-y-4 mt-12">
              <div>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">Donation</p>

                <>
                  <span className="text-xs">
                    (Minimum 5% donation required)
                  </span>
                  {/* <SelectDonationOption /> */}
                </>
              </div>

              <div className="my-5 space-y-3 grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                <FormField
                  control={form.control}
                  name="donation_percent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donation Percent (%)</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3 w-full cursor-pointer">
                              <SelectValue placeholder="Select Donation Percent" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-none p-0">
                            {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map((item) => (
                              <SelectItem value={item.toString()} key={item} className="rounded-none cursor-pointer">
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

                <InputCharityDonationInput charities={charitiesData?.data || []} form={form} fields={fields} append={append} remove={remove} />

              </div>

            </div>


            {/* Donation Privacy */}
            <div>
              <p className="mb-5 mt-8 font-medium">
                Donation Privacy: Would you like to remain anonymous?
              </p>
              <FormField
                control={form.control}
                name="donationPrivacy"
                render={({ field }) => (
                  <FormItem className="md:space-y-3 space-y-1">

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
            </div>

          </div>

          <div className="space-y-4 mt-10">
            <p className="text-lg lg:text-2xl font-bold text-gray-900">Price</p>

            {/* ========================================= Price and Discount ============================== */}
            <div className="grid grid-cols-2 md:gap-x-4 gap-x-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg: 100"
                        {...field}
                        className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3"
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
                    <FormLabel>Discount (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="eg: 20"
                        {...field}
                        className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          </div>



          <div className="flex gap-4">
            <Button disabled={isLoading} type="submit" variant={"default"} className="flex-1 group cursor-pointer rounded-none py-5">
              {isLoading ? <span /> : "Ready to Submit"}
            </Button>
          </div>
        </form>
      </Form>


    </div>
  );
}
