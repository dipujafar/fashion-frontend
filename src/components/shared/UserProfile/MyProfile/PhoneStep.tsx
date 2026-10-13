"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Phone, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { cn } from "@/lib/utils";
import Alert from "@/components/ui/Alert";

const schema = z.object({
    phoneNumber: z
        .string()
        .trim()
        .min(1, "Phone number is required")
        .refine((v) => {
            const digits = v.replace(/\D/g, "").length;
            return digits >= 7 && digits <= 15;
        }, "Please enter a valid phone number (7-15 digits)"),
});

type PhoneFormValues = z.infer<typeof schema>;

interface PhoneStepProps {
    defaultPhone: string;
    onSubmit: (phone: string) => Promise<void>;
    onCancel: () => void;
    title: string;
    isSending: boolean;
    sendingError: string;
    isError: boolean;
}

export function PhoneStep({ defaultPhone, onSubmit, onCancel, title, isSending, sendingError, isError }: PhoneStepProps) {

    const form = useForm<PhoneFormValues>({
        resolver: zodResolver(schema),
        defaultValues: { phoneNumber: defaultPhone },
    });

    const { isSubmitting } = form.formState;

    const handleSubmit = form.handleSubmit(async ({ phoneNumber }) => {
        try {
            await onSubmit(phoneNumber.trim());
        } catch (err: any) {
            const message = err?.message || "Failed to send verification code. Please try again.";
            form.setError("phoneNumber", { message });
            toast.error(message);
        }
    });

    return (
        <div className="space-y-5">
            <DialogHeader className="text-left space-y-2">
                <div className="size-11 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 mb-1">
                    <Phone className="size-5" />
                </div>
                <DialogTitle className="text-xl font-bold text-neutral-900 tracking-tight">
                    {title}
                </DialogTitle>
                <DialogDescription className="text-sm text-neutral-500">
                    Will send a verification code to your phone number. Make sure you have access to it.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <div className="flex items-center gap-2 rounded border border-[#e1e1e1] bg-white focus-within:border-neutral-900 transition-colors py-1">
                                    <FormControl>
                                        <PhoneInput
                                            // @ts-ignore
                                            value={field.value}
                                            onChange={field.onChange}
                                            international
                                            defaultCountry="US"
                                            className={cn(
                                                "flex-1",
                                                // strip inner borders/backgrounds so it looks like one field
                                                "[&_button]:!border-0 [&_button]:!bg-transparent [&_button]:!shadow-none [&_button]:!rounded-none",
                                                "[&_input]:!border-0 [&_input]:!bg-transparent [&_input]:!shadow-none [&_input]:!rounded-none"
                                            )}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {
                        isError && (
                            <Alert type="error" message={sendingError} show={true} />
                        )
                    }

                    <div className="flex items-center justify-end gap-2.5 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="rounded-none border-neutral-300 hover:bg-neutral-100 text-neutral-800 cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-none bg-neutral-900 hover:bg-neutral-800 text-white cursor-pointer"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    Sending...
                                </span>
                            ) : (
                                "Send Code"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}