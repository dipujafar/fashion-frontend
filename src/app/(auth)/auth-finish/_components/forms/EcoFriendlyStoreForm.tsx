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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFinishAuthMutation } from "@/redux/api/authApi";
import { getFirstErrorMessage } from "@/utils/modifyFormError";
import RegistrationCountryField from "../RegistrationCountryField";
import DocumentUploadField from "../DocumentUploadField";
import { buildAuthFinishFormData } from "../submitAuthFinish";

const ecoFriendlyStoreSchema = z.object({
  storeName: z
    .string({ required_error: "Store name is required" })
    .min(1, "Store name is required"),
  legalBusinessName: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  registrationCountry: z.string().optional(),
  sustainabilityDescription: z
    .string({ required_error: "Sustainability description is required" })
    .min(1, "Sustainability description is required"),
  certificationName: z.string().optional(),
  certificationIssuer: z.string().optional(),
  certificationNumber: z.string().optional(),
});

type EcoFriendlyStoreFormValues = z.infer<typeof ecoFriendlyStoreSchema>;

export default function EcoFriendlyStoreForm({
  onSuccess,
}: {
  onSuccess: (message?: string) => void;
}) {
  const [documents, setDocuments] = useState<File[]>([]);
  const [finishAuth, { isLoading }] = useFinishAuthMutation();

  const form = useForm<EcoFriendlyStoreFormValues>({
    resolver: zodResolver(ecoFriendlyStoreSchema),
    defaultValues: {
      storeName: "",
      legalBusinessName: "",
      businessRegistrationNumber: "",
      registrationCountry: "",
      sustainabilityDescription: "",
      certificationName: "",
      certificationIssuer: "",
      certificationNumber: "",
    },
  });

  const onError = (errors: any) => {
    toast.error(getFirstErrorMessage(errors));
  };

  const onSubmit = async (values: EcoFriendlyStoreFormValues) => {
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
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Store Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter eco-friendly store name"
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
            name="legalBusinessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Legal Business Name
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
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
                    placeholder="Enter business registration number"
                    {...field}
                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <RegistrationCountryField
            control={form.control}
            name="registrationCountry"
            label="Registration Country"
          />
        </div>

        <FormField
          control={form.control}
          name="sustainabilityDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-gray-900">
                Sustainability Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your store's sustainability practices, eco-friendly materials, or mission..."
                  rows={4}
                  {...field}
                  className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base px-3.5 py-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <FormField
            control={form.control}
            name="certificationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Certification Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. GOTS, Fair Trade"
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
            name="certificationIssuer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Certification Issuer
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter issuer organization"
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
            name="certificationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Certification Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter certificate number"
                    {...field}
                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DocumentUploadField
          documents={documents}
          setDocuments={setDocuments}
          label="Certification & Verification Documents"
          description="Upload sustainability certification or business verification documents (PDF, JPG, PNG)."
          inputId="eco-store-docs"
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

