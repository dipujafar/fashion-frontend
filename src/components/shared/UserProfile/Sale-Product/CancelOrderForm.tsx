"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"

import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { SellerCancelReason } from "@/types";

const formSchema = z.object({
    reason: z
        .string({ required_error: "Reason is required" })
        .min(1, { message: "Reason is required" }),
    reason_details: z
        .string()
        .min(5, { message: "Write some details explaination" }),
});

export type CancelOrderFormValues = z.infer<typeof formSchema>;

const CANCEL_REASONS: { value: SellerCancelReason; label: string }[] = [
    { value: SellerCancelReason.OUT_OF_STOCK, label: "Item out of stock" },
    { value: SellerCancelReason.UNABLE_TO_FULFILL_IN_TIME, label: "Unable to fulfill in time" },
    { value: SellerCancelReason.PRICING_ERROR, label: "Pricing error" },
    { value: SellerCancelReason.BUYER_UNREACHABLE, label: "Buyer unreachable" },
    { value: SellerCancelReason.SUSPECTED_FRAUD, label: "Suspected fraudulent order" },
    { value: SellerCancelReason.SHIPPING_ADDRESS_ISSUE, label: "Shipping address issue" },
    { value: SellerCancelReason.LISTING_ERROR, label: "Product listing error" },
    { value: SellerCancelReason.BUYER_REQUESTED, label: "Buyer requested cancellation" },
    { value: SellerCancelReason.DAMAGED_INVENTORY, label: "Damaged or defective inventory" },
    { value: SellerCancelReason.PAYMENT_NOT_VERIFIED, label: "Payment not verified" },
    { value: SellerCancelReason.OTHER, label: "Other" },
];

const CancelOrderForm = ({
    isLoading,
    handleCancelOrder,
}: {
    isLoading: boolean;
    handleCancelOrder: (data: CancelOrderFormValues, evidenceFiles: File[]) => void;
}) => {

    const form = useForm<CancelOrderFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason: "",
            reason_details: "",
        },
    });

    const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // derive preview urls from files, revoke on change/unmount
    const previewUrls = useMemo(
        () => evidenceFiles.map((file) => URL.createObjectURL(file)),
        [evidenceFiles]
    );

    useEffect(() => {
        return () => {
            previewUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    const addFiles = (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) return;

        const files = Array.from(fileList).slice(0, 5 - evidenceFiles.length); // limit to 5 files
        setEvidenceFiles((prev) => [...prev, ...files]);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const removeFile = (index: number) => {
        setEvidenceFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = (data: CancelOrderFormValues) => {
        try {
            handleCancelOrder(data, evidenceFiles);
        } catch (error: any) {
            toast.error(error?.data?.message ?? "Something went wrong");
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:space-y-6 space-y-4"
            >
                <FormField
                    control={form?.control}
                    name="reason"
                    render={({ field }) => {

                        return <FormItem>
                            <FormLabel>Reason</FormLabel>
                            <FormControl>
                                <Combobox
                                    items={CANCEL_REASONS}
                                    value={field.value || ""}
                                    onValueChange={(reason) => {
                                        field.onChange(reason || "");
                                    }}
                                    itemToStringLabel={(item) => CANCEL_REASONS.find(
                                        (reason) => reason.value === item
                                    )?.label || ""}
                                >
                                    <ComboboxInput placeholder="Select a reason" className={"bg-white border-[#e1e1e1] md:py-5 rounded shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 focus:ring-0 focus:border has-[[data-slot=input-group-control]:focus-visible]:border-primary-black text-lg md:text-base py-5"} />
                                    <ComboboxContent className="rounded-none p-0">
                                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                                        <ComboboxList className={""}>
                                            {(reason) => (
                                                <ComboboxItem
                                                    key={`${reason?.value}`}
                                                    value={reason?.value}
                                                    className="cursor-pointer py-2.5 rounded-none hover:bg-zinc-100 border-b border-b-gray-200"
                                                >
                                                    {reason?.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }
                    }
                />

                <FormField
                    control={form.control}
                    name="reason_details"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Additional details</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write some details explaination for canceling this order"
                                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black"
                                    {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === " ") {
                                            e.stopPropagation();
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <label className="text-sm font-medium">Evidence (optional)</label>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        max={5 - evidenceFiles.length}
                        className="hidden disabled:cursor-not-allowed"
                        disabled={evidenceFiles.length >= 5}
                        onChange={(e) => addFiles(e.target.files)}
                    />

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-[#e1e1e1] bg-zinc-50 py-4 text-sm text-muted-foreground hover:bg-zinc-100"
                    >
                        <Upload className="h-4 w-4" />
                        Upload photos
                        <p className="text-xs">(Max 5 images)</p>
                    </button>

                    {evidenceFiles.length > 0 && (
                        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
                            {evidenceFiles.map((file, index) => (
                                <div
                                    key={`${file.name}-${index}`}
                                    className="relative aspect-square overflow-hidden rounded border border-[#e1e1e1]"
                                >
                                    <Image
                                        src={previewUrls[index]}
                                        alt={file.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                                        aria-label="Remove image"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer rounded-none" disabled={isLoading}>No</AlertDialogCancel>
                    <AlertDialogAction
                        className="cursor-pointer rounded-none"
                        disabled={isLoading}
                        onClick={(e) => {
                            e.preventDefault(); // stop Radix auto-closing the dialog
                            form.handleSubmit(onSubmit)(); // manually run validation + submit
                        }}
                    >
                        {isLoading ? <span className="loader" /> : "Yes, Cancel"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </form>
        </Form>
    );
};

export default CancelOrderForm;