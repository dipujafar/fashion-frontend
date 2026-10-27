"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { donationSchema, Donation } from "./schema";
import { cn } from "@/lib/utils";
import SingleItemForm from "./SingleItemForm";
import BagItemForm from "./BagItemForm";
import { CreateClothDonation } from "@/lib/Actions/Donation.action";
import { toast } from "sonner";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getFirstErrorMessage } from "@/utils/modifyFormError";
import dynamic from "next/dynamic";

const ImageEditorModal = dynamic(
  () => import("@/components/shared/ImageEditorModal"),
  { ssr: false }
);

const MAX_PHOTOS = 8;

interface DonationFormProps {
  onSubmit?: () => void;
  charityId: string;
}

export function DonationForm({ onSubmit, charityId }: DonationFormProps) {
    
  const [donationType, setDonationType] = useState<"SINGLE" | "MULTIPLE">(
    "SINGLE"
  );
  const [images, setImages] = useState<File[]>([]);

  // Image Editor state (matching AddProductForm)
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<{
    file: Blob | File;
    index: number | null;
    name?: string;
  } | null>(null);

  const form = useForm<Donation>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donationType: "SINGLE",
      itemTypes: [],
      personTypes: [],
      brands: [],
      itemsCount: "1",
      condition: "",
      washedType: "",
      description: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleDonationTypeChange = (type: "SINGLE" | "MULTIPLE") => {
    if (type === donationType) return;
    setDonationType(type);
    form.reset({
      donationType: type,
      itemTypes: [],
      personTypes: [],
      brands: [],
      itemsCount: type === "SINGLE" ? "1" : "",
      condition: "",
      washedType: "",
      description: "",
    });
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/")
    );
    e.target.value = "";
    if (incoming.length === 0) return;

    const availableSlots = MAX_PHOTOS - images.length;
    if (availableSlots <= 0) {
      toast.error(`You can only upload up to ${MAX_PHOTOS} photos`);
      return;
    }

    const filesToProcess = incoming.slice(0, availableSlots);

    if (filesToProcess.length > 1) {
      setImages((prev) => [...prev, ...filesToProcess]);
      return;
    }

    // Single image uploaded: open image editor 1 by 1 like AddProductForm
    const singleFile = filesToProcess[0];
    setEditingImage({ file: singleFile, index: null, name: singleFile.name });
    setEditorModalOpen(true);
  };

  const handleEditExisting = (index: number) => {
    const existingFile = images[index];
    if (!existingFile) return;
    setEditingImage({
      file: existingFile,
      index,
      name: (existingFile as File).name || `donation-photo-${index + 1}.jpg`,
    });
    setEditorModalOpen(true);
  };

  const handleSaveEditor = useCallback(
    (blob: Blob) => {
      const filename =
        editingImage?.name || `donation-photo-${Date.now()}.jpg`;
      const finalFile = new File([blob], filename, {
        type: blob.type || "image/jpeg",
      });

      if (editingImage?.index !== null && editingImage?.index !== undefined) {
        setImages((prev) =>
          prev.map((img, i) => (i === editingImage.index ? finalFile : img))
        );
      } else {
        setImages((prev) => [...prev, finalFile]);
      }

      setEditingImage(null);
      setEditorModalOpen(false);
    },
    [editingImage]
  );

  const handleCloseEditor = useCallback(() => {
    setEditorModalOpen(false);
    setEditingImage(null);
  }, []);

  const removeFile = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onError = (errors: any) => {
    const firstErrorMessage = getFirstErrorMessage(errors);
    if (firstErrorMessage) {
      toast.error(firstErrorMessage);
    }
  };

  const handleSubmit = async (data: Donation) => {
    if (images.length === 0) {
      toast.error("At least one photo is required for cloth donation");
      return;
    }

    const formData = new FormData();
    images.forEach((file) => {
      formData.append("photos", file);
    });

    const formattedPayload = {
      charityId,
      donationType: data.donationType,
      itemTypes: data.itemTypes,
      personTypes: data.personTypes,
      brands: data.brands || [],
      itemsCount: data.donationType === "SINGLE" ? "1" : data.itemsCount,
      condition: data.condition,
      washedType: data.washedType,
      ...(data.description?.trim()
        ? { description: data.description.trim() }
        : {}),
    };

    formData.append("data", JSON.stringify(formattedPayload));

    try {
      const res = await CreateClothDonation({ payload: formData });
      if (!res.success) {
        throw new Error(res.message);
      }

      toast.success(res.message || "Cloth donation submitted successfully");
      form.reset();
      setImages([]);
      onSubmit?.();
    } catch (error: any) {
      if (isRedirectError(error)) {
        onSubmit?.();
        throw error;
      }
      toast.error(
        error?.message || "An error occurred while submitting the donation."
      );
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, onError)}
          className="space-y-6"
        >
          {/* Donation Type Selection */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant={donationType === "SINGLE" ? "default" : "outline"}
              onClick={() => handleDonationTypeChange("SINGLE")}
              className={cn(
                "flex-1 rounded shadow-none cursor-pointer py-5",
                donationType !== "SINGLE" &&
                  "bg-white border-[#e1e1e1] text-gray-800 hover:bg-gray-50 hover:border-primary-black"
              )}
            >
              Single Item
            </Button>
            <Button
              type="button"
              variant={donationType === "MULTIPLE" ? "default" : "outline"}
              onClick={() => handleDonationTypeChange("MULTIPLE")}
              className={cn(
                "flex-1 rounded shadow-none cursor-pointer py-5",
                donationType !== "MULTIPLE" &&
                  "bg-white border-[#e1e1e1] text-gray-800 hover:bg-gray-50 hover:border-primary-black"
              )}
            >
              Bag of Items
            </Button>
          </div>

          {donationType === "SINGLE" && (
            <SingleItemForm
              form={form}
              images={images}
              onAddFiles={handleFiles}
              onEditImage={handleEditExisting}
              onRemoveImage={removeFile}
            />
          )}

          {donationType === "MULTIPLE" && (
            <BagItemForm
              form={form}
              images={images}
              onAddFiles={handleFiles}
              onEditImage={handleEditExisting}
              onRemoveImage={removeFile}
            />
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="default"
              className="flex-1 group cursor-pointer rounded-none py-6"
            >
              {isSubmitting ? <span className="loader" /> : "Submit Donation"}
            </Button>
          </div>
        </form>
      </Form>

      <ImageEditorModal
        isOpen={editorModalOpen}
        onClose={handleCloseEditor}
        image={editingImage?.file ?? null}
        onSave={handleSaveEditor}
      />
    </>
  );
}

