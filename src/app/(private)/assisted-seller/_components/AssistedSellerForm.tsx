"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  itemCount: z.string().min(1, "Please enter number of items"),
  images: z.array(z.string()).min(1, "At least 1 image is required"),
  productTitle: z.string().optional(),
  productDescription: z.string().optional(),
  pricingOption: z.enum(["fashi-on", "tell-us", "discuss"], {
    errorMap: () => ({ message: "Please select a pricing option" }),
  }),
  estimatedEarnings: z.string().optional(),
  openToOffers: z.boolean().default(false),
  offersAmount: z.string().optional(),
  charityType: z.string().optional(),
  charityAmount: z.string().optional(),
  shippingCountry: z.string().min(1, "Please select shipping country"),
  companyAddress: z.string().optional(),
  contactNumber: z.string().optional(),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function AssistedSellerForm() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemCount: "",
      images: [],
      productTitle: "",
      productDescription: "",
      pricingOption: "fashi-on",
      estimatedEarnings: "",
      openToOffers: false,
      offersAmount: "",
      charityType: "",
      charityAmount: "",
      shippingCountry: "",
      companyAddress: "",
      contactNumber: "",
      notes: "",
    },
  })

  const pricingOption = form.watch("pricingOption")
  const openToOffers = form.watch("openToOffers")

  function onSubmit(values: FormValues) {
    console.log("Form submitted:", values)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages([...uploadedImages, ...newImages])
      form.setValue("images", [...uploadedImages, ...newImages])
    }
  }

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = uploadedImages.filter((_, idx) => idx !== indexToRemove)
    setUploadedImages(updatedImages)
    form.setValue("images", updatedImages)
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sell Any Item</h1>
        <p className="text-muted-foreground">Complete the form below to submit items for our assisted seller service</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Items Count */}
          <FormField
            control={form.control}
            name="itemCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many items are you sending?</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter your items" className="bg-gray-100 py-5" {...field} />
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
                <FormLabel>Product Image (required minimum of 1)</FormLabel>
                <FormControl>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer bg-gray-100">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer block">
                      <div className="text-4xl mb-2">📷</div>
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
                {uploadedImages.length > 0 && (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Preview ${idx}`}
                          className="h-20 w-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FormItem>
            )}
          />

          {/* Product Title & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="productTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your item name" className="bg-gray-100 py-5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" className="bg-gray-100 py-5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description (Optional)</FormLabel>
                <FormDescription>e.g. brand, size, condition, original price, any flaws, how it fits</FormDescription>
                <FormControl>
                  <Textarea placeholder="Describe your item..." className="min-h-24 bg-gray-100 py-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Card className="p-6 bg-muted/30">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-4">How would you like us to handle pricing?</h3>
              </div>

              <FormField
                control={form.control}
                name="pricingOption"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        {/* Option 1: Let Fashi-ON Decide */}
                        <div className="flex items-start space-x-3 mb-4 p-3 rounded hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="fashi-on" id="option-1" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="option-1" className="font-medium cursor-pointer">
                              Let Fashi-ON decide (recommended)
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              We'll set the best market price and email you before we list.
                            </p>
                          </div>
                        </div>

                        {/* Option 2: Tell Us What You'd Like to Earn */}
                        <div className="flex items-start space-x-3 mb-4 p-3 rounded hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="tell-us" id="option-2" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="option-2" className="font-medium cursor-pointer">
                              Tell us what you'd like to earn
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Roughly how much you'd like to receive after our fees and your donation
                            </p>
                            {pricingOption === "tell-us" && (
                              <div className="mt-3">
                                <FormField
                                  control={form.control}
                                  name="estimatedEarnings"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium">£</span>
                                          <Input
                                            type="number"
                                            placeholder="Estimated earnings"
                                            className="bg-gray-100 py-5"
                                            {...field}
                                          />
                                        </div>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Option 3: Discuss First */}
                        <div className="flex items-start space-x-3 p-3 rounded hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="discuss" id="option-3" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="option-3" className="font-medium cursor-pointer">
                              I'd like to discuss first
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              We'll call or email you to agree a price before listing.
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Charity & Open to Offers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">   
            <FormField
              control={form.control}
              name="charityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donate to charity</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-100 w-full py-5">
                        <SelectValue placeholder="Select charity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="unicef">UNICEF</SelectItem>
                      <SelectItem value="redcross">Red Cross</SelectItem>
                      <SelectItem value="oxfam">Oxfam</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="charityAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donation Amount (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Percentage to donate" className="bg-gray-100 py-5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Shipping & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="shippingCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping from which country</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-100 w-full py-5">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="companyAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Platform Inc. 123 Marketplace St. Cityville, 12345"
                    className="min-h-20 bg-gray-100 py-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter any additional notes" className="min-h-20 bg-gray-100 py-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700 dark:text-red-400">
              <strong>Please note:</strong> Our assisted seller service fee is{" "}
              <strong>30% of the final sale price</strong>, before your chosen charity donation. We will confirm all
              details and pricing with you before we list your items. We will aim to sell your items within 30 days;
              after this period you may request to have your items returned (return shipping may apply). Terms and
              conditions apply.
            </p>
          </div>

          <Button type="submit" size="lg" className="w-full">
            SUBMIT
          </Button>
        </form>
      </Form>
    </div>
  )
}
