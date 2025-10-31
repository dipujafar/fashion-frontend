"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { UploadIcon } from "@/icons";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const returnReasons = [
  { id: "wrong-size", label: "Wrong size" },
  { id: "defective", label: "Defective item" },
  { id: "not-described", label: "Not as described" },
  { id: "others", label: "Others Reason" },
] as const;

const formSchema = z.object({
  reasons: z.array(z.string()).min(1, {
    message: "Please select at least one reason for return.",
  }),
  description: z.string().min(1, { message: "Description is required" }),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB"
    )
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG, and WebP images are allowed"
    ),
});

type FormData = z.infer<typeof formSchema>;

export function ReturnRequestModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reasons: [],
      image: undefined,
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      form.clearErrors("image");
    }
  };

  const handleImageRemove = () => {
    form.setValue("image", undefined);
    // Reset the file input
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(
        "Return request submitted successfully! We'll process your request within 24 hours."
      );

      form.reset();
      setOpen(false);
    } catch (error) {
      alert("Error submitting return request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-lg font-medium text-left">
            Why are you return this item?
          </DialogTitle>
          <hr className="border-[#CACACA]" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
            {/* Return Reasons */}
            <FormField
              control={form.control}
              name="reasons"
              render={() => (
                <FormItem>
                  <div className="space-y-1.5">
                    {returnReasons.map((reason) => (
                      <FormField
                        key={reason.id}
                        control={form.control}
                        name="reasons"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={reason.id}
                              className="flex flex-row items-center space-x-1.5 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(reason.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                        ...field.value,
                                        reason.id,
                                      ])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== reason.id
                                        )
                                      );
                                  }}
                                  className="border-gray-300"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">
                                {reason.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>

                  <FormControl>
                    <Textarea
                      placeholder="Write your return reason here..."
                      className="resize-none bg-[#f5f4f4] h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload Image Section */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-900">
                    Upload Image
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      {!field.value ? (
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center flex justify-center bg-[#f5f4f4]">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <Label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            <div className="flex flex-col justify-center  items-center space-y-2">
                              <div className="w-12 h-12  flex items-center justify-center">
                                <UploadIcon />
                              </div>
                              <span className="text-sm text-[#1372C4] font-medium">
                                Upload Image
                              </span>
                            </div>
                          </Label>
                        </div>
                      ) : (
                        <div className="border border-gray-200 rounded-lg p-4 bg-[#f5f4f4]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Upload className="w-4 h-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {field.value.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(field.value.size / 1024 / 1024).toFixed(2)}{" "}
                                  MB
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleImageRemove}
                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h4>You are making this request to <Link href={"/celebrity/profile-preview"} className="underline font-medium">Alice</Link></h4>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white hover:bg-black/95 h-10 text-sm font-medium group cursor-pointer"
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
              {!isSubmitting && <AnimatedArrow />}
            </Button>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
}
