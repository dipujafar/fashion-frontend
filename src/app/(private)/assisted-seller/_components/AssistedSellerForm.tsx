"use client";
import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Camera, CheckCircle2, X } from "lucide-react";
import InputCharityDonationInput from "@/components/shared/UserProfile/AddProduct/InputCharityDonationInput"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useGetCharitiesQuery } from "@/redux/api/userApi";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { UserRole } from "@/types";
import Image from "next/image";
import { defaultImg } from "@/utils/defaultImg";
import UpdateShippingAddress from "@/components/shared/UserProfile/AddProduct/UpdateShippingAddress";
import { RequestNewAssitentSell } from "@/lib/Actions/AssistentSell.action";
import { toast } from "sonner";
import { formattedAssistedSellerData } from "./util";
import { SuccessModal } from "@/components/shared/Modal/SuccessModal";
import Link from "next/link";

export const formSchema = z.object({
  itemsTitle: z.string({ required_error: "Item title is required." }).min(1, {
    message: "Item title is required.",
  }),
  itemsCount: z.string({ required_error: "Item count is required." }).refine((val) => !isNaN(Number(val)) && Number(val) > 1, {
    message: "Item count must be a valid positive number greater than 1.",
  }),

  images: z.array(z.string()).min(1, "At least 1 image is required"),

  itemsDetails: z.string().optional(),
  additionalNotes: z.string().optional(),

  priceType: z.enum(["TARGET_AMOUNT", "DISCUSSION", "MARKET_PRICE"], {
    errorMap: () => ({ message: "Please select a pricing option" }),
  }).default("MARKET_PRICE"),

  targetPrice: z.string().optional(),

  contactNumber: z.string().optional(),

  charities: z.array(z.string()).optional(),
  donationPct: z.string().optional(),

  donationAnonymous: z.boolean().default(false),

  weight_kg: z.string({ required_error: "Weight is required." }).refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Weight must be a valid positive number.",
  }),

  length_cm: z.string({ required_error: "Length is required." }).refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Length must be a valid positive number.",
  }),

  width_cm: z.string({ required_error: "Width is required." }).refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Width must be a valid positive number.",
  }),

  hight_cm: z.string({ required_error: "Height is required." }).refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Height must be a valid positive number.",
  }),

})

const CharityFormSchema = z.object({
  charities: z
    .array(z.string().min(1, "Charity id cannot be empty"))
    .min(1, "Please select at least one charity"),

  donationPct: z.string({ required_error: "Donation Percent is required." }).min(1, {
    message: "Donation Percent is required.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export function AssistedSellerForm() {
  const { data: charitiesData } = useGetCharitiesQuery();
  const user = useSelector((state: RootState) => state.auth.user);
  type UploadedImage = {
    file: File
    previewUrl: string
  }

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])

  const required_Charity = user?.auth?.role !== UserRole.ECO_FRIENDLY_STORE;

  const schema = (required_Charity ? formSchema.merge(CharityFormSchema) : formSchema).superRefine(
    (data, ctx) => {
      if (data.priceType === "TARGET_AMOUNT") {
        const val = Number(data.targetPrice)
        if (!data.targetPrice || isNaN(val) || val <= 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Target price is required and must be greater than 1.",
            path: ["targetPrice"],
          })
        }
      }
    }
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      charities: [],
      donationPct: required_Charity ? "5" : "0",
      images: [],
      donationAnonymous: true,
      priceType: "MARKET_PRICE",
    },
  })


  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(formattedAssistedSellerData(values)));

      uploadedImages.forEach((img) => {
        formData.append("images", img.file); // ✅ real File object
      });

      await RequestNewAssitentSell({ payload: formData });

      //reset the form and uploaded images
      form.reset();
      setUploadedImages([]);

      setOpenSuccessDialog(true);

    } catch (err: any) {
      toast.error(err?.message || "An error occurred while submitting the form.");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  }

  const MAX_IMAGES = 8

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImages: UploadedImage[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }))

    const combined = [...uploadedImages, ...newImages]

    // Cap at MAX_IMAGES, dropping oldest first
    const overflowCount = combined.length - MAX_IMAGES
    const finalImages = overflowCount > 0 ? combined.slice(overflowCount) : combined

    // Revoke object URLs for anything evicted, to avoid memory leaks
    if (overflowCount > 0) {
      combined.slice(0, overflowCount).forEach((img) => URL.revokeObjectURL(img.previewUrl))
    }

    setUploadedImages(finalImages)
    form.setValue(
      "images",
      finalImages.map((img) => img.file.name),
      { shouldValidate: true }
    )

    e.target.value = ""
  }

  const handleRemoveImage = (indexToRemove: number) => {
    URL.revokeObjectURL(uploadedImages[indexToRemove].previewUrl)

    const updatedImages = uploadedImages.filter((_, idx) => idx !== indexToRemove)
    setUploadedImages(updatedImages)
    form.setValue(
      "images",
      updatedImages.map((img) => img.file.name),
      { shouldValidate: true }
    )
  }

  const priceType = form.watch("priceType")

  return (
    <div className="md:space-y-6 space-y-3 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sell Any Item</h1>
        <p className="text-muted-foreground">Complete the form below to submit items for our assisted seller service</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Items Count */}
          <FormField
            control={form.control}
            name="itemsCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">How many items are you sending?</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="eg: 4" className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Images */}
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">Items Bundle Picture</FormLabel>
                <FormControl>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-zinc-100 transition-colors cursor-pointer bg-zinc-50">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer block space-y-1 mx-auto text-center flex flex-col justify-center items-center">
                      <Camera size={32} strokeWidth={1.75} />

                      <span className="text-xs text-gray-700 text-center px-2 hidden md:block mt-3">
                        Accept JPG, PNG, WEBP, SVG. Max size 10MB.
                      </span>
                      <span className="text-xs text-gray-700 text-center px-2 hidden md:block">
                        Max 8 images allowed. Please ensure the image clearly shows items in the bundle.
                      </span>
                      <span className="text-xs text-destructive text-center px-2 hidden md:block">
                        (Minimum 1 image required)
                      </span>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
                {uploadedImages.length > 0 && (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <Image
                          src={img.previewUrl || defaultImg?.product}
                          alt={`Preview ${idx}`}
                          height={200}
                          width={200}
                          placeholder="blur"
                          blurDataURL={defaultImg?.placeholderImg}
                          className="h-20 w-20 object-cover rounded-sm"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center transition-opacity cursor-pointer"
                          aria-label="Remove photo"
                        >
                          <X size={12} strokeWidth={2.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">Contact Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    // @ts-ignore
                    value={field.value}
                    onChange={field.onChange}
                    international
                    defaultCountry="US"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itemsTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">Items Title</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="eg: Vintage denim & leather bundle" className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itemsDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">Item Details (Optional)</FormLabel>
                <FormDescription>e.g. brand, size, condition, original price, any flaws, how it fits</FormDescription>
                <FormControl>
                  <Textarea placeholder="Describe your item..." className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base px-3 min-h-24" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" bg-white">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-4 text-lg text-gray-900">How would you like us to handle pricing?</h3>
              </div>

              <FormField
                control={form.control}
                name="priceType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        {/* Option 1: Let Fashi-ON Decide */}
                        <div className="flex items-start space-x-3 mb-1.5 p-3 rounded hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="MARKET_PRICE" id="option-1" className="mt-1" />
                          <Label htmlFor="option-1" className="font-medium cursor-pointer flex flex-col items-start">
                            <p className="text-base font-medium">Let Fashi-ON decide (recommended)</p>
                            <span className="text-sm text-muted-foreground mt-0.5">
                              We'll set the best market price and email you before we list.
                            </span>
                          </Label>
                        </div>

                        {/* Option 2: Tell Us What You'd Like to Earn */}
                        <div className="flex items-start space-x-3 mb-1.5 p-3 rounded hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="TARGET_AMOUNT" id="option-2" className="mt-1" />
                          <Label htmlFor="option-2" className="font-medium cursor-pointer flex flex-col items-start">
                            <p className="text-base font-medium">Tell us what you'd like to earn</p>
                            <span className="text-sm text-muted-foreground mt-0.5">
                              Roughly how much you'd like to receive after our fees and your donation
                            </span>

                            {priceType === "TARGET_AMOUNT" && (
                              <div className="mt-3 w-full">
                                <FormField
                                  control={form.control}
                                  name="targetPrice"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <InputGroup className="bg-white border-[#e1e1e1] rounded shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 focus:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border has-[[data-slot=input-group-control]:focus-visible]:border-primary-black !py-5">
                                          <InputGroupInput type="number" step="any" placeholder="eg: 100" {...field} className="!text-base" />
                                          <InputGroupAddon align={"inline-start"} className="text-primary-black text-lg" >
                                            $
                                          </InputGroupAddon>
                                        </InputGroup>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}

                          </Label>
                        </div>

                        {/* Option 3: Discuss First */}
                        <div className="flex items-start space-x-3 p-3 rounded hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="DISCUSSION" id="option-3" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="option-3" className="font-medium cursor-pointer flex flex-col items-start justify-start">
                              <p className="text-base font-medium">I'd like to discuss first</p>
                              <span className="text-sm text-muted-foreground mt-1">
                                We'll call or email you to agree a price before listing.
                              </span>
                            </Label>

                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {required_Charity && <>
            {/* =================donation================== */}
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
                  name="donationPct"
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

                <InputCharityDonationInput charities={charitiesData?.data || []} form={form} name="charities" />

              </div>

            </div>


            {/* Donation Privacy */}
            <div>
              <p className="mb-5 font-medium">
                Donation Privacy: Would you like to remain anonymous?
              </p>
              <FormField
                control={form.control}
                name="donationAnonymous"
                render={({ field }) => (
                  <FormItem className="md:space-y-3 space-y-1">

                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        defaultValue={field.value ? "true" : "false"}
                        className="flex flex-col md:space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="anonymous" />
                          <label htmlFor="anonymous" className="text-sm">
                            Yes, keep my donation anonymous
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="show-name" />
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
          </>}

          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter any additional notes" className="min-h-20 bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base px-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ============Shipment================ */}

          <div className="space-y-3 mt-12">
            <p className="text-lg lg:text-xl font-semibold text-gray-900">Shipping</p>
            <UpdateShippingAddress />

            <div className="mt-8">
              <p className="text-lg lg:text-xl font-semibold text-gray-900 mb-5">Parcel Size</p>

              {/* ========================================= Price and Discount ============================== */}
              <div className="grid grid-cols-2 md:gap-4 gap-2 items-start">

                <FormField
                  control={form.control}
                  name="weight_kg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <InputGroup className="bg-white border-[#e1e1e1] rounded shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 focus:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border has-[[data-slot=input-group-control]:focus-visible]:border-primary-black !py-5">
                          <InputGroupInput type="number" step="any" placeholder="eg: 0.3" {...field} className="!text-base" />
                          <InputGroupAddon align={"inline-end"} className="text-primary-black text-lg" >
                            kg
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hight_cm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <InputGroup className="bg-white border-[#e1e1e1] rounded shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 focus:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border has-[[data-slot=input-group-control]:focus-visible]:border-primary-black !py-5">
                          <InputGroupInput type="number" step="any" placeholder="eg: 10" {...field} className="!text-base" />
                          <InputGroupAddon align={"inline-end"} className="text-primary-black text-lg" >
                            cm
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="width_cm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (cm)</FormLabel>
                      <FormControl>
                        <InputGroup className="bg-white border-[#e1e1e1] rounded shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 focus:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border has-[[data-slot=input-group-control]:focus-visible]:border-primary-black !py-5">
                          <InputGroupInput type="number" step="any" placeholder="eg: 20" {...field} className="!text-base" />
                          <InputGroupAddon align={"inline-end"} className="text-primary-black text-lg" >
                            cm
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="length_cm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length (cm)</FormLabel>
                      <FormControl>
                        <InputGroup className="bg-white border-[#e1e1e1] rounded shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 focus:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border has-[[data-slot=input-group-control]:focus-visible]:border-primary-black !py-5">
                          <InputGroupInput type="number" step="any" placeholder="eg: 6" {...field} className="!text-base" />
                          <InputGroupAddon align={"inline-end"} className="text-primary-black text-lg" >
                            cm
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

          </div>

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-4 mb-6 mt-12">
            <p className="text-sm text-red-700 dark:text-red-400">
              <strong>Please note:</strong> Our assisted seller service fee is{" "}
              <strong>30% of the final sale price</strong>, before your chosen charity donation. We will confirm all
              details and pricing with you before we list your items. We will aim to sell your items within 30 days;
              after this period you may request to have your items returned (return shipping may apply). Terms and
              conditions apply.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-700 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          <Button disabled={form?.formState?.isSubmitting} type="submit" variant={"default"} className="flex-1 group cursor-pointer rounded-none py-5 w-full">
            {form?.formState?.isSubmitting ? <span className="loader" /> : "Ready to Submit"}
          </Button>

        </form>
      </Form>

      <SuccessModal open={openSuccessDialog} setOpen={setOpenSuccessDialog} content={<div className="p-5">

        <div className="flex justify-center mb-5">
          <CheckCircle2 className="w-14 h-14 text-green-500" strokeWidth={1.75} />
        </div>

        {/* Heading */}
        <p className="text-center text-xl font-semibold text-gray-900 leading-snug mb-2">
          Request Submitted Successfully
        </p>

        {/* Subtext */}
        <p className="text-center text-sm text-gray-500 leading-relaxed mb-6">
          Your request has been recorded and is now
          under review.
        </p>

        {/* Info card */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-base font-semibold text-gray-900 mb-2">
            What happens next?
          </p>
          <ul className="space-y-2">
            <li className="flex text-sm text-gray-700">
              <span className="mr-2 mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
              <span>
                The request will be reviewed by our <span className="text-primary-black font-medium">FASHI-ON</span> team.
              </span>
            </li>
            <li className="flex text-sm text-gray-700">
              <span className="mr-2 mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
              <span>
                Approval or rejection will depend on review of the items and compliance with our assisted seller guidelines.
              </span>
            </li>
            <li className="flex text-sm text-gray-700">
              <span className="mr-2 mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
              <span>
                Once a decision is made, the request status will be updated
                in the system.
              </span>
            </li>
          </ul>

          <p className="text-sm text-gray-800 mt-4">
            You can continue checking the status of this request from the
            system under <Link href="/profile/assisted-sell" className="font-semibold text-gray-900 underline">Assisted Sell</Link>.
          </p>
        </div>
      </div>} />

    </div>
  )
}
