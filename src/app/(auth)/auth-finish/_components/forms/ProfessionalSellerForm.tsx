"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFinishAuthMutation } from "@/redux/api/authApi";
import { getFirstErrorMessage } from "@/utils/modifyFormError";
import RegistrationCountryField from "../RegistrationCountryField";
import DocumentUploadField from "../DocumentUploadField";
import { buildAuthFinishFormData } from "../submitAuthFinish";

const professionalSellerSchema = z.object({
  legalBusinessName: z
    .string({ required_error: "Legal business name is required" })
    .min(1, "Legal business name is required"),
  tradingName: z.string().optional(),
  businessType: z
    .string({ required_error: "Business type is required" })
    .min(1, "Business type is required"),
  businessRegistrationNumber: z.string().optional(),
  registrationCountry: z
    .string({ required_error: "Registration country is required" })
    .min(1, "Registration country is required"),
  registeredAddress: z.string().optional(),
  taxIdentificationNumber: z.string().optional(),
});

type ProfessionalSellerFormValues = z.infer<typeof professionalSellerSchema>;

export default function ProfessionalSellerForm({
  onSuccess,
}: {
  onSuccess: (message?: string) => void;
}) {
  const [documents, setDocuments] = useState<File[]>([]);
  const [finishAuth, { isLoading }] = useFinishAuthMutation();

  const form = useForm<ProfessionalSellerFormValues>({
    resolver: zodResolver(professionalSellerSchema),
    defaultValues: {
      legalBusinessName: "",
      tradingName: "",
      businessType: "",
      businessRegistrationNumber: "",
      registrationCountry: "",
      registeredAddress: "",
      taxIdentificationNumber: "",
    },
  });

  const onError = (errors: any) => {
    toast.error(getFirstErrorMessage(errors));
  };

  const onSubmit = async (values: ProfessionalSellerFormValues) => {
    if (documents.length === 0) {
      toast.error("Please upload your verification documents");
      return;
    }

    try {
      const token = sessionStorage.getItem("signUpToken") || undefined;
      const formData = buildAuthFinishFormData(values, documents);
      const res = await finishAuth({ formData, token }).unwrap();
      onSuccess(res?.message);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit verification details");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="md:space-y-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormField
            control={form.control}
            name="legalBusinessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Legal Business Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter legal business name"
                    {...field}
                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tradingName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Trading Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter trading or store name"
                    {...field}
                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Business Type <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Sole Proprietorship, LLC, Corporation"
                    {...field}
                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessRegistrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Business Registration Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter registration number"
                    {...field}
                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <RegistrationCountryField
            control={form.control}
            name="registrationCountry"
            label="Registration Country"
            required
          />

          <FormField
            control={form.control}
            name="taxIdentificationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Tax Identification Number (TIN / VAT)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter tax ID or VAT number"
                    {...field}
                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="registeredAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-gray-900">
                Registered Business Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter registered business address"
                  {...field}
                  className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3.5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DocumentUploadField
          documents={documents}
          setDocuments={setDocuments}
          label="Business Verification Documents"
          description="Upload business registration certificate or tax document (PDF, JPG, PNG)."
          inputId="pro-seller-docs"
        />

        <Button
          variant="default"
          disabled={isLoading}
          type="submit"
          className="rounded-full h-11 w-full cursor-pointer text-base"
        >
          {isLoading ? <span className="loader"></span> : "Submit for Verification"}
        </Button>
      </form>
    </Form>
  );
}

