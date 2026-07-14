"use client";

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
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { SellerCancelReason } from "@/types";

const formSchema = z.object({
    reason: z
        .string({ required_error: "Reason is required" })
        .min(1, { message: "Reason is required" }),
    reason_details: z
        .string()
        .optional(),
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
    loadingAction,
    handleCancelOrder,
}: {
    isLoading: boolean;
    loadingAction: string | null;
    handleCancelOrder: (data: CancelOrderFormValues) => void;
}) => {

    const form = useForm<CancelOrderFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason: "",
            reason_details: "",
        },
    });

    const onSubmit = (data: CancelOrderFormValues) => {
        try {
            handleCancelOrder(data);
        } catch (error: any) {
            toast.error(error?.data?.message ?? "Something went wrong");
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:space-y-6 space-y-4 mt-5"
            >
                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reason for Cancellation</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="md:py-5 w-full cursor-pointer">
                                        <SelectValue placeholder="Select reason" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {CANCEL_REASONS.map((reason) => (
                                        <SelectItem key={reason.value} value={reason.value} className="cursor-pointer">
                                            {reason.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="reason_details"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Additional details (optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Add any extra context..."
                                    className=""
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

                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={isLoading}>No</AlertDialogCancel>
                    <AlertDialogAction
                        className="cursor-pointer"
                        disabled={isLoading}
                        onClick={(e) => {
                            e.preventDefault(); // stop Radix auto-closing the dialog
                            form.handleSubmit(onSubmit)(); // manually run validation + submit
                        }}
                    >
                        {loadingAction === "cancel" && <Loader2 className="animate-spin" size={16} />}
                        {loadingAction === "cancel" ? "Cancelling..." : "Yes, Cancel"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </form>
        </Form>
    );
};

export default CancelOrderForm;