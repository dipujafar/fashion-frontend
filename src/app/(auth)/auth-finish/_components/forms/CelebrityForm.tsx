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
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useFinishAuthMutation } from "@/redux/api/authApi";
import { getFirstErrorMessage } from "@/utils/modifyFormError";
import DocumentUploadField from "../DocumentUploadField";
import { buildAuthFinishFormData } from "../submitAuthFinish";

const celebritySchema = z.object({
  legalName: z
    .string({ required_error: "Legal name is required" })
    .min(1, "Legal name is required"),
  publicName: z
    .string({ required_error: "Public name is required" })
    .min(1, "Public name is required"),
  profession: z.string().optional(),
  officialWebsite: z.string().optional(),
  officialProfileUrls: z.array(z.string()).default([]),
});

type CelebrityFormValues = z.infer<typeof celebritySchema>;

export default function CelebrityForm({
  onSuccess,
}: {
  onSuccess: (message?: string) => void;
}) {
  const [documents, setDocuments] = useState<File[]>([]);
  const [profileUrlInput, setProfileUrlInput] = useState("");
  const [finishAuth, { isLoading }] = useFinishAuthMutation();

  const form = useForm<CelebrityFormValues>({
    resolver: zodResolver(celebritySchema),
    defaultValues: {
      legalName: "",
      publicName: "",
      profession: "",
      officialWebsite: "",
      officialProfileUrls: [],
    },
  });

  const profileUrls = form.watch("officialProfileUrls") || [];

  const handleAddProfileUrl = () => {
    const trimmed = profileUrlInput.trim();
    if (!trimmed) return;
    if (!profileUrls.includes(trimmed)) {
      form.setValue("officialProfileUrls", [...profileUrls, trimmed], {
        shouldValidate: true,
      });
    }
    setProfileUrlInput("");
  };

  const handleRemoveProfileUrl = (urlToRemove: string) => {
    form.setValue(
      "officialProfileUrls",
      profileUrls.filter((u) => u !== urlToRemove),
      { shouldValidate: true }
    );
  };

  const onError = (errors: any) => {
    toast.error(getFirstErrorMessage(errors));
  };

  const onSubmit = async (values: CelebrityFormValues) => {
    if (documents.length === 0) {
      toast.error("Please upload your verification documents");
      return;
    }

    const pendingUrl = profileUrlInput.trim();
    const finalUrls =
      pendingUrl && !values.officialProfileUrls.includes(pendingUrl)
        ? [...values.officialProfileUrls, pendingUrl]
        : values.officialProfileUrls;

    try {
      const token = sessionStorage.getItem("signUpToken") || undefined;
      const formData = buildAuthFinishFormData(
        { ...values, officialProfileUrls: finalUrls },
        documents
      );
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
            name="legalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Legal Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full legal name"
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
            name="publicName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Public / Stage Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your public or stage name"
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
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Profession
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Actor, Musician, Athlete, Model"
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
            name="officialWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Official Website
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://yourwebsite.com"
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
          name="officialProfileUrls"
          render={() => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-gray-900">
                Official Social / Profile URLs
              </FormLabel>
              <FormControl>
                <div className="space-y-2.5">
                  <div className="flex gap-2">
                    <Input
                      value={profileUrlInput}
                      onChange={(e) => setProfileUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddProfileUrl();
                        }
                      }}
                      placeholder="https://instagram.com/yourprofile"
                      className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3.5"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddProfileUrl}
                      className="h-[42px] px-4 rounded border-[#e1e1e1] hover:border-primary-black cursor-pointer shrink-0"
                    >
                      <Plus className="size-4 mr-1" />
                      Add
                    </Button>
                  </div>

                  {profileUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {profileUrls.map((url, index) => (
                        <span
                          key={`${url}-${index}`}
                          className="inline-flex items-center gap-1.5 bg-zinc-100 border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm max-w-full"
                        >
                          <span className="truncate max-w-[260px]">{url}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveProfileUrl(url)}
                            className="text-gray-500 hover:text-red-500 cursor-pointer shrink-0"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DocumentUploadField
          documents={documents}
          setDocuments={setDocuments}
          label="Identity & Public Evidence Documents"
          description="Upload government ID and public identity evidence documents (PDF, JPG, PNG)."
          inputId="celebrity-docs"
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

