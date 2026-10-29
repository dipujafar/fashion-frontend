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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useFinishAuthMutation } from "@/redux/api/authApi";
import { getFirstErrorMessage } from "@/utils/modifyFormError";
import DocumentUploadField from "../DocumentUploadField";
import { buildAuthFinishFormData } from "../submitAuthFinish";

const ambassadorSchema = z.object({
  ambassadorType: z
    .string({ required_error: "Ambassador type is required" })
    .min(1, "Ambassador type is required"),
  representedBrand: z.string().optional(),
  representedOrganization: z.string().optional(),
  agreementVersion: z.string().optional(),
  agreementAcceptedAt: z.string().optional(),
});

type AmbassadorFormValues = z.infer<typeof ambassadorSchema>;

export default function AmbassadorForm({
  onSuccess,
}: {
  onSuccess: (message?: string) => void;
}) {
  const [documents, setDocuments] = useState<File[]>([]);
  const [acceptedAgreement, setAcceptedAgreement] = useState(true);
  const [finishAuth, { isLoading }] = useFinishAuthMutation();

  const form = useForm<AmbassadorFormValues>({
    resolver: zodResolver(ambassadorSchema),
    defaultValues: {
      ambassadorType: "",
      representedBrand: "",
      representedOrganization: "",
      agreementVersion: "1.0",
      agreementAcceptedAt: new Date().toISOString(),
    },
  });

  const onError = (errors: any) => {
    toast.error(getFirstErrorMessage(errors));
  };

  const onSubmit = async (values: AmbassadorFormValues) => {
    if (documents.length === 0) {
      toast.error("Please upload your verification documents");
      return;
    }

    try {
      const token = sessionStorage.getItem("signUpToken") || undefined;
      const payload = {
        ...values,
        agreementAcceptedAt: acceptedAgreement
          ? values.agreementAcceptedAt || new Date().toISOString()
          : undefined,
      };
      const formData = buildAuthFinishFormData(payload, documents);
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
        <FormField
          control={form.control}
          name="ambassadorType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-gray-900">
                Ambassador Type <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Brand Ambassador, Charity Ambassador, Sustainability Advocate"
                  {...field}
                  className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3.5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormField
            control={form.control}
            name="representedBrand"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Represented Brand
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter represented brand name"
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
            name="representedOrganization"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Represented Organization
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter represented organization name"
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
          name="agreementVersion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-gray-900">
                Agreement Version
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 1.0"
                  {...field}
                  className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3.5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start space-x-2.5 pt-1">
          <Checkbox
            id="ambassador-agreement"
            checked={acceptedAgreement}
            onCheckedChange={(checked) => {
              const isChecked = Boolean(checked);
              setAcceptedAgreement(isChecked);
              form.setValue(
                "agreementAcceptedAt",
                isChecked ? new Date().toISOString() : ""
              );
            }}
            className="mt-0.5 cursor-pointer"
          />
          <label
            htmlFor="ambassador-agreement"
            className="text-sm text-gray-700 leading-snug cursor-pointer"
          >
            I confirm that I am authorized to represent the stated brand or organization and accept the ambassador agreement terms.
          </label>
        </div>

        <DocumentUploadField
          documents={documents}
          setDocuments={setDocuments}
          label="Authorization Documents"
          description="Upload your brand/organization authorization letter or ambassador agreement (PDF, JPG, PNG)."
          inputId="ambassador-docs"
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

